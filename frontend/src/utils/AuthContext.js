import React, { createContext, useState, useEffect } from 'react';
import { getCookie } from './utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const cookie = getCookie("UserID");
        setIsLoggedIn(cookie > 0);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
