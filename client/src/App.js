
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import login from './components/login';
import UserList from './components/UserList';
import UpdateUsers from './components/UpdateUsers';
import { useState } from 'react';

class App extends Component {
  const [user, setLoginUser] = useState({});
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={UserList} />
          <Route path='/login' element={<Login setLoginUser={setLoginUser} />} />
          <Route path='/Register' component={Register} />
          <Route path='/edit/:username' component={UpdateUsers} />
        </div>
      </Router>
    );
  }
}

export default App;
