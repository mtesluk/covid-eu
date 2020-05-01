import React from 'react';

import './Legend.scss';

function getBackgroundcolor(color: string) {
  return {backgroundColor: color};
}

const Legend = (props) => {
  return (
    <div className="legend">
      <h3>Legend</h3>
      <div className="legend__element" style={getBackgroundcolor("#fff1d9")}>0-1000</div>
      <div className="legend__element" style={getBackgroundcolor("#fdcd8b")}>1001-10000</div>
      <div className="legend__element" style={getBackgroundcolor("#b55440")}>10001-50000</div>
      <div className="legend__element" style={getBackgroundcolor("#b53828")}>50001-100000</div>
      <div className="legend__element" style={{...getBackgroundcolor("#500000"), color: "white"}}>100001-320001</div>
    </div>
  )
}

export default Legend;