import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Check_In from './pages/Check_In';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
        <Route path="/checkin" element={<Check_In />} />
=======
        <Route path="/welcome" element={<Welcome />} />
>>>>>>> 154ec8b7b0764056720665524882401172974f2a
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
