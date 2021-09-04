import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/home';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/profile/profile';
import Login from './pages/login/Login';
import Register from './pages/register/register';

const App = () => {

  const profile = ({match})=>{
    return(
      <Profile username={match.params.username}/>
    )
  }

  return (
    <>
      
      
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/profile/:username'>
          {profile}
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/register'>
          <Register/>
        </Route>
      </Switch>  
    </>
  )
}

export default App
