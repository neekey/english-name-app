import React from 'react';
import PropTypes from 'prop-types';
import NumberVoice from './comp.NumberVoice';
import NumberKeyboard from 'app/components/numberKeyboard';
import NumberSlots from 'app/components/numberSlots';
import style from './comp.NumberTest.scss';

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
  }

  onRestartTest() {
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
    return (<div>
      <h2>You finished all the test!</h2>
      <button className="ui button primary" onClick={this.onRestartTest}>Restart</button>
    </div>);
  }

  getCurrentNumberData() {
    return this.props.numberDataList[this.state.currentIndex];
  }

  hasMoveTest() {
    return this.props.numberDataList.length - 1 > this.state.currentIndex;
  }

  getTestView() {
    const data = this.getCurrentNumberData();
    const userInput = this.state.userInput;
    const numberString = String(data.number);
    const numberAmount = numberString.length;
    const correct = userInput === numberString;
    return (<div className={style.container}>
      <NumberVoice className={style.numberVoice} number={data.number} voiceURL={data.url} />
      <NumberSlots
        className={style.numberSlots}
        correct={correct}
        slotAmount={numberAmount}
        number={userInput} />
      <button
        disabled={!correct}
        className="ui button basic"
        onClick={this.onNextTest}>Next</button>
      <NumberKeyboard className={style.numberKeyboard} onKeyPress={this.onNumberKeyPress} />
    </div>);
  }

  render() {
    const hasMoveTest = this.hasMoveTest();
    return (<div>
      {hasMoveTest ? this.getTestView() : this.getFinishedView()}
    </div>);
  }
}


NumberTest.propTypes = {
  numberDataList: PropTypes.array,
};
