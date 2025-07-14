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
import BellPagesWrapper from './Components/BellPagesWrapper';
import { ToastContainer, Bounce } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<BellPagesWrapper><Welcome /></BellPagesWrapper>} />
        <Route path="/checkin" element={<Check_In />} />
        <Route path="/livematch/:_courtId" element={<BellPagesWrapper><Live_Match /></BellPagesWrapper>} />
         <Route path="/ongoingmatch/:_courtId" element={<BellPagesWrapper><Ongoing_Match /></BellPagesWrapper>} />
         <Route path="/savematch/:_courtId" element={<BellPagesWrapper><Save_Match /></BellPagesWrapper>} />
         <Route path="/matches" element={<BellPagesWrapper><Matches /></BellPagesWrapper>} />
        <Route path="/paymentconfirmation" element={<Payment_Confirmation />} />
        <Route path="/queues" element={<BellPagesWrapper><Queues /></BellPagesWrapper>} />
        <Route path="/profile" element={<BellPagesWrapper><Profile /></BellPagesWrapper>} />
        <Route path="/match/:id" element={<Match1 />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
