import React from 'react';

import './PieChart.scss';

import * as d3 from 'd3';


class PieChart extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.data)
    if (this.props.data !== prevProps.data) {
      const data = this.props.data;
      const width = this.props.width;
      const height = Math.min(width, 500)
      this._prepareChart(height, width, data);
    }
  }

  _prepareChart(height, width, data) {
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.country))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1)

    const radius = Math.min(width, height) / 2 * 0.8;
    const arcLabel = {
      centroid: d3.arc().innerRadius(radius).outerRadius(radius)
      }

    const pie = d3.pie()
      .sort(null)
      .value(d => d.cases)

    const arcs = pie(data);

    const svg = d3.select(`.${this.props.classSvgName}`)
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg.append("g")
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", d => color(d.data.country))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.country}: ${d.data.cases.toLocaleString()}`);

    svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .call(text => text.append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.country))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.cases.toLocaleString()));
  }

  render() {
    return (
      <svg className={this.props.classSvgName}></svg>
    )
  }
}

export default PieChart;