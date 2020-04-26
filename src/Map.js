import React from 'react';

import './Map.scss';
import { LinearProgress } from '@material-ui/core';

import axios from 'axios';
import * as d3 from 'd3';


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      loading: true,
      coronaData: {},
      width: 0,
      endpoints: {
        countries: "https://coronavirus-19-api.herokuapp.com/countries",
        map: "./eu.json"
      }
    };
  }

  componentDidMount() {
    if (!getComputedStyle) { alert('Not supported'); }
    const computedStyle = getComputedStyle(this.ref.current);
    var width = this.ref.current.clientWidth;
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

    const tooltip = d3.select('.map__tooltip');
    const height = 4/5 * width;
    const projection = d3.geoMercator()
               .translate([ width/4, height*1.6 ])
               .scale([ width/1.1 ]);

    const path = d3.geoPath()
            .projection(projection);


    const svg = d3.select('.map__svg')
          .attr('width', width)
          .attr('height', height);

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
        .on('touchstart', d => {
          // const countryName  = d.properties.name;
        })
        .on('mouseover', d => {
          const countryName  = d.properties.name;
          this.props.setPickedData({
            countryName,
            cases: countriesData[countryName]?.cases
          });
          // this._setTooltip(tooltip, {
          //   pageX: d3.event.pageX,
          //   pageY: d3.event.pageY,
          //   countryName: countryName,
          //   cases: countriesData[countryName]?.cases
          // })
        })
        .on('mouseout', d => {
          // this._setTooltip(tooltip);
        });

        this.setState({
          ...this.state,
          loading: false
        })

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

  render() {
    return (
      <div className="map" ref={this.ref}>
        {this.state.loading && <LinearProgress className="map__progress" color="secondary" />}
        <svg className="map__svg"></svg>
        <div className="map__tooltip"></div>
      </div>
    )
  }
}

export default Map;