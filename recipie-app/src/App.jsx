import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getCurrentUser } from './services/userService';
import NavBar from './components/nav/NavBar';
import Users from './components/content/admin/Users';
import RecipeList from './components/content/recipies/RecipeList';
import RecipeView from './components/content/recipies/RecipeView';
import RecipeEdit from './components/content/recipies/RecipeEdit';
import LoginForm from './components/content/admin/LoginForm';
import Logout from './components/content/admin/Logout';
import RegisterForm from './components/content/admin/RegisterForm';
import Home from './components/content/Home';
import User from './components/content/admin/User';
import RecipeNotFound from './components/content/recipies/RecipeNotFound';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

// import { renderIntoDocument } from 'react-dom/test-utils';


class App extends Component {
  state = {}

  componentDidMount() {
    const user = getCurrentUser()
    this.setState({user})
    
  }

  render() { 
    const { user } = this.state
    return (
      <div>
        <div className="content">
          
              <ToastContainer/>
              <NavBar user={user}/>
              {/* <Routes> */}
              <Switch>
              <Route 
                  path="/recipies/:recipeId/edit" 
                  render={props => <RecipeEdit {...props}/>} 
                />
                <Route 
                  path="/recipies/:recipeId/" 
                  render={props => <RecipeView {...props}/>} 
                />
                <Route path="/recipes" component={RecipeList} />
                <Route path="/admin/users/:userId" render={User} />
                <Route path="/admin/users" component={Users} />
                <Route path="/login" component={LoginForm} />
                <Route path="/logout" component={Logout} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/recipe-not-found" component={RecipeNotFound} />
                <Route path="/" component={Home} />
              </Switch>
            {/* </Routes>*/}
        </div>
        
    </div>
    );
  }
}
 

export default App;
