import React from 'react'
import {createRoot} from "react-dom"
import Header from './components/header/Header'
import './style.css';
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

const container = document.getElementById("root")
const root = createRoot(container);
root.render(<App />)