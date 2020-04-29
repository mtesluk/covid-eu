import React from 'react';

import './ChartsMain.scss';
import { LinearProgress } from '@material-ui/core';

import { BarChart } from 'charts';
import { PieChart } from 'charts';
import { ranges as colorRanges } from './config';


class ChartsMain extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      loading: true,
      mostNumCasesChart: {
        width: 0,
        data: []
      },
      lessNumCasesChart: {
        width: 0,
        data: []
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      const width = this._getWidth();
      const dataMost = this.props.data.filter(el => (el.cases > 100000 || el.country === 'Poland'));
      const dataLess = this.props.data.filter(el => (el.cases < 3000 || el.country === 'Poland'));

      this.setState({
        ...this.state,
        loading: false,
        mostNumCasesChart: {
          width,
          data: dataMost
        },
        lessNumCasesChart: {
          width,
          data: dataLess
        },
      });
    }
  }

  _getWidth() {
    if (!getComputedStyle) { alert('Not supported'); }
    const computedStyle = getComputedStyle(this.ref.current);
    var width = this.ref.current.clientWidth;
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    return width;
  }

  render() {
    return (
      <div className="charts-main" ref={this.ref}>
        {this.state.loading && <LinearProgress className="charts-main__progress" color="secondary" />}
        <header className="charts-main__header">Most numerous countries</header>
        <BarChart
          classSvgName="charts-main__svg-bar"
          setPickedData={this.props.setPickedData}
          width={this.state.mostNumCasesChart.width}
          data={this.state.mostNumCasesChart.data}
          ranges={colorRanges}
        ></BarChart>
        <header className="charts-main__header">Less numerous countries</header>
        <PieChart
          classSvgName="charts-main__svg-pie"
          setPickedData={this.props.setPickedData}
          width={this.state.lessNumCasesChart.width}
          data={this.state.lessNumCasesChart.data}
        ></PieChart>
        <p className="charts-main__footer">Source: https://coronavirus-19-api.herokuapp.com/countries</p>
      </div>
    )
  }
}

export default ChartsMain;