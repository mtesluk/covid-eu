import React from 'react'

import { BarChart, RangeConfig } from 'charts';
import 'charts/dist/index.css';

const rangesConf = {
  ranges: [
    {min: 0, max: 1000, color: '#f00'},
    {min: 1001, max: 10000, color: '#0f0'},
    {min: 10001, max: 50000, color: '#b55440'},
    {min: 50001, max: 100000, color: '#b53828'},
    {min: 100001, max: 420001, color: '#500000'},
  ],
  default: '#000',
};

const App = () => {
  return (
    <div>
      <BarChart
        classSvgName="heh"
        setPickedData={(a) => console.log(a)} width={300}
        data={[{country: 'heh', cases: 12}]}
        rangeColor={rangesConf}></BarChart>
    </div>
  )
}

export default App
