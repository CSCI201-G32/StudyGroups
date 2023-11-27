import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import CreateStudyGroupPage from './features/StudyGroupManagement/views/CreateStudyGroupPage';
import FullStudyPage from './features/StudyGroupManagement/views/FullStudyPage';
import AllStudyGroups from './features/StudyGroupManagement/views/AllStudyGroups';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateStudyGroupPage />} />
        <Route path="/home" element={<AllStudyGroups />} />
        <Route path="/create" element={<CreateStudyGroupPage />} />
        <Route path="/:groupName/view" element={<FullStudyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
