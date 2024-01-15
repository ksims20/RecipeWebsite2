import React, { useState } from 'react';
import { homeOutline, personOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './css/register.css';

const Register = () => {

  //Defining a state for the form
  const[form, setForm] = useState({
    password_two: {
      pattern: '',
    },
  });

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
                <form className="box" action="">
                  <h1>Register</h1>
                  <div className="input-box">
                    <h3>First Name</h3>
                    <input type="text" placeholder="First Name" required />
                  </div>
                  <div className="input-box">
                    <h3>Last Name</h3>
                    <input type="text" placeholder="Last Name" required />
                  </div>
                  <div className="input-box">
                    <h3>Email</h3>
                    <input type="text" placeholder="Email" required />
                  </div>
                  <div className="input-box">
                    <h3>Password</h3>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      pattern="^\S{6,}$"
                      onChange={(e) => {
                        e.target.setCustomValidity(
                          e.target.validity.patternMismatch ? 'Must have at least 6 characters' : ''
                        );
                        if (e.target.checkValidity()) form.password_two.pattern = e.target.value;

                        // updates the form state
                        setForm((prevForm => ({
                          ...prevForm,
                          password_two: { pattern: e.target.value },
                        })));
                      }}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <h3>Confirm Password</h3>
                    <input
                      type="password"
                      id="password_two"
                      pattern="^\S{6,}$"
                      onChange={(e) => {
                        e.target.setCustomValidity(
                          e.target.validity.patternMismatch ? 'Please enter the same Password as above' : ''
                        );
                      }}
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn">
                    Register
                  </button>
                  <div className="login-link">
                    <a href="/login.jsx">Login</a>
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
