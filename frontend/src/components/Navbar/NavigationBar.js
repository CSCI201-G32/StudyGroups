import React, { useState, useEffect } from 'react';
import '../../assets/NavigationBar.css';
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUserCircle, faSignOutAlt, faComment, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

function NavigationBar() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div className='navigation-bar'>
                <h1>StudyManager</h1>
                <div className="icons-container">
                {isLoggedIn ? (
                    <>
                        <FontAwesomeIcon icon={faHome} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/home')} />
                        <FontAwesomeIcon icon={faComment} style={{ fontSize: '40px', margin: '0 15x' }} onClick={() => handleNavigation('/chat')} /> 
                        <FontAwesomeIcon icon={faPlus} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/create')} />
                        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/account')} />
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/')} />
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faUsers} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/home')} />
                        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '40px', margin: '0 15px' }} onClick={() => handleNavigation('/')} />
                    </>
                )}
                </div>
                </div>
        </div>
    );
    
}

export default NavigationBar
