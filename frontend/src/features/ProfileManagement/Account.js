import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../assets/profile-management/Account.css';
import {Link} from 'react-router-dom';

const AccountPage = () => {
    const [accountInfo,
        setAccountInfo] = useState(null);

    useEffect(() => {
        const getCookie = (cname) => {
            const name = cname + '=';
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        };

        const displayInfo = () => {
            const cookie = getCookie('UserID');
            const url = 'http://localhost:8080/StudyGroups/AccountServlet';
            const formData = new URLSearchParams();
            formData.append('userId', cookie);

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            }).then(data => {
                setAccountInfo(data);
            }).catch(error => {
                console.error(error);
                setAccountInfo({error: 'Error fetching account information.'});
            });
        };

        displayInfo(); // This should be inside the useEffect but outside of displayInfo
    }, []);

    return (
        <div className="account-container">
          <h1>Account Info</h1>
            <div id="accountMsg">
                {accountInfo
                    ? (
                        <fieldset className="results">
                            <legend>Account Information</legend>
                            <p>First Name: {accountInfo.FirstName}</p>
                            <p>Last Name: {accountInfo.LastName}</p>
                            <p>Email: {accountInfo.Email}</p>
                            <p>Major: {accountInfo.Major}</p>
                        </fieldset>
                    )
                    : (
                        <p>Loading...</p>
                    )}
            </div>
        </div>
    );
};

export default AccountPage;
