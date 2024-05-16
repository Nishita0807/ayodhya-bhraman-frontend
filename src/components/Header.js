import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Ayodhya1 from "../images/ayodhya1.jpg";
import Ayodhya2 from "../images/ayodhya2.jpg";
import Ayodhya3 from "../images/ayodhya3.png";

const Header = () => {
  const images = [Ayodhya1, Ayodhya2, Ayodhya3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <header style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
      <motion.div
        className="image-bundle"
        style={{
          display: 'flex',
          width: `${images.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
          transition: 'transform 1s ease',
          
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={` ${index + 1}`}
            style={{ width: `${100 / images.length}%`, height: '300px' }}
          />
        ))}
      </motion.div>
    </header>
  );
};

export default Header;
