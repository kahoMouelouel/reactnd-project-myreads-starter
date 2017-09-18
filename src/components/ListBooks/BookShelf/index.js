import React from 'react';

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
                      defaultValue={bookshelf.shelf}
                      onChange={(event) => updateShelf(bookshelf, event.target.value)}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option 
                        value="currentlyReading"
                      >
                        Currently Reading
                      </option>
                      <option
                        value="wantToRead"
                      >
                        Want to Read
                      </option>
                      <option 
                        value="read"
                      >
                        Read
                      </option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{bookshelf.title}</div>
                <div className="book-authors">
                  {bookshelf.authors.join(', ')}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
