import React, { RefObject } from 'react';

import './Map.scss';
import { LinearProgress } from '@material-ui/core';

import * as d3 from 'd3';
import { rangesConfigCases } from '../shared/config';
import { manageColors } from 'charts';
import { FeatureCollection, GeoJsonProperties } from 'geojson';
import { Info } from '../shared/interfaces';
import { getWidth } from '../shared/utils';
import { GeoProjection, GeoPath } from 'd3';


interface State {
  loading: boolean;
  width: number;
  endpoints: {[name: string]: string};
}

interface Props {
  setPickedData: (data: Info) => any;
  setAllData: (data: Info[]) => any;
}

interface InfoObj {
  [countryName: string]: Info;
}

class Map extends React.Component<Props, State> {
  ref: RefObject<HTMLDivElement> = React.createRef();
  state = {
    loading: true,
    width: 0,
    endpoints: {
      // countries: "https://coronavirus-19-api.herokuapp.com/countries",
      countries: "./mock-data.json",
      map: "./eu.json"
    }
  };

  componentDidMount() {
    const width: number = getWidth(this.ref.current);
    const height: number = 4/5 * width;
    const projection: GeoProjection = d3.geoMercator()
               .translate([ width/4, height*1.6 ])
               .scale(width/1.1);

    const path: GeoPath = d3.geoPath()
            .projection(projection);

    const svg = d3.select('.map__svg')
          .attr('width', width)
          .attr('height', height);

    const promiseMap: Promise<any> = d3.json(this.state.endpoints.map, {
      headers: { Accept: "application/json; odata=verbose"}
    });
    const promiseData: Promise<any> = d3.json(this.state.endpoints.countries, {
      headers: { Accept: "application/json; odata=verbose"}
    });

    Promise.all([promiseMap, promiseData]).then((dataArray: [FeatureCollection, {data: Info[]}]) => {
      const mapData: FeatureCollection = dataArray[0];
      const countriesData: Info[] = this._filterCountries(dataArray[1].data, mapData.features.map(feature => feature.properties));
      this.props.setAllData(countriesData);
      const countriesDataObj: InfoObj = this._reduceCountries(countriesData);

      svg.selectAll('path')
        .data(mapData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', d => {
          const countryName: string  = d.properties?.name;
          const color: string = manageColors(countriesDataObj[countryName]?.cases, rangesConfigCases)
          return color;
        })
        .attr('stroke', 'red')
        .on('mouseover', d => {
          const countryName: string  = d.properties?.name;
          this.props.setPickedData({
            country: countryName,
            cases: countriesDataObj[countryName]?.cases,
            deaths: countriesDataObj[countryName]?.deaths,
            recovered: countriesDataObj[countryName]?.recovered,
            critical: countriesDataObj[countryName]?.critical,
            casesPerOneMillion: countriesDataObj[countryName]?.casesPerOneMillion,
            deathsPerOneMillion: countriesDataObj[countryName]?.deathsPerOneMillion,
            testsPerOneMillion: countriesDataObj[countryName]?.testsPerOneMillion,
          });
        });

        this.setState({
          ...this.state,
          loading: false
        });
    });
  }

  _filterCountries(countries: Info[], properties: GeoJsonProperties): Info[] {
    const sovereignts: string[] = properties?.map(property => property?.sovereignt);
    countries = countries.filter(country => sovereignts.includes(country.country));
    return countries;
  }

  _reduceCountries(countries: Info[]): InfoObj {
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