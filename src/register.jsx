import React from 'react';
import { homeOutline, personOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './css/register.css';

import { Link} from 'react-router-dom'



import 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';



import { initializeApp } from "firebase/app";

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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);


const Register = () => {


  //Handles the registration, code for the button click
  const handleRegistration = async (e) => {
    e.preventDefault() // to stop the default form submission behavior

    console.log('Form Elements:', e.target);

    //Notes: Destructures, javascript feature, extracts values from arrays, and assign them to variables.
    const {first_name, last_name, email, password, password_two } = e.target.elements;

    //Extract values from the form element, ("?" - handles potential 'null' or 'undefined' values)
    const firstName = first_name?.value;
    const lastName = last_name?.value;
    const userEmail = email?.value;
    const userPassword = password?.value;

    //Checks to see if the email or password is missing
    if (!userEmail || !userPassword) {
      console.error('Invalid form data');
      return;
    }

    try {
      //Registers the user with firebase authentication
      await createUserWithEmailAndPassword(auth,userEmail,userPassword);
      console.log('Registration Successful');

      // redirects them to login page after success
      window.location.href = '/login.jsx';
    } catch (error) {
      console.error('Registration Error', error.message);
    }
  }

  return (
    <>
        <div className="TopMenu">
          <a href="About.html" className="about">
            About
          </a>

          <h1 id="header">
            <b>Cookly</b>
          </h1>

          <li className="A">
            <a className="house" href="/">
            <IonIcon icon={homeOutline}></IonIcon>
            </a>
          </li>
          <li className="B">
            <a className="Person" href="login.jsx">
            <IonIcon icon={personOutline}></IonIcon>
            </a>
          </li>
          
        </div>

        <main>
          <div className="divider">
            <div className="left-side">
              <div id="stars"></div>
              <div id="stars2"></div>
              <div id="stars3"></div>
            </div>
            <div className="right-side">
              <div className="wrapper">
                <form className="box" action="" onSubmit={handleRegistration}>
                  <h1>Register</h1>
                  <div className="input-box">
                    <h3>First Name</h3>
                    <input type="text" name="first_name" placeholder="First Name" required />
                  </div>
                  <div className="input-box">
                    <h3>Last Name</h3>
                    <input type="text" name="last_name" placeholder="Last Name" required />
                  </div>
                  <div className="input-box">
                    <h3>Email</h3>
                    <input type="text" name="email" placeholder="Email" required />
                  </div>
                  <div className="input-box">
                    <h3>Password</h3>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <h3>Confirm Password</h3>
                    <input
                      type="password"
                      id="password_two"
                      name="password_two"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn">
                    Register
                  </button>
                  <div className="login-link">
                    <p>
                    Already have an account? <Link to="/login.jsx">Login</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
    </>
  );
};

export default Register;
