import React, { useState, useEffect } from 'react';
import './NavigationBar.css';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaSearch, FaCalendar, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

function NavigationBar() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in
        const cookie = document.cookie.includes('first=');
        setIsLoggedIn(cookie);
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <header>
            <div>
                <h1>StudyManager</h1>
            </div>
            <div>
                {isLoggedIn ? (
                    <>
                        <FaHome style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => navigate('/home')} />
                        <FaUsers style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => handleNavigation('/:groupName/view')} />
                        <FaSignOutAlt style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => handleNavigation('Logout')} />
                    </>
                ) : (
                    <>
                        <FaHome style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => handleNavigation('/home')} />
                        <FaUsers style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => handleNavigation('/create')} />
                        <FaUserCircle style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => handleNavigation('/reg')} />
                    </>
                )}
            </div>
        </header>
    );
    
}

export default NavigationBar
