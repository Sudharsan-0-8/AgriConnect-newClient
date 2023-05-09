import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';

import { login, logout } from './features/login.js';
import { setUser, unSetUser } from './features/user';
import Navbar from './components/Navbar';

import Home from './components/Home';
import Feeds from './components/Feeds';
import Login from './components/login';
import AddPost from './components/AddPost';
import Register from './components/Register';
import PostPage from './components/PostPage';

const CURRUSER_QUERY = gql`
  {
    user: currUser {
      username
      email
    }
  }
`;

function App() {
  const { isLoggedIn } = useSelector((state)=>state.login);
  const { username, token } = useSelector((state)=>state.user.value)
  const { isSidebarVisible } = useSelector((state)=>state.sidebar);
  const dispatch = useDispatch(); 

  const [currentUserQuery  , { data, loading, error }] = useLazyQuery(CURRUSER_QUERY);

  useEffect(() => {
    currentUserQuery()
      .then( (res) => {
        console.log(res);
        const { username=null } = res.data.user;
        if(username) {
          dispatch(login());
          dispatch(setUser({ username: username, token: localStorage.getItem('token') }));
        } else {
          dispatch(logout());
          dispatch(unSetUser());
        }
      })
      .catch( (err) => {
        console.log(err);
        dispatch(logout());
        dispatch(unSetUser());
      })

  }, []);

  return (
    <>
      <Navbar className="z-[999]" />
      <Routes>
        <Route path="/" element={<Home className={`${ isSidebarVisible ? 'blur-sm' : '' }`} />} />
        <Route path="/feeds" element={<Feeds className={`${ isSidebarVisible ? 'blur-sm' : '' }`} />} />
        <Route path="/login" element={<Login className={`${ isSidebarVisible ? 'blur-sm' : '' }`} />} />
        <Route path="/signup" element={<Register className={`${ isSidebarVisible ? 'blur-sm' : '' }`} />} />
        <Route path="/addPost" element={<AddPost className={`${ isSidebarVisible ? 'blur-sm' : '' }`} />} />
        <Route path="/post/:id" element={<PostPage className={`${ isSidebarVisible ? 'blur-sm' : '' }`} />}/>
      </Routes>
    </>
  )
}

export default App
