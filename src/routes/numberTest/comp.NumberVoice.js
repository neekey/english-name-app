import React from 'react';
import PropTypes from 'prop-types';
import style from './comp.NumberVoice.scss';
import classnames from 'classnames';
import { playVoice } from 'app/utils/numberVoice';
import { track, EVENT_TYPE_PRODUCT } from 'app/utils/eventTrack';

export default class NumberVoice extends React.PureComponent {
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

  componentDidMount() {
    this.playVoice();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.number !== newProps.number) {
      this.setState({
        loadiang: true,
        playing: true,
      });
      this.playVoice(newProps.number);
    }
  }

  playVoice(number) {
    playVoice(number || this.props.number, {
      onLoad: this.onVoiceLoaded,
      onEnd: this.onVoiceEnded,
    });
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
    this.playVoice();
    track('play-voice', EVENT_TYPE_PRODUCT);
  }

  render() {
    return (<div
      className={classnames(style.container, this.props.className)}
      onClick={this.state.loading ? undefined : this.onHandlePlay}>
      {this.state.loading ?
        <i className="icon spinner" /> :
        <i className="icon talk outline" />}
      <span className={style.voiceTip}>Tap Me To Play</span>
    </div>);
  }
}

NumberVoice.propTypes = {
  number: PropTypes.number,
};
