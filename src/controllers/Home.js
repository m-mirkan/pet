import React, { useState, useEffect } from 'react';
import img from '../view/logoPet.png';
import '../controllers/Home.css';
import fleche2 from '../controllers/fleche2.png';
import fleche from '../controllers/fleche.png';
import rabbit from '../controllers/rabbit.png';
import dog from '../controllers/dog.png';
import cat from '../controllers/cat.png';
import bird from '../controllers/bird.png';
import hamester from '../controllers/hamster.png';
import Card from '../controllers/cardAnimal';

const Home = () => {
  const animals = [
    rabbit, dog, cat, bird, hamester
  ];

  const [id, setId] = useState(0);
  const [raceFilter, setRaceFilter] = useState(''); 
  const goLeft = () => {
    if (id > 0) {
      setId(id - 1);
    }
  
  };

  const goRight = () => {
    if (id < animals.length - 3) {
      setId(id + 1);
    }
  };
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/pets') // Change the URL to match your API endpoint
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  



  return (
    <div className='home'>
      <img id='logohome' src={img} alt="Logo" />
   
      <div className='container'>
      <div className='slider'>
        <img onClick={goLeft} src={fleche} alt="Arrow" />
        <div className='animal'><img className='imgAnimal' src={animals[id]} alt="Animal" /></div>
        <div className='animal' style={{ backgroundColor: '#733838' }} ><img className='imgAnimal' src={animals[id + 1]} alt="Animal" /></div>
        <div className='animal'><img className='imgAnimal' src={animals[id + 2]} alt="Animal" /></div>
        <img onClick={goRight} src={fleche2} alt="Arrow" />
      </div>

      <input  
        id='searchRace'
        placeholder='Specify a race'
        onChange={(e) => setRaceFilter(e.target.value)}
      />
      <div className='pets'>

      {pets.map((card, index) => {
    if ( (!raceFilter || card.race.startsWith( raceFilter))) {
      return (
      <Card
        key={card.id}
        picture={card.picture}
        name={card.name}
        description={card.description}
        contact={card.contact}
      />
    );
  }
})}

</div>

      </div>
  
      
    </div>
  );
};

export default Home;
