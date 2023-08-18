import React from 'react'
import img from '../view/logoPet.png';
import '../controllers/Veterinarians.css';
import Veterinary from '../controllers/cardVeterinary';
import { useState ,useEffect} from 'react';


const Veterinarians = () => {
  const [veterinarians,setVeterinarians] = useState([]);


   const [location,setLocation] = useState('');

   useEffect(() => {
    fetch('http://localhost:3001/veterinarians') // Change the URL to match your API endpoint
      .then(response => response.json())
      .then(data => setVeterinarians(data))
      .catch(error => console.error('Error fetching :', error));
  }, []);

  return (
    <div className='veterinariansPage'>
            <img id='logoveterinarians' src={img}  />
            <div className='content-v'>
              <input id='searchVeterinary'  placeholder='Enter your location' 
              onChange={(e)=> setLocation(e.target.value) }  />

              
            <div className=' veterinarians'>
         {veterinarians.map((card, index) => {
          
         
          if( card.adresse.includes(location) ){
            return(
              <Veterinary
              key={index}
              imageUrl={card.imageUrl}
              name={card.name}
              description={card.description}
              gmail={card.gmail}
              phone={card.phone}
              adresse={card.adresse}
            />
            );
        
          }
       
     } )}
         </div>
            </div>
     
    </div>
  )
}

export default Veterinarians