import React from 'react';
import NumberTest from './comp.NumberTest';
import { getAllNumbersData } from 'app/data/numbers';
import { createNumberTest } from 'app/utils/testMaker';

const ALL_NUMBER_DATA = getAllNumbersData();

export default class NumberTestContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      numberDataList: this.buildNumberDataList(),
    };
    this.onRestart = this.onRestart.bind(this);
  }

  buildNumberDataList() {
    return createNumberTest(20, ALL_NUMBER_DATA);
  }

  onRestart() {
    this.setState({
      numberDataList: this.buildNumberDataList(),
    });
  }

  render() {
    return <NumberTest numberDataList={this.state.numberDataList} onRestart={this.onRestart} />;
  }
}
