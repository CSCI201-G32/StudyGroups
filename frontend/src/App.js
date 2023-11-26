import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import CreateStudyGroupPage from './features/StudyGroupManagement/views/CreateStudyGroupPage';
import FullStudyPage from './features/StudyGroupManagement/views/FullStudyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateStudyGroupPage />} />
        <Route path="/create" element={<CreateStudyGroupPage />} />
        <Route path="/:groupName/view" element={<FullStudyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
