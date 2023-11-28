import React from 'react';
import { Routes, Route} from "react-router-dom";
import CreateStudyGroupPage from './features/StudyGroupManagement/views/CreateStudyGroupPage';
import FullStudyPage from './features/StudyGroupManagement/views/FullStudyPage';
import AllStudyGroups from './features/StudyGroupManagement/views/AllStudyGroups';
import HomePage from './features/LoginRegistration/views/HomePage';
import RegisterPage from './features/LoginRegistration/views/RegisterPage'; // Your Register component
import LoginPage from './features/LoginRegistration/views/LoginPage'; // Your Login component
import GuestPage from './features/LoginRegistration/views/GuestPage'; // Your Guest component

function App() {
    return (
            <Routes>
                <Route path="/home" element={< AllStudyGroups />}/>
                <Route path="/create" element={< CreateStudyGroupPage />}/>
                <Route path="/:groupName/view" element={< FullStudyPage />}/>
                <Route path="/register" element={< RegisterPage />}/>
                <Route path="/login" element={< LoginPage />}/>
                <Route path="/guest" element={< GuestPage />}/>
                <Route path="/" element={< HomePage />}/>
            </Routes>
    );
}

export default App;
