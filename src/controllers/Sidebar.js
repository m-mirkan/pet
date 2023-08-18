import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = (props) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/inside',{state:{ userId :  props.userId}});
  };

  const goToAccount = () => {
    navigate('/inside/account',{state:{ userId :  props.userId}});
  };
  const goToVeterinarians = () => {
    navigate('/inside/veterinarians',{state:{ userId :  props.userId}});
  };


  return (
    <div className="sidebar">
       <div className='sidebar-menu'>

       <div style={{ fontSize: '32px' }} onClick={goToVeterinarians}>🏥</div>
        <div  style={{ fontSize: '24px' }} onClick={goToHome}>  Home</div>
        <div  style={{ fontSize: '24px' }} onClick={goToAccount}>Account</div>

        </div>
      
    </div>
  );
};

export default Sidebar;
