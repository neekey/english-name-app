import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import style from './comp.NumberSlots.scss';
import classnames from 'classnames';

export default class NumberSlots extends React.PureComponent {
  render() {
    const props = this.props;
    const finished = props.slotAmount === props.number.length;
    let containerClassName = style.container;
    if (finished) {
      containerClassName = (props.correct ? style.containerCorrect : style.containerIncorrect);
    }
    containerClassName = classnames(containerClassName, props.className);

    return (<div className={containerClassName}>
      {times(props.slotAmount, index => (
        <div key={index} className={style.slot}>{props.number[index]}</div>
      ))}
    </div>);
  }
}

NumberSlots.propTypes = {
  slotAmount: PropTypes.number,
  number: PropTypes.string,
};

NumberSlots.defaultProps = {
  slotAmount: 0,
  number: '',
  correct: false,
};
