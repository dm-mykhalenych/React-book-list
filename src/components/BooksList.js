import React from 'react';
import BookView from './BookView';


function BooksList({ books, deleteBook}) {
  console.log(books)

  return (
    <div className="book-container">
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Name Author</th>
              <th>Category</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 && books.map((books) => (
              <BookView  books={books} key={books.id}
                deleteBook={deleteBook} />
            ))}
            </tbody>
        </table>

      </div>
    </div>
  );
}

export default BooksList;