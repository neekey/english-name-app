import React from 'react';
import PropTypes from 'prop-types';
import style from './comp.TestResult.scss';
import classnames from 'classnames';
import { playVoice } from 'app/utils/numberVoice';

export default class TestResult extends React.PureComponent {
  renderResult(expectNumber, actualNumber) {
    const soundIconClassName = classnames(style.soundIcon, 'icon sound');
    const correctMarkClassName = classnames(style.correctMark, 'icon checkmark');
    const incorrectMarkClassName = classnames(style.incorrectMark, 'icon remove');
    const extString = String(expectNumber);
    const actString = String(actualNumber);
    const onNumberPlay = () => playVoice(expectNumber);
    if (extString === actString) {
      return (<div key={actualNumber} className={style.item}>
        <i className={correctMarkClassName} />
        <i className={soundIconClassName} onClick={onNumberPlay} />
        <span className={style.correctNumbers}>{extString}</span>
      </div>);
    }
    const exList = extString.split('');
    const actList = actString.split('');
    return (<div key={actualNumber} className={style.item}>
      <i className={incorrectMarkClassName} />
      <i className={soundIconClassName} onClick={onNumberPlay} />
      <span className={style.incorrectNumbersWrapper}>
        <span className={style.incorrectNumbers}>
          {exList.map((en, index) => {
            if (en === actList[index]) {
              return <span key={index} className={style.correctNumber}>{en}</span>;
            }
            return <span key={index} className={style.incorrectNumber}>{actList[index]}</span>;
          })}
        </span>
        <span className={style.incorrectNumbers}>
          {actList.map((an, index) => {
            if (an === exList[index]) {
              return <span key={index} className={style.hiddenNumber}>{exList[index]}</span>;
            }
            return <span key={index} className={style.correctNumber}>{exList[index]}</span>;
          })}
        </span>
      </span>
    </div>);
  }
  render() {
    return (<ul className={style.list}>
      {this.props.expectedNumbers.map((expectNumber, index) => (
        this.renderResult(expectNumber, this.props.actualNumbers[index])
      ))}
    </ul>);
  }
}

TestResult.propTypes = {
  expectedNumbers: PropTypes.array,
  actualNumbers: PropTypes.array,
};

TestResult.defaultProps = {
};
