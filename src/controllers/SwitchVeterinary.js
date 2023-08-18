import React, { useState, useEffect } from 'react';
import img from '../view/logoPet.png';
import Card from '../controllers/cardVeterinary';
import { useLocation } from 'react-router-dom';
import legs from '../controllers/legs.png';

const SwitchVeterinary = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const [isVeterinary, setIsVeterinary] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/isVeterinary?user_id=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setIsVeterinary(data[0]);
        }
      })
      .catch(error => console.error('Error isVeterinary:', error));
  }, [isVeterinary]);

  const [vetData, setVetData] = useState({
    user_id: userId,
    name: '',
    description: '',
    gmail: '',
    phone: '',
    adresse: '',
    picture: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setVetData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRegisterVeterinary = () => {
    fetch('http://localhost:3001/addVeterinary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vetData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error('Error registering veterinary:', error);
      });
  };

  return (
    <div>
      {!isVeterinary ? (
        <div>
          <img id='logoadd' src={img} alt='Logo' />
          <div className="container">
            <form className='form'>
              <img className='leg' src={legs} alt='legs' />
              <div className='inputs'>
                <input name="name" placeholder="Your full name" onChange={handleFormChange} />
                <input name="description" placeholder="Bio" onChange={handleFormChange} />
                <input name="adresse" placeholder="Your address" onChange={handleFormChange} />
                <input name="phone" placeholder="Your phone number" onChange={handleFormChange} />
                <input name="gmail" placeholder="Your Gmail address" onChange={handleFormChange} />
                <label>
                  Your picture!
                  <input className='pic' name="picture" type="file" accept="image/*" onChange={handleFormChange} />
                </label>
              </div>
              <button type="button" onClick={handleRegisterVeterinary}>Register Veterinary</button>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h4>Your profile: </h4>
          <Card imageUrl={isVeterinary.picture} name={isVeterinary.name} description={isVeterinary.description} gmail={isVeterinary.gmail} phone={isVeterinary.phone} adresse={isVeterinary.adresse} />
        </div>
      )}
    </div>
  );
}

export default SwitchVeterinary;
