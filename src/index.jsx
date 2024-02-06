import React from 'react';
import { homeOutline, personOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './css/index2.css';

const WelcomePage = () => {
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

        <div className="Icons">
          <h2 className="Choose1">Welcome to Cookly!</h2>

          <p className="Choose">
            Select your time of day and unlock a world of flavorful recipes perfect for every moment, whether it's
            breakfast, lunch, dinner, or dessert.
          </p>
          <br />
          <div className="color">
            <a className="Photos" href="/breakfast.jsx">
              <img
                className="One"
                src="https://cdn.thelondoneconomic.com/wp-content/uploads/2021/08/d6209be9-how-to-make-the-perfect-full-english-breakfast-fry-up-scaled.jpeg"
                width="300px"
                height="400px"
                alt="Breakfast"
              />
            </a>

            <a className="Photos" href="/lunch.jsx">
              <img
                className="Two"
                src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?cs=srgb&dl=pexels-robin-stickel-70497.jpg&fm=jpg"
                width="300px"
                height="400px"
                alt="Lunch"
              />
            </a>

            <a className="Photos" href="/dinner.jsx">
              <img
                className="Three"
                src="https://media.istockphoto.com/id/450705255/photo/homemade-turkey-thanksgiving-dinner.jpg?s=612x612&w=0&k=20&c=Bul88e51JYCw6o2JaLyvPKCZpg2R-qd2621978t7HRI="
                width="300px"
                height="400px"
                alt="Dinner"
              />
            </a>

            <a className="Photos" href="/dessert.jsx">
              <img
                className="Four"
                src="https://tmbidigitalassetsazure.blob.core.windows.net/wpthumbnailsprod/EasyFourLayerChocolateDessert%20DIYD%20187568%20042621%20H_thumbnail.jpeg"
                width="300px"
                height="400px"
                alt="Dessert"
              />
            </a>
          </div>
        </div>

        <div className="Descriptions">
          <li className="Desc">
            <label className="Space1">Breakfast</label>
            <label className="Space2">Lunch</label>
            <label className="Space3">Dinner</label>
            <label className="Space4">Dessert</label>
          </li>
        </div>

    </>
  );
};

export default WelcomePage;
