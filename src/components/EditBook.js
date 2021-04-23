import React, {useState, useRef, useEffect } from 'react';
import {useParams, Link, useHistory} from 'react-router-dom';


function EditBook({confirmEdit}) {

  const [bookState, setBookState] = useState([]);

  const titleRef = useRef([null]);
  const authorRef = useRef([null]);
  const categoryRef = useRef([null]);
  const isbnRef = useRef([null]);
  const { id } = useParams();
  let history = useHistory();
   const [titleError, setTitleError] = useState('');
  const [authorError, setAuthorError] = useState('');
  const [isbnError, setIsbnError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const dbUrl = 'http://localhost:4000/items/';


   useEffect(() => {
   fetch(dbUrl + id, {
     method: 'GET',
    }).then(res => res.json())
      .then( bookState =>setBookState(bookState));
      console.log({bookState});
  }, [])

    useEffect(() => {
    if (titleError || authorError || isbnError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  },[titleError,authorError,isbnError])

 function confirmEditHandler() {
    confirmEdit(bookState);
    history.push('/');
    alert('Successfully! Good luck!');
  }

   function handleChangeTitle(e) {
     if (e.target.value === '' || e.target.value === 'null') {
      setTitleError(' Please,fill in this field!');
    } else {
      setTitleError('');
    }
    setBookState({
      ...bookState,
    title: e.target.value
    })
  }

  function handleChangeAuthor(e) {
    if (e.target.value === '' || e.target.value === 'null') {
      setAuthorError(' Please fill in this field!');
    } else {
      setAuthorError('');
    }
    setBookState({
      ...bookState,
      author: e.target.value
    })
  }

    function handleChangeCategory(e) {
    setBookState({
      ...bookState,
      categories: e.target.value
    })
  }

  function handleChangeIsbn(e) {
     if (!(e.target.value.length === 13)) {
      setIsbnError(' Sorry, your number is incorrect, it must contain 13 digits!');
    } else {
      setIsbnError('');
    }
      setBookState({
      ...bookState,
      isbn: e.target.value
    })

  }


return (
  <form>

      <div className='form-group'><label htmlFor='title'>Book title</label>
          <input ref={titleRef} value={bookState.title} onChange={handleChangeTitle} type="text" className="todo-input" /><span className='msg-error'>{titleError}</span></div>

      <div className='form-group'><label htmlFor='authorname'>Author name</label>
          <input ref={authorRef} value={bookState.author} onChange={handleChangeAuthor} type="text" className="todo-input" /><span className='msg-error'>{authorError}</span></div>

      <div className="form-group select"><label htmlFor='categories'>Categories</label>
              <select ref={categoryRef} value={bookState.categories} onChange={handleChangeCategory} name="category" className="filter-category">
                <option value="Adventure">Adventure</option>
                  <option value="Detective">Detective</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                  <option value="Scientific">Scientific</option>
                  <option value="Biographies and Autobiographies">Biographies and Autobiographies</option>
                  <option value="Poetry">Poetry</option>
              </select>
      </div>

      <div className='form-group'><label htmlFor='isbn'>ISBN</label>
          <input ref={isbnRef} value={bookState.isbn} onChange={handleChangeIsbn} type="text"  className="todo-input" /><span className='msg-error'>{isbnError}</span></div>

          <Link to='/' className="go-back-btn">Go back</Link>
      <button disabled ={!formValid} className="todo-button-confirm" onClick={confirmEditHandler}  type="submit">
          Confirm <i className="fas fa-check"></i>
      </button>
    </form>
);
}

export default EditBook;