import React from 'react';
import * as BooksAPI from '../../BooksAPI';

export default class Book extends React.Component {
  state = {
    value: this.props.bookshelf.shelf || 'none',
  };

  componentDidMount() {
    if (!this.props.isLoading) {
      this.getBookData();
    }
  }

  getBookData = async () => {
    const data = await BooksAPI.get(this.props.bookshelf.id);
    this.setState({
      value: data.shelf,
    });
  };

  render() {
    const { updateShelf, bookshelf } = this.props;
    return (
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
              value={this.state.value}
              onChange={event => updateShelf(bookshelf, event.target.value)}
            >
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookshelf.title}</div>
        <div className="book-authors">{bookshelf.authors ? bookshelf.authors.join(', ') : ''}</div>
      </div>
    );
  }
}
