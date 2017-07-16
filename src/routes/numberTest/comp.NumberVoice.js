import React from 'react';
import PropTypes from 'prop-types';
import ReactHowler from 'react-howler';

export default class NumberDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      playing: false,
    };
    this.onVoiceLoaded = this.onVoiceLoaded.bind(this);
    this.onVoiceEnded = this.onVoiceEnded.bind(this);
    this.onHandlePlay = this.onHandlePlay.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.voiceURL !== newProps.voiceURL) {
      this.setState({
        loading: true,
        playing: true,
      });
    }
  }

  onVoiceLoaded() {
    this.setState({
      loading: false,
      playing: true,
    });
  }

  onVoiceEnded() {
    this.setState({
      playing: false,
    });
  }

  onHandlePlay() {
    this.setState({
      playing: true,
    });
  }

  render() {
    return (<div className={this.props.className}>
      {this.state.loading ?
        <i className="icon spinner" /> :
        <i onClick={this.onHandlePlay} className="icon talk outline" />}
      <ReactHowler
        src={this.props.voiceURL}
        loop={false}
        onLoad={this.onVoiceLoaded}
        onEnd={this.onVoiceEnded}
        playing={this.state.playing} />
    </div>);
  }
}

NumberDetail.propTypes = {
  voiceURL: PropTypes.string,
};
