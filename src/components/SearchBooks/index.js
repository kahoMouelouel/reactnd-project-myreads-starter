import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Book from '../Book';

export default class SearchBooks extends React.Component {
  state = {
    searchResult: [],
    isLoading: false,
    noresult: false,
  };

  onInputChange = e => {
    this.fetchSearchResult(e.target.value);
  };

  fetchSearchResult = async query => {
    this.setState({
      isLoading: true,
    });
    if (query.trim().length > 0) {
      try {
        const data = await BooksAPI.search(query, 5);
        this.setState({
          searchResult: data,
          noresult: false,
        });
        setTimeout(() => {
          this.setState({
            isLoading: false,
          });
        }, 1000);
      } catch (err) {
        if (err) {
          this.setState({
            noresult: true,
          });
        }
      }
    }
  };

  updateShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
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
          {this.state.isLoading ? (
            <div>Searching Now... Please Wait :D</div>
          ) : this.state.noresult ? (
            <div>Sorry, No Result </div>
          ) : (
            <ol className="books-grid">
              {this.state.searchResult.map(bookshelf => (
                <li key={bookshelf.id}>
                  <Book
                    isLoading={this.state.isLoading}
                    updateShelf={this.updateShelf}
                    bookshelf={bookshelf}
                  />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}
