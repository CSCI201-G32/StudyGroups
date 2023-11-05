import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import CreateStudyGroupPage from './features/StudyGroupManagement/views/CreateStudyGroupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateStudyGroupPage />} />
        <Route path="/create-study-group" element={<CreateStudyGroupPage />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
