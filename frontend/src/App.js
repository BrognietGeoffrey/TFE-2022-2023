import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"


import Navbar from './components/Navbar/index'
import Home from './components/Home/Home'
import Login from './components/LogIn/LogIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
function App() {  
     
  return (  
    <Router>  
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/login' exact element={<Login/>} />

      </Routes>

    </Router>  
  );  
}  
 
export default App;