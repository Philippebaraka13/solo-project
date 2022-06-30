import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../shared/Nav/Nav';
import Footer from '../shared/Nav/Footer/Footer';

import ProtectedRoute from '../shared/Nav/ProtectedRoute/ProtectedRoute';

import AboutPage from '../page/AboutPage/AboutPage';
import UserPage from '../page/AboutPage/UserPage/UserPage';
import InfoPage from '../page/AboutPage/InfoPage/InfoPage';
import LandingPage from '../page/AboutPage/LandingPage/LandingPage';
import LoginPage from '../Auth/LoginForm/LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import NewInvitationForm from '../invitation/invitation';
import Invitations from '../invitations/invitations';

import './App.css';
import Books from '../Books/Books';
import Book from '../Book/Book';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  console.log(user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/books"
          >
            <Books />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/books"
          >
            <Books />
          </ProtectedRoute> 
           <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/books/:id"
          >
            <Book />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/newinvitation/"
          >
            <NewInvitationForm />
          </Route>

          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/invitations/"
          >
            <Invitations />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;