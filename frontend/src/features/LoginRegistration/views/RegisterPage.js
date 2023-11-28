import React from 'react';
import { useState } from 'react';
import '../../../assets/login/RegisterPage.css';

function RegisterPage() {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [major, setMajor] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8080/StudyGroupsFinalProj_v2/Register', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
        
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
        
                        if (response !== "-1") {
                            // Handle successful login and use userID
                            console.log('Login successful. UserID:', response);
                            document.cookie = "UserID=" + response;
                        } else {
                            // Handle scenario where userID is not available in response
                            console.error('UserID not found in the response');
                        }
                    } else {
                        // Handle login failure
                        console.error('Login failed:', xhr.status);
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
                <input type="text" placeholder="Major" value={major} onChange={(e) => setMajor(e.target.value)}/>
                <input type="email" placeholder="USC Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
