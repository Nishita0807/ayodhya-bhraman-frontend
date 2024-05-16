import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/register.css'; // Import the CSS file
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    
    const { username, password } = formData;
    axios.defaults.withCredentials=true;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://ayodhya-bhraman-backend.vercel.app/api/register`, {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            navigate('/login'); // Redirect to login page after registration
        } catch (err) {
            if (err.response.status === 400 && err.response.data.msg === 'User already exists') {
                alert('User already registered. Please login.');
                navigate('/login'); // If user already exists, navigate to login page
            } else {
                console.error(err.response.data);
            }
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2><AppRegistrationOutlinedIcon style={{ fontSize: '30px' }}/></h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={username} onChange={onChange} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <div>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
