import React from 'react';

import './Info.scss';


class Info extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      cl: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.countryName !== prevProps.countryName) {
      setTimeout(() => {
        this.setState({
          ...this.state,
          cl: ''
        })
      }, 1000)
    }
  }

  getSnapshotBeforeUpdate(nextProps, nextState) {
    if (this.props.countryName !== nextProps.countryName) {
      this.setState({
        ...this.state,
        cl: 'info__anim'
      })
    }
    return null;
  }

  render() {
    return (
      <div className={"info " + this.state.cl}>
        <p className="info__element">Name: {this.props.countryName || 'none'}</p>
        <p className="info__element">Cases: {this.props.cases || '0'}</p>
        <p className="info__element">Deaths: {this.props.deaths || '0'}</p>
        <p className="info__element">Recovered: {this.props.recovered || '0'}</p>
        <p className="info__element">Critical: {this.props.critical || '0'}</p>
        <p className="info__element">Cases Per Million: {this.props.casesPerOneMillion || '0'}</p>
        <p className="info__element">Deaths Per Million: {this.props.deathsPerOneMillion || '0'}</p>
        <p className="info__element">Tests Per Million: {this.props.testsPerOneMillion || '0'}</p>
      </div>
    )
  }
}

export default Info;