import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Account from './Account';
import Sidebar from '../controllers/Sidebar';
import Home from '../controllers/Home';
import SwitchVeterinary from '../controllers/SwitchVeterinary';
import '../controllers/Inside.css';
import Veterinarians from '../controllers/Veterinarians';
import { useLocation } from 'react-router-dom';


const Inside = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  console.log("insidee",userId);
  return (
    
  <div className='inside'>
     <div className='sidebare'> <Sidebar userId= {userId} /> </div>  

     <div className='content'>
     <Routes>
     <Route path="/veterinarians" element={<Veterinarians />} />

        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/switchVeterinary" element={<SwitchVeterinary/>} />

      </Routes>
     </div>

    </div>
  
  
  )
}

export default Inside;