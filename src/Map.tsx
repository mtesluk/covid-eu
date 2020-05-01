import React, { RefObject } from 'react';

import './Map.scss';
import { LinearProgress } from '@material-ui/core';

import axios from 'axios';
import * as d3 from 'd3';
import { rangesConfig } from './config';
import { manageColors } from 'charts';
import { FeatureCollection } from 'geojson';
import { Info } from './interfaces';


interface State {
  loading: boolean;
  coronaData: {};
  width: number;
  endpoints: {[name: string]: string};
}

interface MapFeature {
  type: string;
  properties: {
    scalerank: number;
    featurecla: string;
    labelrank: number;
    sovereignt: string;
    sov_a3: string;
    adm0_dif: number;
    level: number;
    type: string;
    admin: string;
    adm0_a3: string;
    geou_dif: number;
    geounit: string;
    gu_a3: string;
    su_dif: number;
    subunit: string;
    su_a3: string;
    brk_diff: number;
    name: string;
    name_long: string;
    brk_a3: string;
    brk_name: string;
    brk_group: null;
    abbrev: string;
    postal: string;
    formal_en: string;
    formal_fr: null;
    note_adm0: null;
    note_brk: null;
    name_sort: string;
    name_alt: null;
    mapcolor7: number;
    mapcolor8: number;
    mapcolor9: number;
    mapcolor13: number;
    pop_est: number;
    gdp_md_est: number;
    pop_year: number;
    lastcensus: number;
    gdp_year: number;
    economy: string;
    income_grp: string;
    wikipedia: number;
    fips_10: null;
    iso_a2: string;
    iso_a3: string;
    iso_n3: string;
    un_a3: string;
    wb_a2: string;
    wb_a3: string;
    woe_id: number;
    adm0_a3_is: string;
    adm0_a3_us: string;
    adm0_a3_un: number;
    adm0_a3_wb: number;
    continent: string;
    region_un: string;
    subregion: string;
    region_wb: string;
    name_len: number;
    long_len: number;
    abbrev_len: number;
    tiny: number;
    homepart: number;
    filename: string;
  };
  geometry: {
    type: string;
    coordinates: [[[]]]
  };
}

interface MapData {
  type: string;
  name: string;
  crs: {type: string, properties: { name: string}};
  features: MapFeature[];
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
          var color = manageColors(countriesData[countryName]?.cases, rangesConfig)
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