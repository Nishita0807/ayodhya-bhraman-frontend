import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Gallery from './components/Gallery';
import Travel from './components/Travel';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import LoungeAccess from "./components/LoungeAccess";
import Register from './components/Register';
import Login from './components/Login';
import AddHotel from './components/AddHotel';
import Contact from './components/Contact';



const App = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        // Check if the user is already logged in
        const checkLoggedIn = () => {
            const username = localStorage.getItem('username');
            if (username) {
                setIsLoggedIn(true);
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <Router>
            <div>
                <Header />
                <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/gallery" element={<Gallery />} />
                    <Route exact path="/travel" element={<Travel />} />
                    <Route exact path="/lounge" element={<LoungeAccess />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route exact path="/add-hotel" element={isLoggedIn ? <AddHotel /> : <Navigate to="/register" replace />} />
                    <Route exact path="/contact" element={<Contact />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
