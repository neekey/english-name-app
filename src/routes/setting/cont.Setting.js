import React from 'react';
import Setting from './comp.Setting';
import { getSetting, saveSetting } from 'app/data/setting';
import { track, EVENT_TYPE_PRODUCT } from 'app/utils/eventTrack';

export default class NumberTestContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(setting) {
    track('setting-save', EVENT_TYPE_PRODUCT);
    saveSetting(setting);
    history.back();
  }

  render() {
    const setting = getSetting();
    const { testNumberUpperLimit, testRoundSize } = setting;
    return (
      <Setting
        onSave={this.handleSave}
        defaultTestNumberUpperLimit={testNumberUpperLimit}
        defaultTestRoundSize={testRoundSize} />
    );
  }
}
