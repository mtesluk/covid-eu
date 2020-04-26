import React, { useState } from 'react';

import './App.scss';

import Map from './Map'
import Info from './Info'
import Charts from './Charts'
import Legend from './Legend'

const App = () => {
  const [data, setData] = useState({});

  return (
    <div className="app">
      <div className="app__info">
        <Info {...data}></Info>
      </div>
      <div className="app__charts">
        <Charts></Charts>
      </div>
      <div className="app__content">
        <Map setPickedData={setData}></Map>
      </div>
      <div className="app__legend">
        <Legend></Legend>
      </div>
    </div>
  );
}

export default App;
