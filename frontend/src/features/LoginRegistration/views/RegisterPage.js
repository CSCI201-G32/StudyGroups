import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/login/RegisterPage.css';
import { useContext } from 'react';
import { AuthContext } from '../../../utils/AuthContext';

function RegisterPage(props) {

    const { setIsLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [major, setMajor] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8080/StudyGroups/Register', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
        
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
        
                        if (response !== "-1") {
                            console.log('Login successful. UserID:', response);
                            document.cookie = "UserID=" + response;
                            setIsLoggedIn(true);
                            navigate('/home');
                        } else {
                            console.error('Login failed');
                        }
                    } else {
                        console.error('Registration failed', xhr.status);
                    }
                }
            };
        
            const requestBody = JSON.stringify({ fname, lname, major, email, password });
            xhr.send(requestBody);
        } catch (error) {
            console.error('Error occurred:', error);
        }    
    };
    return (
            <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)}/>
                <input type="text" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)}/>
                <input type="email" placeholder="USC Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="Major" value={major} onChange={(e) => setMajor(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
            <a onClick={props.handleGuest} className="guest-link">Continue as Guest</a>
        </div>
    );
}

export default RegisterPage;
