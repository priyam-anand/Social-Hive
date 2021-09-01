import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/home';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/profile/profile';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>  
    </>
  )
}

export default App
