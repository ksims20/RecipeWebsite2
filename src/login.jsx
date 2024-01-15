import React from 'react';
import { homeOutline, personOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './css/login.css'; 

const Login = () => {
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
                  <h1>Login</h1>
                  <div className="input-box">
                    <input type="text" placeholder="Email" required />
                    <IonIcon name="person"></IonIcon>
                  </div>
                  <div className="input-box">
                    <input type="password" placeholder="Password" required />
                    <IonIcon name="lock-closed"></IonIcon>
                  </div>
                  <button type="submit" className="btn">
                    Login
                  </button>
                  <div className="register-link">
                    <p>
                      Don't have an account? <a href="/register.jsx">Register</a>
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

export default Login;
