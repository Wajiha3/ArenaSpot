import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import Check_In from './pages/Check_In';
import Live_Match from './pages/Live_Match';
import Ongoing_Match from './pages/Ongoing_Match';
import Save_Match from './pages/Save_Match';
import Match1 from './pages/Match1';
import Matches from './pages/Matches';
import Payment_Confirmation from './pages/Payment_Confirmation';
import Queues from './pages/Queues';
import Profile from './pages/Profile';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/checkin" element={<Check_In />} />
        <Route path="/livematch" element={<Live_Match />} />
         <Route path="/ongoingmatch" element={<Ongoing_Match />} />
         <Route path="/savematch" element={<Save_Match />} />
         <Route path="/matches" element={<Matches />} />
        <Route path="/paymentconfirmation" element={<Payment_Confirmation />} />
        <Route path="/queues" element={<Queues />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/match/:id" element={<Match1 />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
