import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import Check_In from './pages/Check_In';
import Payment_Confirmation from './pages/Payment_confirmation';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkin" element={<Check_In />} />
         <Route path="/paymentconfirmation" element={<Payment_Confirmation />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
