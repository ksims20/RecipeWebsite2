import React from 'react';
import { IonIcon } from '@ionic/react';
import { homeOutline, personOutline, eggOutline, pizzaOutline, fastFoodOutline, beerOutline } from 'ionicons/icons';
import './css/pick.css'; 

const CommonLayout = ({ title, activeTab, children }) => (
  <>
    <div className="TopMenu">
      <a href="/about.jsx" className="about">About</a>
      <h1 id="header"> <b>{title}</b> </h1>
        <li className={activeTab === 'home' ? 'A selected' : 'A'}>
          <a className="house" href="/"> <IonIcon icon={homeOutline}></IonIcon> </a>
        </li>
        <li className={activeTab === 'person' ? 'B selected' : 'B'}>
          <a className="Person" href="/login.jsx"> <IonIcon icon={personOutline}></IonIcon> </a>
        </li>
    </div>
    <div className="sidebar">
      <ul>
        <li><a href="/breakfast.jsx">Breakfast<IonIcon icon={eggOutline}></IonIcon></a></li>
        <li><a href="/lunch.jsx">Lunch<IonIcon icon={pizzaOutline}></IonIcon></a></li>
        <li><a href="/dinner.jsx">Dinner<IonIcon icon={fastFoodOutline}></IonIcon></a></li>
        {/* Testing active links */}
        <li><a className={activeTab === 'dessert' ? 'selected' : ''} href="/dessert.jsx">Dessert<IonIcon icon={beerOutline}></IonIcon></a></li>
      </ul>
    </div>
    {children}
  </>
);

export default CommonLayout;
