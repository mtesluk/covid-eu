import React, { RefObject } from 'react';

import './ChartsMain.scss';
import { LinearProgress } from '@material-ui/core';

import { BarChart, PieChart, DataBasic } from 'charts';
import { rangesConfig } from './config';
import { Info } from './interfaces';


interface State {
  loading: boolean;
  mostNumCasesChart: {width: number, data: DataBasic[]};
  lessNumCasesChart: {width: number, data: DataBasic[]};
}

interface Props {
  data: Info[];
  setPickedData: (data: Info) => any;
}

class ChartsMain extends React.Component<Props, State> {
  ref: RefObject<HTMLDivElement> = React.createRef();

  constructor(props: Props) {
    super(props);
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

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.data !== prevProps.data) {
      const width = this._getWidth();
      const dataMost = this.props.data.filter((el: Info) => (el.cases > 100000 || el.country === 'Poland')).map((el: Info) => ({name: el.country, value: el.cases}));
      const dataLess = this.props.data.filter((el: Info) => (el.cases < 3000 || el.country === 'Poland')).map((el: Info) => ({name: el.country, value: el.cases}));

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
    const computedStyle = getComputedStyle(this.ref.current as Element);
    var width = this.ref?.current?.clientWidth || 0;
    width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    return width;
  }

  setPickedData(name: string) {
    const data: Info = this.props.data.find((el: Info) => (el.country === name)) as Info;
    this.props.setPickedData(data);
  }

  render() {
    return (
      <div className="charts-main" ref={this.ref}>
        {this.state.loading && <LinearProgress className="charts-main__progress" color="secondary" />}
        <header className="charts-main__header">Most numerous countries</header>
        <BarChart
          classSvgName="charts-main__svg-bar"
          setPickedData={(name: string) => this.setPickedData(name)}
          width={this.state.mostNumCasesChart.width}
          data={this.state.mostNumCasesChart.data}
          rangeColor={rangesConfig}
        ></BarChart>
        <header className="charts-main__header">Less numerous countries</header>
        <PieChart
          classSvgName="charts-main__svg-pie"
          setPickedData={(name: string) => this.setPickedData(name)}
          width={this.state.lessNumCasesChart.width}
          data={this.state.lessNumCasesChart.data}
        ></PieChart>
        <p className="charts-main__footer">Source: https://coronavirus-19-api.herokuapp.com/countries</p>
      </div>
    )
  }
}

export default ChartsMain;