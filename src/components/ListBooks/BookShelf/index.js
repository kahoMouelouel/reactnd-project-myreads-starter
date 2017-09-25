import React from 'react';
import Book from '../../Book';

export default props => {
  const { listbooks, bookshelfTitle, shelf, updateShelf } = props;
  const filterByShelfName = listbooks => shelf === listbooks.shelf;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {listbooks.filter(filterByShelfName).map(bookshelf => (
            <li key={bookshelf.id}>
              <Book updateShelf={updateShelf} bookshelf={bookshelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
