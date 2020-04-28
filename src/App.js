import React, { useState } from 'react';

import './App.scss';

import Map from './Map'
import Info from './Info'
import Charts from './Charts'
import Legend from './Legend'

const App = () => {
  const [countryInfo, setCountryInfo] = useState({});
  const [countriesData, setCountriesData] = useState([]);

  return (
    <div className="app">
      <div className="app__info">
        <Info {...countryInfo}></Info>
      </div>
      <div className="app__charts">
        <Charts setPickedData={setCountryInfo} data={countriesData}></Charts>
      </div>
      <div className="app__content">
        <Map setPickedData={setCountryInfo} setAllData={setCountriesData}></Map>
      </div>
      <div className="app__legend">
        <Legend></Legend>
      </div>
    </div>
  );
}

export default App;
