import React, { useState, useEffect } from 'react';
import '../../assets/NavigationBar.css';
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUserCircle, faSignOutAlt, faComment, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

function NavigationBar() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const { setIsLoggedIn } = useContext(AuthContext);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        document.cookie = "UserID=-1";
        setIsLoggedIn(false);
        handleNavigation('/');
    }

    return (
        <div>
            <div className='navigation-bar'>
                <h1>StudyManager</h1>
                <div className="icons-container">
                {isLoggedIn ? (
                    <>
                        <FontAwesomeIcon icon={faHome} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/home')} />
                        <FontAwesomeIcon icon={faComment} style={{ fontSize: '40px', margin: '0 15x' }} onClick={() => handleNavigation('/chat')} /> 
                        <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/create')} />
                        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/account')} />
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleLogout()} />
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faHome} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/home')} />
                        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/')} />
                    </>
                )}
                </div>
                </div>
        </div>
    );
    
}

export default NavigationBar
