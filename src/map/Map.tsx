import React, { RefObject } from 'react';

import './Map.scss';
import { LinearProgress } from '@material-ui/core';

import axios from 'axios';
import * as d3 from 'd3';
import { rangesConfigCases } from '../shared/config';
import { manageColors } from 'charts';
import { FeatureCollection } from 'geojson';
import { Info } from '../shared/interfaces';


interface State {
  loading: boolean;
  coronaData: {};
  width: number;
  endpoints: {[name: string]: string};
}

interface Props {
  setPickedData: (data: Info) => any;
  setAllData: (data: Info[]) => any;
}

class Map extends React.Component<Props, State> {
  ref: RefObject<HTMLDivElement> = React.createRef();

  constructor(props) {
    super(props);
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
    const computedStyle = getComputedStyle(this.ref.current as Element);
    var width = this.ref.current?.clientWidth || 0;
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

    const height = 4/5 * width;
    const projection = d3.geoMercator()
               .translate([ width/4, height*1.6 ])
               .scale(width/1.1);

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
      const mapData: FeatureCollection = dataArray[0];
      let countriesData = this._filterCountries(dataArray[1].data, mapData.features.map(feature => feature.properties));
      this.props.setAllData(countriesData);
      countriesData = this._reduceCountries(countriesData);

      svg.selectAll('path')
        .data(mapData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', d => {
          const countryName  = d.properties?.name;
          var color = manageColors(countriesData[countryName]?.cases, rangesConfigCases)
          return color;
        })
        .attr('stroke', d => 'red')
        .on('mouseover', d => {
          const countryName  = d.properties?.name;
          this.props.setPickedData({
            country: countryName,
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