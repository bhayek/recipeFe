import React, { Component } from 'react';
import getUser, { getUsers } from '../../../services/fakeData';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class Users extends Component {
    state = { users: [] } 

    componentDidMount() {
        if(this.state.users) {
            Axios.get('/api/users/all')
            .then(res => {
              this.setState({ users: res.data.data });
            })
        }
        console.log('state: ', this.state);
    }

    render() { 
        return (
            <div class="container">
                <div className="">
                    <h1>admin/Users component</h1>
                </div>
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>First</th>
                                <th scope='col'>Last</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>dateCreated</th>
                                <th scope='col'>dateDeleted</th>
                                <th scope='col'>suspendReason</th>
                                <th scope='col'>dob</th>
                                <th scope='col'>genderId</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map(user=>(
                                <tr key={user.id}>
                                    <th scope='row'>{user.id}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dateCreated}</td>
                                    <td>{user.dateDeleted}</td>
                                    <td>{user.suspendReason}</td>
                                    <td>{user.dob}</td>
                                    <td>{user.gender}</td>
                                    <td>
                                        <button
                                        className='btn btn-primary btn-sm'
                                        to={'admin/users/' + user.id}
                                        >View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
 
export default Users;