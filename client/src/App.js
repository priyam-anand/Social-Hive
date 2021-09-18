import React, { createContext, useReducer, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/home';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './pages/profile/profile';
import Login from './pages/login/Login';
import Register from './pages/register/register';
import { reducer, initialState } from './Reducer/useReducer';
import Loading from './components/loading/loading';
import axios from 'axios';
import ChatPage from './pages/Chat-page/chat-page';
export const userContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  const getInitialData = async () => {
    try {
      const res = await axios.get('/auth/initialData');
      const data = res.data;
      dispatch({ type: "INITAL_DATA", payload: data });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }
  useEffect(() => {
    getInitialData();
  }, []);

  const isUser = () => {
    if (state.user !== null) {
      return true;
    }
    return false;
  }

  return (
    <>
      {isLoading ? (<Loading />) :
        <userContext.Provider value={{ state, dispatch }}>
          <Switch>
            <Route exact path='/'>
              {isUser() ? <Home /> : <Login />}
            </Route>
            <Route path='/chat-page'>
              {!isUser() ? <Redirect to='/' /> : <ChatPage />}
            </Route>
            <Route path='/profile/:username'>
              {!isUser() ? <Redirect to='/' /> : <Profile />}
            </Route>
            <Route path='/login'>
              {isUser() ? <Redirect to='/' /> : <Login />}
            </Route>
            <Route path='/register'>
              {isUser() ? <Redirect to='/' /> : <Register />}
            </Route>
          </Switch>
        </userContext.Provider>
      }
    </>
  )
}

export default App
