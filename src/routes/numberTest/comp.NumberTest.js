import React from 'react';
import PropTypes from 'prop-types';
import NumberVoice from './comp.NumberVoice';
import NumberKeyboard from 'app/components/numberKeyboard';
import NumberSlots from 'app/components/numberSlots';
import style from './comp.NumberTest.scss';
import { IS_MOBILE } from 'app/utils/device';
import successImg from './tada.png';

export default class NumberTest extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      userInput: '',
    };
    this.onRestartTest = this.onRestartTest.bind(this);
    this.onNextTest = this.onNextTest.bind(this);
    this.onNumberKeyPress = this.onNumberKeyPress.bind(this);
    this.handleWindowKeyPress = this.handleWindowKeyPress.bind(this);
    this.onClearUserInput = this.onClearUserInput.bind(this);
  }

  handleWindowKeyPress(e) {
    const code = e.which;
    if (code === 13 && this.isUserInputCorrect()) {
      this.onNextTest();
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleWindowKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleWindowKeyPress);
  }

  onRestartTest() {
    this.props.onRestart();
    this.setState({
      currentIndex: 0,
      userInput: '',
    });
  }

  onNextTest() {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userInput: '',
    });
  }

  onClearUserInput() {
    this.setState({
      userInput: '',
    });
  }

  onNumberKeyPress(key) {
    const userInput = this.state.userInput;
    const data = this.getCurrentNumberData();
    if (key === 'delete') {
      this.setState({
        userInput: userInput.slice(0, userInput.length - 1),
      });
    } else if (userInput.length < String(data.number).length) {
      this.setState({
        userInput: userInput + key,
      });
    }
  }

  getFinishedView() {
    return (<div className={style.successContent}>
      <img className={style.successIcon} src={successImg} alt="tada" />
      <h2>You finished all the test!</h2>
      <button className="ui button secondary" onClick={this.onRestartTest}>Another Round!</button>
    </div>);
  }

  getCurrentNumberData() {
    return this.props.numberDataList[this.state.currentIndex];
  }

  hasTestFinished() {
    return !this.props.numberDataList[this.state.currentIndex];
  }

  isUserInputCorrect() {
    const data = this.getCurrentNumberData();
    const userInput = this.state.userInput;
    const numberString = String(data.number);
    return userInput === numberString;
  }

  getTestView() {
    const data = this.getCurrentNumberData();
    const userInput = this.state.userInput;
    const numberString = String(data.number);
    const numberAmount = numberString.length;
    const correct = this.isUserInputCorrect();
    return (<div className={style.container}>
      <NumberVoice className={style.numberVoice} number={data.number} voiceURL={data.url} />
      <NumberSlots
        className={style.numberSlots}
        correct={correct}
        slotAmount={numberAmount}
        number={userInput} />
      <button
        className="ui button basic"
        onClick={this.onClearUserInput}>Clear</button>
      <button
        disabled={!correct}
        className="ui button primary"
        onClick={this.onNextTest}>Next</button>
      <NumberKeyboard
        colorIndex={this.state.currentIndex}
        showKeyboard={IS_MOBILE}
        className={style.numberKeyboard}
        onKeyPress={this.onNumberKeyPress} />
    </div>);
  }

  render() {
    const hasTestFinished = this.hasTestFinished();
    return (<div>
      {hasTestFinished ? this.getFinishedView() : this.getTestView()}
    </div>);
  }
}


NumberTest.propTypes = {
  numberDataList: PropTypes.array,
  onRestart: PropTypes.func,
};

NumberTest.defaultProps = {
  numberDataList: [],
  onRestart: () => null,
};
