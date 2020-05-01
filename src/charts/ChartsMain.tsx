import React, { RefObject } from 'react';

import './ChartsMain.scss';
import { LinearProgress } from '@material-ui/core';

import { BarChart, PieChart, DataBasic } from 'charts';
import { rangesConfigCases } from '../shared/config';
import { Info } from '../shared/interfaces';
import { mapDataToInfo, getWidth } from '../shared/utils';


interface State {
  loading: boolean;
  mostNumCasesChart: {width: number, data: DataBasic[]};
  mostNumDeathsChart: {width: number, data: DataBasic[]};
}

interface Props {
  data: Info[];
  setPickedData: (data: Info) => any;
}

class ChartsMain extends React.Component<Props, State> {
  ref: RefObject<HTMLDivElement> = React.createRef();
  additionalCountries: string[] = ['Poland'];

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      mostNumCasesChart: {
        width: 0,
        data: []
      },
      mostNumDeathsChart: {
        width: 0,
        data: []
      },
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.data !== prevProps.data) {
      const width = getWidth(this.ref.current);
      const dataMost = mapDataToInfo(this.props.data, 'cases', (el: Info) => (el.cases > 100000 || this.additionalCountries.includes(el.country)));
      const dataMostDeaths = mapDataToInfo(this.props.data, 'deaths', (el: Info) => (el.deaths > 20000 || this.additionalCountries.includes(el.country)));

      this.setState({
        ...this.state,
        loading: false,
        mostNumCasesChart: {
          width,
          data: dataMost
        },
        mostNumDeathsChart: {
          width,
          data: dataMostDeaths
        },
      });
    }
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
          colors={rangesConfigCases}
        ></BarChart>
        <header className="charts-main__header">Most numerous deaths</header>
        <PieChart
          classSvgName="charts-main__svg-pie"
          setPickedData={(name: string) => this.setPickedData(name)}
          width={this.state.mostNumDeathsChart.width}
          data={this.state.mostNumDeathsChart.data}
        ></PieChart>
        <p className="charts-main__footer">Source: https://coronavirus-19-api.herokuapp.com/countries</p>
      </div>
    )
  }
}

export default ChartsMain;