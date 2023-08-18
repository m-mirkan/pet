import React from 'react';
import '../controllers/cardAnimal.css'; // Create a CSS file for styling the card
import legs from '../controllers/legs.png';

const Card = ({ picture, name, description, contact }) => {
  return (
    <div className="card">
    <img className='legs'  src={legs} alt='legs '  />
      <div className='cont'>
       <img src={picture} alt={name} className="card-image" />
       <h3 className="card-name">{name}</h3>
       <p className="card-description">{description}</p>
      </div>
      <div className="card-contact"> Contact:  {contact}</div>

    </div>
  );
};

export default Card;
