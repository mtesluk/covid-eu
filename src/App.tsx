import React, { useState } from 'react';

import './App.scss';

import Map from './map/Map';
import Info from './others/Info';
import ChartsMain from './charts/ChartsMain';
import ChartsExtra from './charts/ChartsExtra';
import { Info as IInfo } from './shared/interfaces';

const App = () => {
  const [countryInfo, setCountryInfo] = useState<IInfo>({
    country: 'Poland',
    cases: 0,
    deaths: 0,
    recovered: 0,
    critical: 0,
    casesPerOneMillion: 0,
    deathsPerOneMillion: 0,
    testsPerOneMillion: 0,
  });
  const [countriesData, setCountriesData] = useState<IInfo[]>([]);

  return (
    <div className="app">
      <div className="app__info">
        <Info data={countryInfo}></Info>
      </div>
      <div className="app__charts-main">
        <ChartsMain setPickedData={(data: IInfo) => setCountryInfo(data)} data={countriesData}></ChartsMain>
      </div>
      <div className="app__content">
        <Map setPickedData={(data: IInfo) => setCountryInfo(data)} setAllData={(data: IInfo[]) => setCountriesData(data)}></Map>
      </div>
      <div className="app__charts-extra">
        <ChartsExtra setPickedData={(data: IInfo) => setCountryInfo(data)} data={countriesData}></ChartsExtra>
      </div>
    </div>
  );
}

export default App;
