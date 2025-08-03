import React from 'react'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Contact from './pages/Contact'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Payment from './pages/payment'
import Upload from './pages/Upload'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Profile from './pages/Profile'
import Feedback from './pages/Feedback'
// import OAuthSuccess from './pages/OAuthSuccess'
import OAuthSuccess from './pages/OAuthSuccess'
function App() {
  return (
   
    <Router>
       <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/loginregister' element={<Login/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path="/upload" element = {<Upload/>}></Route>
        <Route path="/success" element = {<Success/>}></Route>
        <Route path="/cancel" element = {<Cancel/>}></Route>
        <Route path="/myprofile" element={<Profile/>}></Route>
        <Route path="/feedback" element = {<Feedback/>}></Route>
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App