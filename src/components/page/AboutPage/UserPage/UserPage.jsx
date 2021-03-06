import React from 'react';
import LogOutButton from '../../../Auth/LoginForm/LogOutButton/LogOutButton';
// import {useSelector} from 'react-redux';
// import NewBookForm from '../../../newPage/newPage';
import Apage from '../../../Apage/Apage';
import Books from '../../../Book/Book';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import './Userpage.css';
// import NewInvitationForm from "../invitation/invitation";
// import NewBookForm from "../newPage/newPage";
// import './Books.css';
import NewBookForm from '../../../newPage/newPage';

function UserPage() {
  const books = useSelector(store => store.books);
  const story = useSelector(store => store.stories);
  const bookContent = useSelector(store => store.bookContent);
 console.log('userpage', books, story, bookContent);
 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_BOOK' });
    dispatch({ type: 'FETCH_STORIES'});
  }, [dispatch]);

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className='userpage'>
      <div className="container">
        <h2 className='h2'>HELLO, {user.username}!</h2>
      </div>
      <div className="table3" >
      <div id="box">
  <p id="flashlight">
    <span id="flash">BOOK</span>
    <span id="light">STORY</span>
  </p>
</div>        
<NewBookForm /> 

<h1 className='yourbook'>Your Books</h1>
        <table className="table4" >
          <tbody className='tbody'>
            <tr className='tr'>
              <th>Title</th>
              <th>Description</th>
              <th>Date Made</th>
            </tr>
            {bookContent.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>{book.date}</td>
                {/* <td>{story.content}</td> */}
              </tr>
            ))
          }
          </tbody>
        </table>


      </div >
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
