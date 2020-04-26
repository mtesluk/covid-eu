import React from 'react';

import './Map.scss';

import axios from 'axios';
import * as d3 from 'd3';


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coronaData: {},
      endpoints: {
        countries: "https://coronavirus-19-api.herokuapp.com/countries",
        map: "./eu.json"
      }
    };
  }

  componentDidMount() {
    const tooltip = d3.select('.map__tooltip');
    const w = 800;
    const h = 600;
    const projection = d3.geoMercator()
               .center([ 13, 52 ])
               .translate([ w/2, h/2 ])
               .scale([ w/1.5 ]);

    const path = d3.geoPath()
            .projection(projection);


    const svg = d3.select('.map')
          .append('svg')
          .attr('width', w)
          .attr('height', h);

    const promiseMap = d3.json(this.state.endpoints.map, {
      headers: { Accept: "application/json; odata=verbose"}
    });
    const promiseData = axios.get(this.state.endpoints.countries);
    Promise.all([promiseMap, promiseData]).then(dataArray => {
      const mapData = dataArray[0];
      var countriesData = this._getCountries(dataArray[1].data, mapData.features.map(feature => feature.properties));

      svg.selectAll('path')
        .data(mapData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', d => {
          const countryName  = d.properties.name;
          var color = this._manageColors(countriesData[countryName]?.cases)
          return color
        })
        .attr('stroke', d => 'red')
        .on('mouseover', d => {
          const countryName  = d.properties.name;
          this._setTooltip(tooltip, {
            pageX: d3.event.pageX,
            pageY: d3.event.pageY,
            countryName: countryName,
            cases: countriesData[countryName]?.cases
          })
        })
        .on('mouseout', d => {
          this._setTooltip(tooltip);
        });

        this.setState({
          ...this.state,
          coronaData: countriesData
        });
    });
  }

  _manageColors(amount) {
    if (!amount) return '#ff0909';
    const ranges = [
      {min: 0, max: 1000, color: '#fff1d9'},
      {min: 1001, max: 10000, color: '#fdcd8b'},
      {min: 10001, max: 50000, color: '#b55440'},
      {min: 50001, max: 100000, color: '#b53828'},
      {min: 100001, max: 320001, color: '#500000'},
    ]

    for(var range of ranges) {
      if (amount > range.min && amount < range.max) return range.color;
    }
    return '#000';
  }

  _setTooltip(tooltip, data = null) {
    if (data) {
      data = {
        display: 'block',
        pageX: 0,
        pageY: 0,
        countryName: 'none',
        cases: 0,
        ...data
      };
      tooltip
        .style('display', data.display)
        .style('left', (data.pageX - 40) + 'px')
        .style('top', (data.pageY - 40) + 'px')
        .style('cursor', 'none')
        .text('Country: ' + data.countryName + ' Cases: ' + data.cases || 'none');
    } else {
      tooltip.style('display', 'none');
    }
  }

  _getCountries(countries, properties) {
    const sovereignts = properties.map(property => property.sovereignt);
    countries = countries.filter(country => sovereignts.includes(country.country));
    countries = countries.reduce((sum, val) => ({...sum, [val.country]: val}), {});
    return countries;
  }

  _getBackgroundcolor(color) {
    return {backgroundColor: color};
  }

  render() {
    return (
      <div className="map">
        <h1>Zakażenia i zgony spowodowane COVID-19 w Europie</h1>
        <h1>Zródło: https://coronavirus-19-api.herokuapp.com/countries</h1>
        <h3>Legenda (ilość zakażeń)</h3>
        <div className="map__legend-element" style={this._getBackgroundcolor("#fff1d9")}>0-1000 osób</div>
        <div className="map__legend-element" style={this._getBackgroundcolor("#fdcd8b")}>1001-10000 osób</div>
        <div className="map__legend-element" style={this._getBackgroundcolor("#b55440")}>10001-50000 osób</div>
        <div className="map__legend-element" style={this._getBackgroundcolor("#b53828")}>50001-100000 osób</div>
        <div className="map__legend-element" style={{...this._getBackgroundcolor("#500000"), color: "white"}}>100001-220001 osób</div>
        <div className="map__tooltip"></div>
      </div>
    )
  }
}

export default Map;