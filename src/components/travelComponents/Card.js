import React, { useState, useEffect } from "react";
import "../../styles/card.css";
import PopupBox from "./PopupBox";

const Card = ({ location, currentLocation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 720);
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Call handleResize initially
    handleResize();

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/${currentLocation.latitude},${currentLocation.longitude}/${location.latitude},${location.longitude}`;
    window.open(url, '_blank');
  };

  const handleReadMore = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="card">
      <img src={require(`../../images/${location.source}`)} alt={location.name} className="card-image" />
      <div className="card-content">
        <h3>{location.name}</h3>
        <p>
          {isMobileView ? (
            <>{location.content.slice(0, 25)}... </>
          ) : (
            <>{location.content.slice(0, 200)}... </>
          )}
          {location.content.length > (isMobileView ? 25 : 200) && (
            <div onClick={handleReadMore} className="read-more">Read more</div>
          )}
        </p>
        <button onClick={handleGetDirections} className="card-button">Get Directions</button>
      </div>
      {showPopup && (
        <PopupBox content={location.content} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Card;
