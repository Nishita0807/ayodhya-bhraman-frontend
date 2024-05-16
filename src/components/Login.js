import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Import the CSS file
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const Login = ({ onLogin }) => {
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
            const res = await axios.post(`https://ayodhya-bhraman-backend.vercel.app/api/login`, {
                username,
                password
            });
            console.log(res.data);
            localStorage.setItem('Authorization', `Bearer ${res.data.token}`);

            onLogin(); // Call the onLogin callback function from parent component
            navigate('/add-hotel');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2><LoginOutlinedIcon style={{fontSize:"30px"}}/></h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={username} onChange={onChange} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
