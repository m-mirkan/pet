import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../controllers/Signup.css';
import { useNavigate } from 'react-router';
import img from '../view/logoPet.png';

const Signup = ({ auth }) => {

  const handleregisterUser = (gmail) => {
    fetch('http://localhost:3001/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ gmail }) 
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message); 
    })
    .catch(error => {
      console.error('Error registering user:', error);
    });
  };
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully!');
      handleregisterUser(email);
      goToSignin();
    } catch (error) {
      console.error('Error signing up:', error.code, error.message);
    }
  };
  

  const goToSignin = () => {
    navigate('/signin');
  };

 
  

  return (
    <div className='signup'>
          <img id='logo' src= {img} alt='logo' />
<div className='formSignup'>
<h2>Welcome hero!!</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      
      <button onClick={handleSignup}>Sign Up</button>
      <div id='gotosignin' onClick={goToSignin}>You have already an account ! Signin</div>
      
    
      

    </div>
</div>
   
  );
  
};

export default Signup;
