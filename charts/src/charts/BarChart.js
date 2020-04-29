import React from 'react';

import './BarChart.scss';

import * as d3 from 'd3';
import { manageColors } from './utils';


class BarChart extends React.Component {

  componentDidMount() {
    const width = this.props.width;
    const height = 4/5 * width;
    const data = this.props.data;
    this._prepareChart(height, width, data, this.props.ranges);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      const width = this.props.width;
      const height = 4/5 * width;
      const data = this.props.data;
      this._prepareChart(height, width, data, this.props.ranges);
    }
  }

  _prepareChart(height, width, data, ranges) {
    const margin = ({top: 30, right: 0, bottom: 30, left: 40});
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.cases)]).nice()
      .range([height - margin.bottom, margin.top])

    const x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].country).tickSizeOuter(0));

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, 's'))
      .call(g => g.select(".domain").remove());

    const svg = d3.select(`.${this.props.classSvgName}`)
      .attr("viewBox", [0, 0, width, height]);

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('fill', d => manageColors(d.cases, ranges))
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d.cases))
      .attr('height', d => y(0) - y(d.cases))
      .attr('width', x.bandwidth())
      .on('mouseover', d => {
        const countryName  = d.country;
        this.props.setPickedData({
          countryName,
          cases: d.cases,
          deaths: d.deaths,
          recovered: d.recovered,
          critical: d.critical,
          casesPerOneMillion: d.casesPerOneMillion,
          deathsPerOneMillion: d.deathsPerOneMillion,
          testsPerOneMillion: d.testsPerOneMillion,
        });
      });

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);
  }

  render() {
    return (
      <svg className={this.props.classSvgName}></svg>
    )
  }
}

export default BarChart;