import React from 'react';
import { createRoot } from 'react-dom';
import './style.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Generate from './pages/Generate';
import ProtectedRoute from './utils/ProtectedRoute';
import UploadResume from './pages/UploadResume';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/generateLetter" element={<ProtectedRoute />}>
            <Route index element={<Generate />} />
          </Route>
          <Route path="/upload" element={<ProtectedRoute />}>
            <Route index element={<UploadResume />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
