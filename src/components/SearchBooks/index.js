import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';

export default class SearchBooks extends React.Component {
  state = {
    searchResult: [],
  };

  onInputChange = e => {
    this.fetchSearchResult(e.target.value);
  };

  fetchSearchResult = async query => {
    if (query.trim().length > 0) {
      const data = await BooksAPI.search(query, 5);
      this.setState({
        searchResult: data,
      });
    }
  };

  updateShelf = async (book, shelf) => {
    const response = await BooksAPI.update(book, shelf);
    if (response) {
      this.fetchListBooks();
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onInputChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult.map(bookshelf => (
              <li key={bookshelf.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 192,
                        backgroundImage: `url('${bookshelf.imageLinks.thumbnail}')`,
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        defaultValue="none"
                        onChange={event => this.updateShelf(bookshelf, event.target.value)}
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{bookshelf.title}</div>
                  <div className="book-authors">{bookshelf.authors.join(', ')}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
