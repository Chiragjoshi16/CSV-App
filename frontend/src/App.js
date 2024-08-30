import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CsvUpload from './components/CsvUpload';
import Signup from './components/Signup';
import Login from './components/Login';
import { useSelector } from 'react-redux';

import './styles/App.css';

function App() {
  const isAuthenticated = useSelector((state) => !!state.auth.user);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>CSV Parser App</h1>
          <Routes>
            <Route path="/csvupload" element={<CsvUpload />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
