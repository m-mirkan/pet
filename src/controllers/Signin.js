import React, { useState , useEffect} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../controllers/Signup.css';
import '../controllers/Inside';
import { useNavigate } from 'react-router';
import img from '../view/logoPet.png';
import '../controllers/Signin.css';
import fleche from '../controllers/fleche.png';


const Signin = ({ auth }) => {
    const [user, setUser] = useState('');


  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetchData, setFetchData] = useState(false);

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword (auth, email, password);
      console.log('User signed in successfully!');
      setFetchData(true); 
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const goToSignup = () => {
    navigate('/');
  };

  const goInside = (userId) => {
    console.log(userId);
    navigate('/inside',{state: {userId}});
  };
 
  useEffect(() => {
    if (fetchData ) {
      fetch(`http://localhost:3001/signIn?gmail=${email}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched user data:', data[0].id);
          setUser(data[0]);
          goInside(data[0].id);

        })
        .catch(error => console.error('Error fetching user:', error));
    }else{
      console.log('f');
    }
  }, [fetchData, email]);

  return (
    <div className='signin'>
          <img id='logo' src= {img} alt='logo' />
<div className='formSignin'>
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

      <div id='direction'>
      <div id='gotosignup' onClick={goToSignup}> <img id='fleche' src= {fleche} alt='fleche' />
</div>

      <button onClick={handleSignin}>Sign In</button>
      
    
      </div>
    
      

    </div>
</div>
   
  );

};

export default Signin;
