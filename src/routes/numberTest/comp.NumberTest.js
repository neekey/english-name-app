import React from 'react';
import PropTypes from 'prop-types';
import NumberVoice from './comp.NumberVoice';
import NumberKeyboard from 'app/components/numberKeyboard';
import NumberSlots from 'app/components/numberSlots';
import style from './comp.NumberTest.scss';
import { IS_MOBILE } from 'app/utils/device';
import TestResult from './comp.TestResult';
import resultGoodImg from './result_good.png';
import resultBadImg from './result_bad.png';
import resultCanDoBetterImg from './result_can_do_better.png';
import FacebookProvider, { Share } from 'react-facebook';
import { track, EVENT_TYPE_PRODUCT } from 'app/utils/eventTrack';

export default class NumberTest extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      userInput: '',
      history: [],
      completeCurrentNumberOnce: false,
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

  saveUserResult(userFirstInput) {
    const history = [...this.state.history];
    history.push(userFirstInput);
    this.setState({
      history,
    });
  }


  onRestartTest() {
    this.props.onRestart();
    this.setState({
      currentIndex: 0,
      userInput: '',
      completeCurrentNumberOnce: false,
      history: [],
    });
    track('restart-test', EVENT_TYPE_PRODUCT);
  }

  onNextTest() {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userInput: '',
      completeCurrentNumberOnce: false,
    });
    track('next-number', EVENT_TYPE_PRODUCT);
    if (this.hasTestFinished()) {
      track('test-finish', EVENT_TYPE_PRODUCT);
    }
  }

  onClearUserInput() {
    this.setState({
      userInput: '',
    });
    track('clear-number', EVENT_TYPE_PRODUCT);
  }

  onNumberKeyPress(key) {
    const userInput = this.state.userInput;
    const currentNumber = String(this.getCurrentNumber());
    let newUserInput = userInput;

    if (key === 'delete') {
      newUserInput = userInput.slice(0, userInput.length - 1);
    } else if (userInput.length < String(currentNumber).length) {
      newUserInput = userInput + key;
    }
    this.setState({
      userInput: newUserInput,
    });

    if (!this.state.completeCurrentNumberOnce && newUserInput.length === currentNumber.length) {
      this.state.completeCurrentNumberOnce = true;
      this.saveUserResult(newUserInput);
    }
  }

  getTestResult() {
    return (<TestResult
      actualNumbers={this.state.history}
      expectedNumbers={this.props.numbers} />);
  }

  getCorrectRate() {
    const actualNumbers = this.state.history;
    const expectNumbers = this.props.numbers;
    let correctCount = 0;
    expectNumbers.forEach((correctNumber, index) => {
      if (String(correctNumber) === String(actualNumbers[index])) {
        correctCount++;
      }
    });
    return correctCount / expectNumbers.length;
  }

  getResultText() {
    const rate = this.getCorrectRate();
    let imgSrc = resultGoodImg;
    let text = 'You are awesome!';
    if (rate < 0.5) {
      imgSrc = resultBadImg;
      text = 'Oops! You better work hard on it!';
    } else if (rate < 1) {
      imgSrc = resultCanDoBetterImg;
      text = 'Well done! You can do it better!';
    }
    return (<div className={style.resultText}>
      <img className={style.successIcon} src={imgSrc} alt="tada" />
      <h2>{text}</h2>
    </div>);
  }

  getFinishedView() {
    return (<div className={style.successContent}>
      {this.getResultText()}
      <button className="ui button secondary" onClick={this.onRestartTest}>Another Round!</button>
      <FacebookProvider appId="106304146686329">
        <Share href="http://english-number.com">
          <button className="ui button primary">
            <i className="icon facebook square" />Share This App
          </button>
        </Share>
      </FacebookProvider>
      <div>
        <div className={style.testResultContainer}>
          {this.getTestResult()}
        </div>
      </div>
    </div>);
  }

  getCurrentNumber() {
    return this.props.numbers[this.state.currentIndex];
  }

  hasTestFinished() {
    return this.props.numbers[this.state.currentIndex] === undefined;
  }

  isUserInputCorrect() {
    const currentNumber = this.getCurrentNumber();
    const userInput = this.state.userInput;
    const numberString = String(currentNumber);
    return userInput === numberString;
  }

  getTestView() {
    const currentNumber = this.getCurrentNumber();
    const userInput = this.state.userInput;
    const numberString = String(currentNumber);
    const numberAmount = numberString.length;
    const correct = this.isUserInputCorrect();
    return (<div className={style.container}>
      <NumberVoice className={style.numberVoice} number={currentNumber} />
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
  numbers: PropTypes.array,
  onRestart: PropTypes.func,
};

NumberTest.defaultProps = {
  numbers: [],
  onRestart: () => null,
};
