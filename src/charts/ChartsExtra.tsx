import React, { RefObject } from 'react';

import './ChartsExtra.scss';
import { LinearProgress } from '@material-ui/core';

import { BarChart, DataBasic } from 'charts';
import { rangesConfigDeaths } from '../shared/config';
import { Info } from '../shared/interfaces';
import { mapDataToInfo, getWidth } from '../shared/utils';

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
  additionalCountries: string[] = ['Poland'];

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
      const width = getWidth(this.ref.current);
      const dataMostDeaths = mapDataToInfo(this.props.data, 'deaths', (el: Info) => (el.deaths > 20000 || this.additionalCountries.includes(el.country)));

      this.setState({
        ...this.state,
        loading: false,
        mostNumDeathsChart: {
          width,
          data: dataMostDeaths
        },
        lessNumCasesChart: {
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
      <div className="charts-extra" ref={this.ref}>
        {this.state.loading && <LinearProgress className="charts-extra__progress" color="secondary" />}
        <header className="charts-extra__header">Most deaths</header>
        <BarChart
          classSvgName="charts-extra__svg-bar"
          setPickedData={(name: string) => this.setPickedData(name)}
          width={this.state.mostNumDeathsChart.width}
          data={this.state.mostNumDeathsChart.data}
          colors={rangesConfigDeaths}
        ></BarChart>
      </div>
    )
  }
}

export default ChartsExtra;