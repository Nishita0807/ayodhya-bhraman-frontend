import React, { useState ,useEffect} from "react";


import Main from "./Main";

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "../styles/home.css";
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import CloseIcon from '@mui/icons-material/Close';

import DirectionsRailwayFilledOutlinedIcon from '@mui/icons-material/DirectionsRailwayFilledOutlined';
import DirectionsBusFilledOutlinedIcon from '@mui/icons-material/DirectionsBusFilledOutlined';
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
const Home = () => {
  
    const [isVisible, setIsVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

 

  useEffect(() => {
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDirectionClick = () => {
    setShowPopup(true);
};

const handleClosePopup = () => {
    setShowPopup(false);
};
const handleRailwayDirections = () => {
  const url = `https://www.google.com/maps/dir/?api=1&origin=26.795688,82.194431&destination=26.7878796,82.2005827`;
  window.open(url, "_blank");
};

const handleBusDirections = () => {
  const url = `https://www.google.com/maps/dir/?api=1&origin=26.795688,82.194431&destination=26.8092427,82.20959409999999`;
  window.open(url, "_blank");
};

const handleFlightDirections = () => {
  const url = `https://www.google.com/maps/dir/?api=1&origin=26.795688,82.194431&destination=26.74803369999997,82.1507812`;
  window.open(url, "_blank");
};

    
    return (
        <div>
           
            <Main/>
            <div className='ayodhya-direction'>
            <div className="direction-icon" onClick={handleDirectionClick}>
                    <DirectionsOutlinedIcon />
                </div>
    {isVisible && 
        <button className="scrollToTop" onClick={scrollToTop}>
            <ArrowUpwardIcon />
        </button>
    }
</div>
{showPopup && (
                <div className="popup-container">
                    <div className="popup-content">
                        <div className="close-icon" onClick={handleClosePopup}>
                            <CloseIcon />
                        </div>
                        <div className="popup-icons">
                            <div className="direction" onClick={handleRailwayDirections}><DirectionsRailwayFilledOutlinedIcon/></div>
                            <div className="direction" onClick={handleBusDirections}><DirectionsBusFilledOutlinedIcon/></div>
                            <div className="direction" onClick={handleFlightDirections}><FlightOutlinedIcon/></div>
                        </div>
                    </div>
                </div>
            )}
     
          
        </div>
    );
};

export default Home;
