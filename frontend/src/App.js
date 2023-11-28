import React from 'react';
import { Routes, Route } from "react-router-dom";
import CreateStudyGroupPage from './features/StudyGroupManagement/views/CreateStudyGroupPage';
import FullStudyPage from './features/StudyGroupManagement/views/FullStudyPage';
import AllStudyGroups from './features/StudyGroupManagement/views/AllStudyGroups';
import HomePage from './features/LoginRegistration/views/HomePage';
import RegisterPage from './features/LoginRegistration/views/RegisterPage'; 
import LoginPage from './features/LoginRegistration/views/LoginPage'; 
import GuestPage from './features/LoginRegistration/views/GuestPage'; 
import AccountPage from './features/ProfileManagement/Account';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/home" element={<AllStudyGroups />} />
        <Route path="/create" element={<CreateStudyGroupPage />} />
        <Route path="/:groupName/view" element={<FullStudyPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/guest" element={<GuestPage/>} />
        <Route path="/account" element={<AccountPage />} />
        {/* <Route path="/chat" element={<chat />} /> */}
      </Routes>
  );
}

export default App;