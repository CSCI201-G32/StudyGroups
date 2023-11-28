import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/profile-management/Search.css';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    axios
      .get('SearchServlet', {
        params: {
          parameter: searchText,
        },
      })
      .then((response) => {
        setSearchResult(response.data);
        setError(''); // Clear any previous error
      })
      .catch((error) => {
        setError(error.message);
        setSearchResult(null); // Clear previous search results
      });
  };

  return (
    <div>
      <header>
        <div>
          <h1>Search</h1>
        </div>
        <div>
            <Link to="/" className="fa fa-home" />
            <Link to="/groups" className="fa fa-users" />
            <Link to="/search" className="fa fa-search" />
            <Link to="/calendar" className="fa fa-calendar" />
            <Link to="/account" className="fa fa-user-circle" />
            <Link to="/logout" className="fa fa-sign-out" />
        </div>
      </header>
      <div className="searchbox">
        <input
          type="text"
          id="searchtext"
          placeholder="Search by study group name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="button" id="search" className="fa fa-search" onClick={handleSearch}></button>
      </div>
      <div id="searchMsg">
        {error && <p>Error: {error}</p>}
        {searchResult && <p>Result: {searchResult}</p>}
      </div>
    </div>
  );
};

export default SearchPage;
