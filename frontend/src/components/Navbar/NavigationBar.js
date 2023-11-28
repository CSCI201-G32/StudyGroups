import React, { useState, useEffect } from 'react';
import '../../assets/NavigationBar.css';
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


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
                        <FontAwesomeIcon icon={faHome} style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => navigate('/home')} />
                        <FontAwesomeIcon icon={faUsers} style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => handleNavigation('/:groupName/view')} />
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => handleNavigation('Logout')} />
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faHome} style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => handleNavigation('/home')} />
                        <FontAwesomeIcon icon={faUsers} style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => handleNavigation('/create')} />
                        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '30px', margin: '0 5px' }} onClick={() => handleNavigation('/reg')} />
                    </>
                )}
            </div>
        </header>
    );
    
}

export default NavigationBar
