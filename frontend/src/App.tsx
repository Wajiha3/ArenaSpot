import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import Check_In from './pages/Check_In';
import Matches from './pages/Matches';
import Matches1 from './pages/Matches1';
import Matches2 from './pages/Matches2';
import Match1 from './pages/Match1';
import Payment_Confirmation from './pages/Payment_Confirmation';
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
        <Route path="/matches" element={<Matches />} />
         <Route path="/matches1" element={<Matches1 />} />
         <Route path="/matches2" element={<Matches2 />} />
         <Route path="/match1" element={<Match1 />} />
        <Route path="/paymentconfirmation" element={<Payment_Confirmation />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
