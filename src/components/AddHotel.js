import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/add-hotel.css'; // Import the CSS file


const AddHotel = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        contactNo: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        mapLocation: ''
    });

    const { name, contactNo, category, minPrice, maxPrice, mapLocation } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            // Your validation code here
            if (!/^[6-9]\d{9}$/.test(contactNo)) {
                alert('Please enter a valid Indian contact number (without country code +91)');
                return;
            }
    
            // Validating minPrice and maxPrice
            if (minPrice >= maxPrice) {
                alert('Minimum price should be less than maximum price');
                return;
            }
            const token = localStorage.getItem('Authorization');
            const tokenWithoutBearer = token ? token.split(' ')[1] : null;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': tokenWithoutBearer
                }
            };
            const res = await axios.post(`http://localhost:8000/api/hotels`, formData, config);
            console.log(res.data);
            setFormData({
                name: '',
                contactNo: '',
                category: '',
                minPrice: '',
                maxPrice: '',
                mapLocation: ''
            });
            navigate('/lounge');
        } catch (err) {
            console.error(err);
        }
    };

    const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const location = `${latitude},${longitude}`;
            setFormData({ ...formData, mapLocation: location });
        });
    };

    return (
        <div className="add-hotel-container">
            <div className="add-hotel-form">
                <h2>Add Hotel</h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={name} onChange={onChange} required />
                    </div>
                    <div>
                        <label>Contact No:</label>
                        <input type="tel" name="contactNo" value={contactNo} onChange={onChange} required />
                    </div>
                    <div className='category-hotel'>
                        <label>Category:</label>
                        <select name="category" value={category} onChange={onChange} required>
                            <option value="">Select Category</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Dharamshala">Dharamshala</option>
                        </select>
                    </div>
                    <div>
                        <label>Price Range:</label>
                        <input type="number" name="minPrice" placeholder="Min Price" value={minPrice} onChange={onChange} required />
                        <input type="number" name="maxPrice" placeholder="Max Price" value={maxPrice} onChange={onChange} required />
                    </div>
                    <div>
                        <button type="button" onClick={fetchLocation}>Fetch Location</button>
                        <label>Map Location:</label>
                        <input type="text" name="mapLocation" value={mapLocation} onChange={onChange} required disabled />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddHotel;
