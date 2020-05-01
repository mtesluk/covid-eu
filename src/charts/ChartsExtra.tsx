import React, { RefObject } from 'react';

import './ChartsExtra.scss';
import { LinearProgress } from '@material-ui/core';

import { BarChart, DataBasic } from 'charts';
import { mostCommonColor } from '../shared/config';
import { Info } from '../shared/interfaces';
import { mapDataToInfo, getWidth } from '../shared/utils';

interface State {
  loading: boolean;
  mostNumCasesPerMillionChart: {width: number, data: DataBasic[]};
  mostNumDeathsPerMillionChart: {width: number, data: DataBasic[]};
  mostNumTestsPerMillionChart: {width: number, data: DataBasic[]};
}

interface Props {
  data: Info[];
  setPickedData: (data: Info) => void;
}

class ChartsExtra extends React.Component<Props, State> {
  ref: RefObject<HTMLDivElement> = React.createRef();
  additionalCountries: string[] = ['Poland'];
  state: State = {
    loading: true,
    mostNumCasesPerMillionChart: {
      width: 0,
      data: []
    },
    mostNumDeathsPerMillionChart: {
      width: 0,
      data: []
    },
    mostNumTestsPerMillionChart: {
      width: 0,
      data: []
    },
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.data !== prevProps.data) {
      const width: number = getWidth(this.ref.current);
      const dataMostDeaths: DataBasic[] = mapDataToInfo(this.props.data, 'deathsPerOneMillion', (el: Info) => (el.deathsPerOneMillion > 300 || this.additionalCountries.includes(el.country)));
      const dataMostTests: DataBasic[] = mapDataToInfo(this.props.data, 'testsPerOneMillion', (el: Info) => (el.cases > 100000 || this.additionalCountries.includes(el.country)));
      const dataMostCases: DataBasic[] = mapDataToInfo(this.props.data, 'casesPerOneMillion', (el: Info) => (el.casesPerOneMillion > 4000 || this.additionalCountries.includes(el.country)));

      this.setState({
        ...this.state,
        loading: false,
        mostNumCasesPerMillionChart: {
          width,
          data: dataMostCases
        },
        mostNumDeathsPerMillionChart: {
          width,
          data: dataMostDeaths
        },
        mostNumTestsPerMillionChart: {
          width,
          data: dataMostTests
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
      <div className="charts-extra" ref={this.ref}>
        {this.state.loading && <LinearProgress className="charts-extra__progress" color="secondary" />}
        <header className="charts-extra__header">Most tests per million</header>
        <BarChart
          classSvgName="charts-extra__svg-bar-tests"
          setPickedData={(name: string) => this.setPickedData(name)}
          width={this.state.mostNumTestsPerMillionChart.width}
          data={this.state.mostNumTestsPerMillionChart.data}
          colors={mostCommonColor}
        ></BarChart>
        <header className="charts-extra__header">Most cases per million</header>
        <BarChart
          classSvgName="charts-extra__svg-bar-cases"
          setPickedData={(name: string) => this.setPickedData(name)}
          width={this.state.mostNumCasesPerMillionChart.width}
          data={this.state.mostNumCasesPerMillionChart.data}
          colors={mostCommonColor}
        ></BarChart>
        <header className="charts-extra__header">Most deaths per million</header>
        <BarChart
          classSvgName="charts-extra__svg-bar-deaths"
          setPickedData={(name: string) => this.setPickedData(name)}
          width={this.state.mostNumDeathsPerMillionChart.width}
          data={this.state.mostNumDeathsPerMillionChart.data}
          colors={mostCommonColor}
        ></BarChart>
      </div>
    )
  }
}

export default ChartsExtra;