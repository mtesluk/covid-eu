import React from 'react';

import './Map.scss';
import { LinearProgress } from '@material-ui/core';

import axios from 'axios';
import * as d3 from 'd3';
import { ranges } from './config';
import { manageColors } from 'charts';


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
      let countriesData = this._filterCountries(dataArray[1].data, mapData.features.map(feature => feature.properties));
      this.props.setAllData(countriesData);
      countriesData = this._reduceCountries(countriesData);

      svg.selectAll('path')
        .data(mapData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', d => {
          const countryName  = d.properties.name;
          var color = manageColors(countriesData[countryName]?.cases, ranges)
          return color
        })
        .attr('stroke', d => 'red')
        .on('mouseover', d => {
          const countryName  = d.properties.name;
          this.props.setPickedData({
            countryName,
            cases: countriesData[countryName]?.cases,
            deaths: countriesData[countryName]?.deaths,
            recovered: countriesData[countryName]?.recovered,
            critical: countriesData[countryName]?.critical,
            casesPerOneMillion: countriesData[countryName]?.casesPerOneMillion,
            deathsPerOneMillion: countriesData[countryName]?.deathsPerOneMillion,
            testsPerOneMillion: countriesData[countryName]?.testsPerOneMillion,
          });
        });

        this.setState({
          ...this.state,
          loading: false
        });

        this.setState({
          ...this.state,
          coronaData: countriesData
        });
    });
  }

  _filterCountries(countries, properties) {
    const sovereignts = properties.map(property => property.sovereignt);
    countries = countries.filter(country => sovereignts.includes(country.country));
    return countries;
  }

  _reduceCountries(countries) {
    return countries.reduce((sum, val) => ({...sum, [val.country]: val}), {});
  }

  render() {
    return (
      <div className="map" ref={this.ref}>
        {this.state.loading && <LinearProgress className="map__progress" color="secondary" />}
        <svg className="map__svg"></svg>
      </div>
    )
  }
}

export default Map;