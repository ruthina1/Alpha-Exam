import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Payment from './components/Payment';
import Year from './components/Year';
import Universities from './components/Universities';
import NaturalFirst from './components/NaturalFirst';
import NaturalSecond from './components/NaturalSecond';
import SocialFirst from './components/SocialFirst';
import SocialSecond from './components/SocialSecond';
import MidFinal from './components/MidFinal';
import Dashboard from './components/Dashboard';
import Question from './components/Question';
import Thankyou from './components/Thankyou';
import ForgotPassword from './components/ForgotPassword';

export default function App(){
  return(
    <div className="AppContainer">

      <Router>
      <Routes>
        <Route path="/" element={ <MidFinal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/Universities" element={<Universities />} />
        <Route path="/Year" element={<Year />} />
        <Route path="/NaturalFirst" element={<NaturalFirst />} />
        <Route path="/NaturalSecond" element={<NaturalSecond />} />
        <Route path="/SocialFirst" element={<SocialFirst />} />
        <Route path="/SocialSecond" element={<SocialSecond />} />
        <Route path="/MidFinal" element={<MidFinal />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Question" element={<Question />} />
        <Route path="/Thankyou" element={<Thankyou />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
    </div>

     
  );
}