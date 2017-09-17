import React from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI';
import BookShelf from './BookShelf';

export default class ListBooks extends React.Component {
  state = {
    listbooks: [],
  };

  componentDidMount() {
    this.fetchListBooks();
  }

  fetchListBooks = async () => {
    const response = await BooksAPI.getAll();
    this.setState({
      listbooks: response,
    });
  };
  
  updateShelf = async (book, shelf) => {
    const response = await BooksAPI.update(book, shelf);
    if (response) {
      this.fetchListBooks();
    }
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf 
              listbooks={this.state.listbooks}
              bookshelfTitle="Currently Reading"
              shelf="currentlyReading"
              updateShelf={this.updateShelf}
            />
            <BookShelf 
              listbooks={this.state.listbooks}
              bookshelfTitle="Want to Read"
              shelf="wantToRead"
              updateShelf={this.updateShelf}
            />
            <BookShelf 
              listbooks={this.state.listbooks}
              bookshelfTitle="Read"
              shelf="read"
              updateShelf={this.updateShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
