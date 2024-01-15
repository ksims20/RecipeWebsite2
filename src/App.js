import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './index.jsx';
import Login from './login.jsx';
import AboutUs from './About.jsx';
import Register from './register.jsx';
import Breakfast from './breakfast.jsx';
import Lunch from './lunch.jsx';
import Dinner from './dinner.jsx';
import Dessert from './dessert.jsx';
import CommonLayout from './RecipeLayout.jsx';
import './css/index2.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login.jsx" element={<Login />} />
        <Route path="/about.jsx" element={<AboutUs />} />
        <Route path="/register.jsx" element={<Register />} />
        <Route path="/breakfast.jsx" element={<Breakfast />} />
        <Route path="/lunch.jsx" element={<Lunch />} />
        <Route path="/dinner.jsx" element={<Dinner />} />
        <Route path="/dessert.jsx" element={<Dessert />} />
        <Route path="/RecipeLayout.jsx" element={<CommonLayout />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
