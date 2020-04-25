import React from 'react';

import './Map.scss';

import axios from 'axios';
import * as d3 from 'd3';


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coronaData: {}
    }
  }

  getCoronaData(country) {
    return axios.get("https://coronavirus-19-api.herokuapp.com/countries/" + country);
  }

  componentDidMount() {
    const _manageColors = (amount) => {
      const ranges = [
        {min: 0, max: 1000, color: '#fff1d9'},
        {min: 1001, max: 10000, color: '#fdcd8b'},
        {min: 10001, max: 50000, color: '#b55440'},
        {min: 50001, max: 100000, color: '#b53828'},
        {min: 100001, max: 220001, color: '#500000'},
      ]

      for(var range of ranges) {
        if (amount > range.min && amount < range.max) return range.color;
      }
      return 'black';
    }

    const tooltip = d3.select('.map').append('div')
      .attr('class', 'tooltip')
      .style('display', 'none')
      .style('background', 'black')
      .style('color', 'white')
      .style('position', 'absolute')
      .style('z-index', '10000')
      .style('padding', '0 10px');

    var w = 800;
    var h = 600;
    var projection = d3.geoMercator()
               .center([ 13, 52 ])
               .translate([ w/2, h/2 ])
               .scale([ w/1.5 ]);

    var path = d3.geoPath()
            .projection(projection);


    var svg = d3.select(".map")
          .append("svg")
          .attr("width", w)
          .attr("height", h);

    d3.json("eu.geojson").then(json => {
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "rgba(8, 81, 50, 0.5)")
        .attr("stroke", "rgba(8, 81, 156, 0.2)")
        .on('mouseover', d => {
          const country  = d.properties.name;
          if (!this.state.coronaData[country]) {
            this.getCoronaData(country).then(({data}) => {
              if (data !== 'Country not found') {
                var coronaData = {
                  ...this.state.coronaData,
                  [country]: data
                }
                this.setState({
                  ...this.state,
                  coronaData: coronaData
                })
                tooltip.text('Country: ' + country + ' Cases: ' + data.cases)
              }
            });
          } else {
            var countryData = this.state.coronaData[country];
            tooltip.text('Country: ' + country + ' Cases: ' + countryData.cases)
          }

          tooltip
            .style('display', 'block')
            .style('left', (d3.event.pageX - 40) + 'px')
            .style('top', (d3.event.pageY - 40) + 'px')
            .style('cursor', 'none');
        })
        .on('mouseout', d => {
          tooltip
          .style('display', 'none');
        })


    });
  }

  getBackgroundcolor(color) {
    return {backgroundColor: color}
  }

  render() {
    return (
      <div className="map">
        <h1>Zakażenia i zgony spowodowane COVID-19 w Europie</h1>
        <h1>Zródło: WHO</h1>
        <h3>Legenda (ilość zakażeń)</h3>
        <div className="map__legend-element" style={this.getBackgroundcolor('#fff1d9')}>0-1000 osób</div>
        <div className="map__legend-element" style={this.getBackgroundcolor('#fdcd8b')}>1001-10000 osób</div>
        <div className="map__legend-element" style={this.getBackgroundcolor('#b55440')}>10001-50000 osób</div>
        <div className="map__legend-element" style={this.getBackgroundcolor('#b53828')}>50001-100000 osób</div>
        <div className="map__legend-element" style={this.getBackgroundcolor('#500000')}>100001-220001 osób</div>
      </div>
    )
  }
}

export default Map;