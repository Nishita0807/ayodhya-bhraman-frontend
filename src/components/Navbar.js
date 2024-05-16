import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown1, setShowDropdown1] = useState(false);

    const dropdownRef = useRef(null);
console.log(isLoggedIn)
    useEffect(() => {
        // Check if user is already logged in
        const checkLoggedIn = () => {
            // Check if the user's information is already stored locally
            // For simplicity, you can check if username exists in localStorage
            const username = localStorage.getItem('username');
            if (username) {
                setIsLoggedIn(true);
            }
        };

        checkLoggedIn();
    }, []);

    useEffect(() => {
        // Function to handle clicks outside of the dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        // Add event listener when the dropdown is shown
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            // Remove event listener when the dropdown is hidden
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);


    useEffect(() => {
        // Function to handle clicks outside of the dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown1(false);
            }
        };

        // Add event listener when the dropdown is shown
        if (showDropdown1) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            // Remove event listener when the dropdown is hidden
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown1]);

    const isActive = (pathname) => {
        // Check if current pathname matches exactly or starts with the provided pathname
        return (location.pathname === pathname || location.pathname.startsWith(pathname)) && pathname !== '/' ? 'active' : (location.pathname === '/' && pathname === '/' ? 'active' : '');
    };

    const handleRegisterClick = () => {
        // Alert when clicking on Register button from Navbar
        alert("Registering for a new account...");
    };

    const handleDropdownItemClick = () => {
        // Close the dropdown menu when any link inside it is clicked
        setShowDropdown(false);
        setShowDropdown1(false);
    };
   
    return (
        <div className="nav">
            <div className="main">
                <Link className={`tab ${isActive('/')}`} to="/" style={{ textDecoration: 'none', color: "white" }}>Home</Link>
                <Link className={`tab ${isActive('/gallery')}`} to="/gallery" style={{ textDecoration: 'none', color: "white" }}>Gallery</Link>
                <Link className={`tab ${isActive('/travel')}`} to="/travel" style={{ textDecoration: 'none', color: "white" }}>Travel</Link>
                <Link className={`tab ${isActive('/lounge')}`} to="/lounge" style={{ textDecoration: 'none', color: "white" }}>Lounge Access</Link>
            </div>
            <div className='menu' onClick={() => setShowDropdown1(!showDropdown1)}>Menu</div>
            {showDropdown1 && (
                <div className="dropdown1" ref={dropdownRef}>
                                       <div onClick={() => setShowDropdown1(false)} style={{textAlign:'right'}}>X</div>

                    <Link to="/" onClick={handleDropdownItemClick}>Home</Link>
                    <Link to="/gallery" onClick={handleDropdownItemClick}>Gallery</Link>
                    <Link to="/travel" onClick={handleDropdownItemClick}>Travel</Link>

                    <Link to="/lounge" onClick={handleDropdownItemClick}>Lounge Access</Link>


                </div>
            )}
            <div className="connect">
                {location.pathname === '/add-hotel' && isLoggedIn ? (
                    <Link className={`tab ${isActive('/add-hotel')}`} to="/add-hotel" style={{ textDecoration: 'none', color: "white" }}>Add Hotel</Link>
                ) : (
                    location.pathname === '/login' ? (
                        <Link className={`tab ${isActive('/login')}`} to="/login" style={{ textDecoration: 'none', color: "white" }}>Login</Link>
                    ) : (
                        <Link className={`tab ${isActive('/register')}`} to="/register" style={{ textDecoration: 'none', color: "white" }} onClick={handleRegisterClick}>Register</Link>
                    )
                )}
                <Link className={`tab ${isActive('/contact')}`} to="/contact" style={{ textDecoration: 'none', color: "white" }}>Contact Us</Link>
                <div id='google_translate_element'></div>
            </div>
            <div className='hamburger' onClick={() => setShowDropdown(!showDropdown)}><MenuIcon style={{fontSize:"24px"}}/></div>
            {showDropdown && (
                <div className="dropdown" ref={dropdownRef}>
                   <div onClick={() => setShowDropdown(false)} style={{textAlign:'right'}}>X</div>
                    <Link to="/register" onClick={handleDropdownItemClick}>Register</Link>
                    <Link to="/contact" onClick={handleDropdownItemClick}>Contact Us</Link>
                    <div id='google_translate_element'></div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
