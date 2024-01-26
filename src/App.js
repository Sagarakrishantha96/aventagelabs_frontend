import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPage from './pages/Navbar/NavbarPage';
import FoodOrder from './pages/FoodOrder/FoodOrder';
import Reports from './pages/Reports/Reports';

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarPage />
        <Routes>
          <Route path="/" element={<FoodOrder />} />
          <Route path="/Reports" element={<Reports />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
