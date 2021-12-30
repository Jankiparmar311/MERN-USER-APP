import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    
    axios
      .get('/api/list'+this.props.match.params.id)
      .then(res => {
        this.setState({
          user: res.data
        })
      })
      .catch(err => {
        console.log("Error from UserList");
      })
  };

  onDeleteClick (username) {
    axios
      .delete('/api/deleteuser/:username'+username)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error in delete");
      })
  };

  render() {

    const user = this.state.user;
    let Userlst = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Username</td>
            <td>{ user.username }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Password</td>
            <td>{ user.password }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Name</td>
            <td>{ user.name }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Age</td>
            <td>{ user.age }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowUserDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show User List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">User's Record</h1>
              <p className="lead text-center">
                  View User's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { Userlst }
          </div>
          <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,user.username)}>Delete User</button><br />
            </div>
        </div>
      </div>
    );
  }
}

export default UserList;