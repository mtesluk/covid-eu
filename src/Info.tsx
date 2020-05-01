import React from 'react';

import './Info.scss';

import { Info as IInfo } from './interfaces';

interface State {
  extraClass: string;
}

interface Props {
  data: IInfo;
}

class Info extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      extraClass: '',
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.data.country !== prevProps.data.country) {
      setTimeout(() => {
        this.setState({
          ...this.state,
          extraClass: ''
        })
      }, 1000)
    }
  }

  getSnapshotBeforeUpdate(nextProps: Props, nextState: State) {
    if (this.props.data.country !== nextProps.data.country) {
      this.setState({
        ...this.state,
        extraClass: 'info__anim'
      })
    }
    return null;
  }

  render() {
    return (
      <div className={"info " + this.state.extraClass}>
        <p className="info__element">Name: {this.props.data.country || 'none'}</p>
        <p className="info__element">Cases: {this.props.data.cases || '0'}</p>
        <p className="info__element">Deaths: {this.props.data.deaths || '0'}</p>
        <p className="info__element">Recovered: {this.props.data.recovered || '0'}</p>
        <p className="info__element">Critical: {this.props.data.critical || '0'}</p>
        <p className="info__element">Cases Per Million: {this.props.data.casesPerOneMillion || '0'}</p>
        <p className="info__element">Deaths Per Million: {this.props.data.deathsPerOneMillion || '0'}</p>
        <p className="info__element">Tests Per Million: {this.props.data.testsPerOneMillion || '0'}</p>
      </div>
    )
  }
}

export default Info;