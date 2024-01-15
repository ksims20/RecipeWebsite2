import React from 'react';
import { homeOutline, personOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './css/about.css'; 

const AboutUs = () => {
  return (
    <>
        <div className="TopMenu">
        <a href="/about.jsx" className="about">
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

        

          <div className="RightSide">
            <h1 className="text">About Us</h1>

            <p>
              Welcome to Cookly, where simplicity meets culinary delight. My minimalist-styled recipe platform is crafted to
              offer a seamless experience, focusing on ease of access and visual appeal. We understand the joy of cooking and
              sharing meals, which is why I designed this space for you to explore, discover, and savor delightful recipes
              tailored to your chosen time of day – whether it's breakfast, lunch, dinner, or dessert. Beyond that, my
              user-friendly interface allows you to create a personal account, saving your favorite recipes for future
              culinary adventures. Plus, sharing these delectable finds with friends is made effortless through shareable
              links. I strived to inspire you to return, offering a place where every visit brings new culinary inspiration
              and a sense of community around the joy of cooking and sharing good food
            </p>
          </div>

    </>
  );
};

export default AboutUs;
