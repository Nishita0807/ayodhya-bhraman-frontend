import React from 'react';
import "../../styles/card.css";
import welcomeImage from '../../images/welcome.jpg';


function LoungeCard({ hotel }) {
  const handleGetDirections = () => {
    // Split the mapLocation string into latitude and longitude
    const [destLat, destLong] = hotel.mapLocation.split(',');
  
    // Ask for permission to access user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // If permission is granted, extract latitude and longitude values from the position
        const sourceLat = position.coords.latitude;
        const sourceLong = position.coords.longitude;
  
        // Construct the Google Maps URL for directions
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${sourceLat},${sourceLong}&destination=${destLat},${destLong}`;
  
        // Open the Google Maps URL in a new tab
        window.open(googleMapsUrl, '_blank');
  
        // Send a message to the hotel's contact number
        sendMessage(hotel.contactNo);
      },
      (error) => {
        // Handle error or user denial
        console.error("Error getting user location:", error);
        alert("Error getting user location. Please make sure location services are enabled and try again.");
      }
    );
  };
  
  const sendMessage = (phoneNumber) => {
    const formattedPhoneNumber =  `+91${phoneNumber}`;

    const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
    const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.REACT_APP_TWILIO_PHONE_NUMBER;
    
  
    // Construct Twilio SMS API endpoint
    const apiUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages`;
  
    // Send message data
    const messageData = {
      To: formattedPhoneNumber,
      From: twilioNumber,
      Body: 'Interested in your hotel. Heading your way!'
    };
  
    // Send message using fetch
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken)
      },
      body: new URLSearchParams(messageData).toString()
    })
    .then(response => {
      if (response.ok) {
        console.log('Message sent successfully');
      } else {
        console.error('Failed to send message');
        alert('Failed to send message. Please try again later.');
      }
    })
    .catch(error => {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    });
  };
  
  

  return (
    <div className='card'>
      
        <img 
          className="card-image card-image-1"
          src={welcomeImage}
        />
  
    <div className='card-content-1'>
        <h3>{hotel.name}</h3>
        <div className="category-info">
          <p className="category-info-label">Contact No</p>
          <p className="category-info-value">{hotel.contactNo}</p>
        </div>
        <div className="category-info">
          <p className="category-info-label">Category</p>
          <p className="category-info-value">{hotel.category}</p>
        </div>
        <div className="price-info">
          <p className="price-info-label">Min Price</p>
          <p className="price-info-value">{hotel.minPrice}</p>
        </div>
        <div className="price-info">
          <p className="price-info-label">Max Price</p>
          <p className="price-info-value">{hotel.maxPrice}</p>
        </div>
        <button onClick={handleGetDirections} className="card-button" style={{marginTop:"4px"}}>Get Directions</button>
      </div>
    </div>
  );
}

export default LoungeCard;
