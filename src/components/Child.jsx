import React from 'react';
import "./Child.css"


const Child = ({ image, title, cost }) => {
  return (
    <div className='main'>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>₹{cost}</p>
      <button>Order now</button>
    </div>
  );
};

export default Child;