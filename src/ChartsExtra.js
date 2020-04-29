import React from 'react';

import './ChartsExtra.scss';
import { LinearProgress } from '@material-ui/core';

import { BarChart } from 'charts';
import { ranges as colorRanges } from './config';


class ChartsExtra extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      loading: true,
      mostNumDeathsChart: {
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
      const dataMostDeaths = this.props.data.filter(el => (el.deaths > 20000 || el.country === 'Poland'));
      const dataLess = this.props.data.filter(el => (el.testsPerMillion > 9000 || el.country === 'Poland'));

      this.setState({
        ...this.state,
        loading: false,
        mostNumDeathsChart: {
          width,
          data: dataMostDeaths
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
      <div className="charts-extra" ref={this.ref}>
        {this.state.loading && <LinearProgress className="charts-extra__progress" color="secondary" />}
        <header className="charts-extra__header">Most deaths</header>
        <BarChart
          classSvgName="charts-extra__svg-bar"
          setPickedData={this.props.setPickedData}
          width={this.state.mostNumDeathsChart.width}
          data={this.state.mostNumDeathsChart.data}
          ranges={colorRanges}
        ></BarChart>
      </div>
    )
  }
}

export default ChartsExtra;