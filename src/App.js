import React, { useState } from 'react';

import './App.scss';

import Map from './Map';
import Info from './Info';
import ChartsMain from './ChartsMain';
import ChartsExtra from './ChartsExtra';
import Legend from './Legend';

const App = () => {
  const [countryInfo, setCountryInfo] = useState({});
  const [countriesData, setCountriesData] = useState([]);

  return (
    <div className="app">
      <div className="app__info">
        <Info {...countryInfo}></Info>
      </div>
      <div className="app__charts-main">
        <ChartsMain setPickedData={setCountryInfo} data={countriesData}></ChartsMain>
      </div>
      <div className="app__content">
        <Map setPickedData={setCountryInfo} setAllData={setCountriesData}></Map>
      </div>
      <div className="app__legend">
        <Legend></Legend>
      </div>
      <div className="app__charts-extra">
        <ChartsExtra setPickedData={setCountryInfo} data={countriesData}></ChartsExtra>
      </div>
    </div>
  );
}

export default App;
