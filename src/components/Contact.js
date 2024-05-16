import React, { useState } from 'react';
import { FaWhatsapp, FaTelegram, FaDiscord } from 'react-icons/fa';
import emailjs from 'emailjs-com'; // Import emailjs-com library
import '../styles/contact.css'; // Import your CSS file

function Contact() {
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    // Send feedback message via EmailJS
    emailjs.send('service_jzj3d7r', 'template_pzh5and', {
      message: feedback,
    }, 'VM76ElLPOZSSTEXAU')
      .then((response) => {
        console.log('Feedback sent successfully!', response);
        // Clear the input field after submitting
        setFeedback('');
      })
      .catch((error) => {
        console.error('Error sending feedback:', error);
      });
  };

  return (
    <div className="container">
      <div className='contact-box'>
        <div className="icon-row">
          <a href="https://wa.me/8423535824">
            <FaWhatsapp className="icon whatsapp" />
          </a>
          <a href="https://t.me/NISHI1597">
            <FaTelegram className="icon telegram" />
          </a>
          <a href="https://discord.com/invite/FFpQSAJT">
            <FaDiscord className="icon discord" />
          </a>
        </div>
        <p style={{ textAlign: 'center', margin: '10px 0' }}>OR</p>
        <div className="feedback-section">
          <textarea
            value={feedback}
            onChange={handleChange}
            placeholder="Provide feedback..."
            style={{ width: '94%', height: '200px' }}
          />
          <button onClick={handleSubmit}>Send Feedback</button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
