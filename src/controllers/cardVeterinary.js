import React from 'react';
import '../controllers/cardVeterinary.css'; 
import legs from '../controllers/legs.png';

import { FaEnvelope , FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Card = ({ imageUrl, name, description, gmail,phone,adresse }) => {
  return (
    <div className="card">
    <img className='legs'  src={legs} alt='legs '  />
      <div className='cont'>
       <img src={imageUrl} alt={name} className="card-image" />
       <h3 className="card-name">{name}</h3>
       <p className="card-description">{description}</p>
      </div>
      <div className="card-contact"> 
      <div id='adresse'><  FaMapMarkerAlt  />    {adresse}</div> 
      <div id='gmail'><FaEnvelope />    {gmail}</div> 
      <div id='phone'>< FaPhone/>    {phone}</div> 

       </div>
     
    </div>
  );
};

export default Card;
