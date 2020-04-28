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
    // Typical usage (don't forget to compare props):
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
      // clearTimeout(this.state.tm);
      // this.setState({
      //   ...this.state,
      //   cl: ''
      // })
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
        <p className="info__name">Name: {this.props.countryName || 'none'}</p>
        <p>Cases: {this.props.cases || '0'}</p>
        <p className="info__footer">Source: https://coronavirus-19-api.herokuapp.com/countries</p>
      </div>
    )
  }
}

export default Info;