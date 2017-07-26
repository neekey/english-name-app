import React from 'react';
import NumberTest from './comp.NumberTest';
import { getAllNumbersData } from 'app/data/numbers';
import { createNumberTest } from 'app/utils/testMaker';

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
    return createNumberTest(10, ALL_NUMBER_DATA);
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
