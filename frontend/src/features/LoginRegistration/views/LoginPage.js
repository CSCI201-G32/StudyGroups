import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/login/LoginPage.css';
import { useContext } from 'react';
import { AuthContext } from '../../../utils/AuthContext';

function LoginPage(props) {

    const { setIsLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8080/StudyGroups/Login', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
        
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        document.cookie = "UserID=" + response;
                        if (response !== -1) {
                            console.log('Login successful. UserID:', response);
                            setIsLoggedIn(true);
                            navigate('/home');
                        } else {
                            alert("Login failed! Email and/or password was incorrect.")
                            console.error('Login failed');
                        }
                    } else {
                        console.error('Request failed:', xhr.status);
                    }
                }
            };
        
            const requestBody = JSON.stringify({ username, password });
            xhr.send(requestBody);
        } catch (error) {
            console.error('Error occurred:', error);
        }    
    };

    return (
        <div className="login-container">
        <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            <a onClick={props.handleGuest} className="guest-link">Continue as Guest</a>
        </div>
    );

}

export default LoginPage;