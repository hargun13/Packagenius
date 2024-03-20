import React from 'react';
import {Routes, Route} from 'react-router-dom'
// import Landing from './Landing/Landing';
import AuthInit from "./AuthUI/AuthInit";
import Signup from './AuthUI/Signup/Signup';
import Login from './AuthUI/Login/Login';
import Main from './Dashboard/Main';

function App() {
  return (
    <div className="h-full w-full scrollbar-hide bg-[#1E1E1E] text-white overflow-y-scroll">
      <Routes>
        <Route path='/' element={<AuthInit />} />
        <Route path='/auth-init' element={<AuthInit />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/explore' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
