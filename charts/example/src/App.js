import React from 'react'

import { BarChart } from 'charts';
import 'charts/dist/index.css';

const ranges = [
  {min: 0, max: 1000, color: '#fff1d9'},
  {min: 1001, max: 10000, color: '#fdcd8b'},
  {min: 10001, max: 50000, color: '#b55440'},
  {min: 50001, max: 100000, color: '#b53828'},
  {min: 100001, max: 420001, color: '#500000'},
]

const App = () => {
  return (
    <div>
      <BarChart
        classSvgName="heh"
        setPickedData={(a) => console.log(a)} width={300}
        data={[{country: 'heh', cases: 12}]}
        ranges={ranges}></BarChart>
    </div>
  )
}

export default App
