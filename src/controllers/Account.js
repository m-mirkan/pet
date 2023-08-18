import React, { useState, useEffect } from 'react';
import img from '../view/logoPet.png';
import '../controllers/Account.css';
import legs from '../controllers/legs.png';
import { useNavigate } from 'react-router-dom';
  import CardPet from '../controllers/cardAnimal'
  import { useLocation } from 'react-router-dom';



const Account = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const navigate = useNavigate();

  const switchVeterinary = () => {
    navigate('/inside/account/switchVeterinary',{state:{ userId }});
  };

  
  const [choosen, setChoosen] = useState(1);

  const handleChoice = (key) => {
    const pet = document.getElementById("pet");
    const veterinary = document.getElementById("veterinary");
    setChoosen(key);
    if (key === 1) {
      pet.style.color = '#733838';
      veterinary.style.color = '#FFDFB9';
    } else {
      
        pet.style.color = '#FFDFB9';
        veterinary.style.color = '#733838';
    
    }
    
  };

  const [petData, setPetData] = useState(
    {
      user_id : userId ,
      type: '',
      race: '',
      name: '',
      description: '',
      contact: '',
      picture: '',

    }
  )

  const [mypets, setMypets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/mypets?user_id=${userId}`) 
      .then(response => response.json())
      .then(data => setMypets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPetData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRegisterPet = () => {
    fetch('http://localhost:3001/addPet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: petData.user_id,
        type: petData.type,
        race: petData.race,
        name: petData.name,
        description: petData.description,
        contact: petData.contact,
        picture: petData.imageUrl,

      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error('Error registering pet:', error);
      });
  };
  
  
  return (
    <div id='add'>
      <img id='logoadd' src={img} alt='Logo' />
      <div className='container'>
        <div id='choice'>
          <h3 id='pet' onClick={() => handleChoice(1)}> Add </h3>
          <h3 id='veterinary' onClick={() => handleChoice(2)}>Archieve</h3>
        </div>
        {choosen === 1 ? (
          <form className='form'>
          <img className='leg' src={legs} alt='legs' />
          <div className='inputs'>
            <select name="type" onChange={handleFormChange}>
              <option>Dog</option>
              <option>Cat</option>
              <option>Rabbit</option>
              <option>Bird</option>
              <option>Hamester</option>
              </select> <br/>
            <input name="race" placeholder="What's your pet race!" onChange={handleFormChange} />
            <input name="name" placeholder="What's your pet name!" onChange={handleFormChange} />
            <input name="description" type="text" placeholder="Describe it" onChange={handleFormChange} />
            <input name="contact" placeholder="Your contact" onChange={handleFormChange} />
            <label>
              Your pet picture 
              <input className='pic' name="imageUrl" type="file" accept="image/*" onChange={handleFormChange} />
            </label>
          </div>
          <button type="button" onClick={handleRegisterPet}>ADD</button>
        </form>
        ) : (
          <div id='ownCards'> {
            mypets.map( (card,index) =>(
             <CardPet
             key={index}
             imageUrl={card.imageUrl}
             name={card.name}
             description={card.description}
             contact={card.contact}
             />

            )
            )
            }
             </div> 
        )}
     <h4 id='switchVeterinary' onClick={switchVeterinary} >Switch to veterinary </h4>

      </div>

    </div>
    
  );
}

export default Account;
