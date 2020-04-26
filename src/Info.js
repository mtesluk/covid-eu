import React from 'react';

import './Info.scss';

const Info = (props) => {
  return (
    <div className="info">
      <p>Name: {props.countryName || 'none'}</p>
      <p>Cases: {props.cases || '0'}</p>
      <p className="info__footer">Source: https://coronavirus-19-api.herokuapp.com/countries</p>
    </div>
  )
}

export default Info;