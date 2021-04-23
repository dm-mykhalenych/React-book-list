import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import Form from './components/Form';
import BooksList from './components/BooksList';
import EditBook from './components/EditBook';


function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dbUrl = 'http://localhost:4000/items/';


  function addBook(book) {
    fetch(dbUrl, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(book)
    }).then(() => {
      console.log('done');
      setBooks([...books, book]);
    })
  }


  function deleteBook(bookId) {
    fetch(dbUrl + bookId, {
      method: 'DELETE',
    }).then(() => {
      const updatedBooks = books.filter((books) => {
        return books.id !== bookId;
      })
      setBooks(updatedBooks)
      console.log(updatedBooks);
    })

  }

  function confirmEdit(updatedBook) {
    fetch(dbUrl + updatedBook.id, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedBook)
    }).then(() => {
      const updatedBooks = books.map((book) => {
        if (book.id === updatedBook.id) {
          book = {
            ...updatedBook,
            isEditing: false
          }
        }
        return book;
      })
      setBooks(updatedBooks)
    })
  }

  useEffect(() => {
    fetch(dbUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBooks(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>My Book List</h1>
          </header>
          <Switch>
            <Route exact path="/">
              <h2>Do You want to add a book to the book list?<Link to='/Form' className="add-book-btn"> Click here</Link></h2>
              <BooksList
                deleteBook={deleteBook}
                confirmEdit={confirmEdit}
                books={books}
              />

            </Route>
            <Route path="/Form">
              <Form
                addBook={addBook} />
            </Route>
            <Route path="/edit/:id">
              <EditBook confirmEdit={confirmEdit} books={books} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;