import React, { useState } from 'react';
import '../../../assets/login/HomePage.css';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage'; // Adjust the path based on your project structure
import RegisterPage from './RegisterPage'; // Adjust the path based on your project structure

function HomePage() {
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const handleGuest = () => {
        document.cookie = "userID=-1";
        navigate('/home');
    };

    return (
        <div>
            <div className="auth-box">
                <div className="tab-container">
                    <button 
                        className={`tab-button ${activeTab === 'login' ? 'active' : ''}`} 
                        onClick={() => handleTabChange('login')}
                    >
                        Sign In
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'register' ? 'active' : ''}`} 
                        onClick={() => handleTabChange('register')}
                    >
                        Sign Up
                    </button>
                    
                </div>
                {activeTab === 'login' && <LoginPage handleGuest={handleGuest} />}
                {activeTab === 'register' && <RegisterPage handleGuest={handleGuest}/>}
                
            </div>
        </div>
    );
}

export default HomePage;
