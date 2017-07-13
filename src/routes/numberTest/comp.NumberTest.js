import React from 'react';
import PropTypes from 'prop-types';
import NumberDetail from './comp.NumberDetail';

export default class NumberTest extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.onRestartTest = this.onRestartTest.bind(this);
    this.onNextTest = this.onNextTest.bind(this);
  }

  onRestartTest() {
    this.setState({
      currentIndex: 0,
    });
  }

  onNextTest() {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
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
    return (<div>
      <NumberDetail number={data.number} voiceURL={data.url} />
      <button className="ui button basic" onClick={this.onNextTest}>Next Test</button>
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
