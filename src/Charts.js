import React from 'react';

import './Charts.scss';
import { LinearProgress } from '@material-ui/core';

import axios from 'axios';
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
      const data = this.props.data.filter(el => (el.cases > 100000 || el.country === 'Poland'));
      console.log(data)

      if (!getComputedStyle) { alert('Not supported'); }
      const computedStyle = getComputedStyle(this.ref.current);
      var width = this.ref.current.clientWidth;
      width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
      const height = Math.floor(4/5 * width);

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
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y))

      const svg = d3.select('.charts__svg')
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
        <svg className="charts__svg"></svg>
        <div className="charts__tooltip"></div>
      </div>
    )
  }
}

export default Charts;