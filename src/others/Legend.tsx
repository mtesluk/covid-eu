import React from 'react';

import './Legend.scss';


function getBackgroundcolor(color: string): {backgroundColor: string} {
  return {backgroundColor: color};
}

interface Props {

}

const Legend = (props: Props) => {
  return (
    <div className="legend">
      <h3>Legend</h3>
      <div className="legend__element" style={getBackgroundcolor("#fff1d9")}>Less</div>
      <div className="legend__element" style={getBackgroundcolor("#fdcd8b")}></div>
      <div className="legend__element" style={getBackgroundcolor("#b55440")}></div>
      <div className="legend__element" style={getBackgroundcolor("#b53828")}></div>
      <div className="legend__element" style={{...getBackgroundcolor("#500000"), color: "white"}}>Most</div>
    </div>
  )
}

export default Legend;