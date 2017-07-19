import React from 'react';
import PropTypes from 'prop-types';
import style from './comp.NumberKeyboard.scss';
import classnames from 'classnames';

const COLORS = [
  '#DB282A',
  '#f2711c',
  '#fbbd08',
  '#b5cc18',
  '#21ba45',
  '#00b5ad',
  '#2185d0',
  '#6435c9',
  '#a333c8',
  '#e03997',
  '#a5673f',
  '#767676',
  '#1b1c1d',
];

function getColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default class NumberKeyboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleWindowKeyPress = this.handleWindowKeyPress.bind(this);
  }

  getButton(value, text, color) {
    return (<div
      style={{ backgroundColor: color }}
      className={style.keyButton}
      onClick={() => this.props.onKeyPress(value)}>{text}</div>);
  }

  handleWindowKeyPress(e) {
    const code = e.which;
    if (code >= 48 && code <= 57) {
      this.props.onKeyPress(String(code - 48));
    }
    if (code === 190) {
      this.props.onKeyPress('.');
    }
    if (code === 8) {
      this.props.onKeyPress('delete');
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleWindowKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleWindowKeyPress);
  }

  render() {
    const color = getColor();
    return this.props.showKeyboard ? (<div
      className={classnames(style.container, this.props.className)}>
      {this.getButton('1', 1, color)}
      {this.getButton('2', 2, color)}
      {this.getButton('3', 3, color)}
      {this.getButton('4', 4, color)}
      {this.getButton('5', 5, color)}
      {this.getButton('6', 6, color)}
      {this.getButton('7', 7, color)}
      {this.getButton('8', 8, color)}
      {this.getButton('9', 9, color)}
      {this.getButton('.', '.', color)}
      {this.getButton('0', 0, color)}
      {this.getButton('delete', 'DEL', color)}
    </div>) : null;
  }
}

NumberKeyboard.propTypes = {
  colorIndex: PropTypes.any,
  onKeyPress: PropTypes.func,
  showKeyboard: PropTypes.bool,
};

NumberKeyboard.defaultProps = {
  onKeyPress: () => null,
};
