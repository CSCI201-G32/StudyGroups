import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Account.css';
import { BrowserRouter as Link} from 'react-router-dom';

const AccountPage = () => {
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    displayInfo();
  }, []);

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
    axios
      .get('AccountServlet', {
        params: {
          userId: cookie,
        },
      })
      .then((response) => {
        const info = response.data;
        setAccountInfo(info);
      })
      .catch((error) => {
        console.error(error);
        setAccountInfo({ error: 'Error fetching account information.' });
      });
  };

  return (
    <div>
      <header>
        <div>
          <h1>Account</h1>
        </div>
        <div>
            <Link to="/mainHomePage" className="fa fa-home"></Link>
            <Link to="/home" className="fa fa-users"></Link>
            <Link to="/search" className="fa fa-search"></Link>
            <Link to="/calendar" className="fa fa-calendar"></Link>
            <Link to="/account" className="fa fa-user-circle"></Link>
            <Link to="/" className="fa fa-sign-out"></Link>
        </div>
      </header>
      <div id="accountMsg">
        {accountInfo ? (
          <fieldset className="results">
            <legend>Account Information</legend>
            <p>First Name: {accountInfo.FirstName}</p>
            <p>Last Name: {accountInfo.LastName}</p>
            <p>Email: {accountInfo.Email}</p>
            <p>Major: {accountInfo.Major}</p>
          </fieldset>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
