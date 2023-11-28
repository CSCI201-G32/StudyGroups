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
            const response = await fetch('http://localhost:8080/StudyGroupsFinalProj_v2/Register', {
                mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
                body: JSON.stringify({ fname, lname, major, email, password }),
            });

            if (response.ok) {
                // Handle successful login
                console.log('Registration successful');
            } else {
                // Handle login failure
                console.error('Registration failed');
            }
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
