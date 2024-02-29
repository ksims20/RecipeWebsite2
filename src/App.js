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
import Favorites from './Favs.jsx';
import Vegan from './vegan.jsx';
import './css/index2.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtbyENrTnzUS3BC2yqads9GRWT3fIyLiA",
  authDomain: "capstone2-f5acb.firebaseapp.com",
  databaseURL: "https://capstone2-f5acb-default-rtdb.firebaseio.com",
  projectId: "capstone2-f5acb",
  storageBucket: "capstone2-f5acb.appspot.com",
  messagingSenderId: "578810233758",
  appId: "1:578810233758:web:a3a5e23d4345da5e0b8c8f",
  measurementId: "G-Z8V6JJ3ZWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


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
        <Route path="/vegan.jsx" element={<Vegan />} />
        <Route path="/RecipeLayout.jsx" element={<CommonLayout />} />
        <Route path="/Favs.jsx" element={<Favorites />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
