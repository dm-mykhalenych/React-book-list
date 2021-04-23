import React from 'react';
import { Link } from 'react-router-dom';

function BookView({ books, deleteBook }) {

  function deleteHandler() {
    deleteBook(books.id)
  }

  return (
    <tr>
      <th>
        {books.title}
      </th>
      <th>
        {books.author}
      </th>
      <th>
        {books.categories}
      </th>
      <th>
        {books.isbn}
      </th>
      <th className='btn-column'><Link to={`/edit/${books.id}`} className='edit-btn'><i className='fas fa-edit'></i></Link>

        <button onClick={deleteHandler} className='trash-btn'><i className='fas fa-trash'></i>
        </button></th>
    </tr>
  );
}


export default BookView;