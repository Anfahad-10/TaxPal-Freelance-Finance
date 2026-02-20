import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
{/*import './App.css'*/}

import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import LandingPage from './Pages/LandingPage'; 

import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Dashboard from './Pages/Dashboard'; 




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* NEW ROUTES */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* The :token part is crucial - it acts as a variable */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/dashboard" element={<Dashboard />} />        
      </Routes>
    </div>
  );
}



export default App
