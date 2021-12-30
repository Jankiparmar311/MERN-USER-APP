import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      age: ''
    };
  }

  componentDidMount() {
    axios
      .get('/api/list/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          username: res.data.username,
          password: res.data.password,
          name: res.data.name,
          age: res.data.age
        })
      })
      .catch(err => {
        console.log("Error from UpdateUesrs");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      age: this.state.age
    };

    axios
      .put('/api/list'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in Update User!");
      })
  };


  render() {
    return (
      <div className="UpdateUserInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show User List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit User</h1>
              <p className="lead text-center">
                  Update User's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="username">Username</label>
              <input
                type='text'
                placeholder='Username'
                name='username'
                className='form-control'
                value={this.state.username}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="password">Password</label>
              <input
                type='password'
                placeholder='Password'
                name='password'
                className='form-control'
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="name">Name</label>
              <input
                type='text'
                placeholder='Name'
                name='name'
                className='form-control'
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="age">Age</label>
              <input
                type='number'
                placeholder='Age'
                name='age'
                className='form-control'
                value={this.state.age}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update User</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateUsers;