import React from 'react';
import NumberTest from './comp.NumberTest';
import { getAllNumbersData } from 'app/data/numbers';
import { createNumberTest } from 'app/utils/testMaker';
import { getSetting } from 'app/data/setting';

const ALL_NUMBER_DATA = getAllNumbersData();

export default class NumberTestContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      numbers: this.buildNumbers(),
    };
    this.onRestart = this.onRestart.bind(this);
  }

  buildNumbers() {
    const setting = getSetting();
    return createNumberTest(
      setting.testRoundSize,
      ALL_NUMBER_DATA,
      setting.testNumberUpperLimit
    );
  }

  onRestart() {
    this.setState({
      numbers: this.buildNumbers(),
    });
  }

  render() {
    return <NumberTest numbers={this.state.numbers} onRestart={this.onRestart} />;
  }
}
