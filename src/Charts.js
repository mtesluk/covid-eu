import React from 'react';

import './Charts.scss';
import { LinearProgress } from '@material-ui/core';

import * as d3 from 'd3';


class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      loading: true,
      width: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      const width = this._getWidth();

      var data = this.props.data.filter(el => (el.cases > 100000 || el.country === 'Poland'));
      var height = 4/5 * width;
      this._prepareBarChart(height, width, data);

      data = this.props.data.filter(el => (el.cases < 3000 || el.country === 'Poland'));
      height = Math.min(width, 500)
      this._preparePieChart(height, width, data);
    }
  }

  _getWidth() {
    if (!getComputedStyle) { alert('Not supported'); }
    const computedStyle = getComputedStyle(this.ref.current);
    var width = this.ref.current.clientWidth;
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    return width;
  }

  _preparePieChart(height, width, data) {
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

    const svg1 = d3.select('.charts__svg-pie')
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg1.append("g")
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", d => color(d.data.country))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.country}: ${d.data.cases.toLocaleString()}`);

    svg1.append("g")
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

  _prepareBarChart(height, width, data) {
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

    const svg = d3.select('.charts__svg-bar')
      .attr("viewBox", [0, 0, width, height]);

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('fill', d => this._manageColors(d.cases))
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d.cases))
      .attr('height', d => y(0) - y(d.cases))
      .attr('width', x.bandwidth())
      .on('mouseover', d => {
        const countryName  = d.country;
        this.props.setPickedData({
          countryName,
          cases: d.cases
        });
      })

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    this.setState({
      ...this.state,
      loading: false
    });
  }

  _manageColors(amount) {
    if (!amount) return '#ff0909';
    const ranges = [
      {min: 0, max: 1000, color: '#fff1d9'},
      {min: 1001, max: 10000, color: '#fdcd8b'},
      {min: 10001, max: 50000, color: '#b55440'},
      {min: 50001, max: 100000, color: '#b53828'},
      {min: 100001, max: 420001, color: '#500000'},
    ]

    for(var range of ranges) {
      if (amount > range.min && amount < range.max) return range.color;
    }
    return '#000';
  }

  render() {
    return (
      <div className="charts" ref={this.ref}>
        {this.state.loading && <LinearProgress className="charts__progress" color="secondary" />}
        <header className="charts__header">Most numerous countries</header>
        <svg className="charts__svg-bar"></svg>
        <header className="charts__header">Less numerous countries</header>
        <svg className="charts__svg-pie"></svg>
        <p className="info__footer">Source: https://coronavirus-19-api.herokuapp.com/countries</p>
      </div>
    )
  }
}

export default Charts;