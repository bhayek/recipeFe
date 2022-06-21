import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {  } 
    render() { 
        const { user } = this.props
        return (
            
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">YumTum</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/recipes">Recipes</Link>
                </li>


                {!user && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </React.Fragment>
                )}
                {user && (
                    <React.Fragment>
                    {user.admin && (
                        <React.Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/users">Admin</Link>
                            </li>
                        </React.Fragment>
                    )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Hi, {user.firstName}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </li>
                    </React.Fragment>
                )}
                {/* <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <Link className="dropdown-item" to="/">Action</Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="/">Another action</Link>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="/">Something else here</Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <Link className="nav-link disabled" to="/">Disabled</Link>
                </li> */}
                
            </ul>
            {/* <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
            </div>
        </div>
        </nav>

        );
    }
}
 
export default Navbar;

