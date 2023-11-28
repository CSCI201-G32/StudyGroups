import React from 'react';
import { Routes, Route} from "react-router-dom";
import CreateStudyGroupPage from './features/StudyGroupManagement/views/CreateStudyGroupPage';
import FullStudyPage from './features/StudyGroupManagement/views/FullStudyPage';
import AllStudyGroups from './features/StudyGroupManagement/views/AllStudyGroups';
import NavigationBar from './NavigationBar';
import HomePage from './LoginRegisterFrontend/HomePage';
import RegisterPage from './LoginRegisterFrontend/RegisterPage';
import LoginPage from './LoginRegisterFrontend/LoginPage';
import GuestPage from './LoginRegisterFrontend/GuestPage';

function App() {
  return (
    <Router>
      <NavigationBar /> {/* NavigationBar is always displayed */}
      <Routes>
        <Route path="/" element={<CreateStudyGroupPage />} />
        <Route path="/home" element={<AllStudyGroups />} />
        <Route path="/create" element={<CreateStudyGroupPage />} />
        <Route path="/:groupName/view" element={<FullStudyPage />} />
        <Route path="/reg" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/guest" element={<GuestPage />} />
      </Routes>
    </Router>
  );
  }