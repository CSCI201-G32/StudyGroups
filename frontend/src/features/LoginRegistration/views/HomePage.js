import React from 'react';
import '../../../assets/login/HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleGuest = () => {
        navigate('/guest');
    };

    return (
        <div>
            <div className="welcome-container">
                <button className="button" onClick={handleRegister}>Register</button>
            </div>
            <div className="welcome-container">
                <button className="button" onClick={handleLogin}>Login</button>
            </div>
            <div className="welcome-container">
                <button className="button" onClick={handleGuest}>Continue as Guest</button>
            </div>
        </div>
    );
    
}

export default HomePage;