import React, { RefObject } from 'react';

import './ChartsExtra.scss';
import { LinearProgress } from '@material-ui/core';

import { BarChart, DataBasic } from 'charts';
import { rangesConfig } from './config';
import { Info } from './interfaces';

interface State {
  loading: boolean;
  mostNumDeathsChart: {width: number, data: DataBasic[]};
  lessNumCasesChart: {width: number, data: DataBasic[]};
}

interface Props {
  data: Info[];
  setPickedData: (data: Info) => any;
}

class ChartsExtra extends React.Component<Props, State> {
  ref: RefObject<HTMLDivElement> = React.createRef();

  constructor(props: Props) {
    super(props);
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

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.data !== prevProps.data) {
      const width = this._getWidth();
      const dataMostDeaths = this.props.data.filter((el: Info) => (el.deaths > 20000 || el.country === 'Poland')).map((el: Info) => ({name: el.country, value: el.cases}));
      const dataLess = this.props.data.filter((el: Info) => (el.testsPerOneMillion > 9000 || el.country === 'Poland')).map((el: Info) => ({name: el.country, value: el.cases}));

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
      <div className="charts-extra" ref={this.ref}>
        {this.state.loading && <LinearProgress className="charts-extra__progress" color="secondary" />}
        <header className="charts-extra__header">Most deaths</header>
        <BarChart
          classSvgName="charts-extra__svg-bar"
          setPickedData={(name: string) => this.setPickedData(name)}
          width={this.state.mostNumDeathsChart.width}
          data={this.state.mostNumDeathsChart.data}
          rangeColor={rangesConfig}
        ></BarChart>
      </div>
    )
  }
}

export default ChartsExtra;