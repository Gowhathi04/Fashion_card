import React from 'react';
import './App.css';
import "./index.css"
import Child from './components/Child';

import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";

const App = () => {
  return (
    <div className="container">
      <h1 className="title">MY FASHION STORE</h1>

      <div className="products">
        <Child image={image1} title="Jeans" cost={500} />
        <Child image={image2} title="Tank Top" cost={600} />
        <Child image={image3} title="Trousers" cost={700} />
      </div>
    </div>
  );
};

export default App;