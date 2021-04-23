import React, { useEffect, useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

function Form({ addBook }) {

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const categoryRef = useRef(null);
  const isbnRef = useRef(null);

  const [titleError, setTitleError] = useState('Sorry! This field cannot be empty');
  const [authorError, setAuthorError] = useState('Sorry! This field cannot be empty');
  const [isbnError, setIsbnError] = useState('Sorry! This field cannot be empty');

  const [formValid, setFormValid] = useState(false);


  let history = useHistory();

  function submitBookHandler(el) {
    el.preventDefault();

    const [titleEL, authorEl, categoryEl, isbnEl] = [titleRef.current, authorRef.current, categoryRef.current, isbnRef.current];

    history.push('/');
    alert('Successfully! Good luck!');

    addBook({
      title: titleEL.value,
      author: authorEl.value,
      categories: categoryEl.value,
      isbn: isbnEl.value,
      id: Math.ceil((Math.random() * 1000)),
    });

    titleEL.value = '';
    authorEl.value = '';
    categoryEl.value = '';
    isbnEl.value = '';

  };

  useEffect(() => {
    if (titleError || authorError || isbnError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  },[titleError,authorError,isbnError])

  function titleHandler(e) {
    if (e.target.value === '' || e.target.value === 'null') {
      setTitleError(' Please,fill in this field!');
    } else {
      setTitleError('');
    }
  }

  function authorHandler(e) {
    if (e.target.value === '' || e.target.value === 'null') {
      setAuthorError(' Please fill in this field!');
    } else {
      setAuthorError('');
    }
  }

   function isbnHandler(e) {
    if (!(e.target.value.length === 13)) {
      setIsbnError(' Sorry, your number is incorrect, it must contain 13 digits!');
    } else {
      setIsbnError('');
    }
  }


    return (

         <form >
      <div className='form-group'><label htmlFor='title'>Book title</label>
          <input ref={titleRef}  onChange={titleHandler} type="text" className="todo-input" /><span className='msg-error'>{titleError}</span></div>

      <div className='form-group'><label htmlFor='authorname'>Author name</label>
          <input type="text" ref={authorRef}  onChange={authorHandler} className="todo-input" /><span className='msg-error'>{authorError}</span></div>

      <div className="select"><label htmlFor='categories'>Categories</label>
              <select name="category" ref={categoryRef} className="filter-category">
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
          <input type="number" ref={isbnRef}  onChange={isbnHandler} step="10" className="todo-input" /><span className='msg-error'>{isbnError}</span></div>

          <Link to='/' className="go-back-btn">Go back</Link>

      <button disabled ={!formValid} onClick={submitBookHandler} className="todo-button" type="submit">
          Add Book <i className="fas fa-plus-square"></i>
      </button>
    </form>
  );
}

export default Form;