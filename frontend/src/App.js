import React from 'react';
import { Routes, Route} from "react-router-dom";
import CreateStudyGroupPage from './features/StudyGroupManagement/views/CreateStudyGroupPage';
import FullStudyPage from './features/StudyGroupManagement/views/FullStudyPage';
import AllStudyGroups from './features/StudyGroupManagement/views/AllStudyGroups';
<<<<<<< HEAD
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
=======
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
>>>>>>> 57b17436aa630460698d533f91fbfdf42f154368
}

export default App;
