import React from 'react';
import {BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import _ from 'lodash'
import {connect} from 'react-redux'
import {startLogoutUser} from './actions/user'

import Register from './components/users/Register'
import Login from './components/users/Login'

import Home from './components/common/Home'

import NoteList from './components/notes/List'
import NoteNew from './components/notes/New'
import NoteShow from './components/notes/Show'
import NoteEdit from './components/notes/Edit'

import CategoryList from './components/categories/List'
import CategoryForm from './components/categories/Form'
import CategoryShow from './components/categories/Show'
import CategoryEdit from './components/categories/Edit'

function App(props) {

  const handleLogout = () => {
    props.dispatch(startLogoutUser())
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="http://localhost:3000/"><p className="h2">Notes App</p></a>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {
              _.isEmpty(props.user) ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users/register">Register</Link>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/notes">Notes</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">Categories</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} to="/">Logout</Link>
                  </li>
                </React.Fragment>
              )
            }
          </ul>
        </div>
      </nav>

      <Switch>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/users/register" component={Register} />
        <Route path="/users/login" component={Login}/>

        <Route path="/notes" component={NoteList} exact={true}/>
        <Route path="/notes/new" component={NoteNew}/> */}
        <Route path="/notes/:id" component={NoteShow} exact={true}/>
        <Route path="/notes/edit/:id" component={NoteEdit}/>

        <Route path="/categories" component={CategoryList} exact={true}/>
        <Route path="/categories/new" component={CategoryForm}/>
        <Route path="/categories/:id" component={CategoryShow} exact={true}/>
        <Route path="/categories/edit/:id" component={CategoryEdit}/>  
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)