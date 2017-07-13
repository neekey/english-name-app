import React from 'react';
import PropTypes from 'prop-types';
import ReactHowler from 'react-howler';

const COLORS = [
  '#DB282A',
  '#f2711c',
  '#fbbd08',
  '#b5cc18',
  '#21ba45',
  '#00b5ad',
  '#2185d0',
  '#6435c9',
  '#a333c8',
  '#e03997',
  '#a5673f',
  '#767676',
  '#1b1c1d',
];

function getNumberColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default class NumberDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      played: false,
    };
    this.onVoiceLoaded = this.onVoiceLoaded.bind(this);
    this.onVoiceEnd = this.onVoiceEnd.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.voiceURL !== newProps.voiceURL) {
      this.setState({
        loaded: false,
        played: false,
      });
    }
  }

  onVoiceLoaded() {
    this.setState({
      loaded: true,
    });
  }

  onVoiceEnd() {
    setTimeout(() => {
      this.setState({
        played: true,
      });
    }, 500);
  }

  render() {
    return (<div>
      <h1>{this.state.played ?
        <span style={{ color: getNumberColor() }}>{this.props.number}</span> :
        <i className="help icon" />}
      </h1>
      <ReactHowler
        src={this.props.voiceURL}
        loop={false}
        onLoad={this.onVoiceLoaded}
        onEnd={this.onVoiceEnd}
        playing={!this.state.played} />
    </div>);
  }
}

NumberDetail.propTypes = {
  number: PropTypes.number,
  voiceURL: PropTypes.string,
};
