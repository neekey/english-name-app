import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import style from './comp.Setting.scss';

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testRoundSize: props.defaultTestRoundSize,
      testNumberUpperLimit: props.defaultTestNumberUpperLimit,
    };
    this.handleTestNumberUpperLimit = this.handleTestNumberUpperLimit.bind(this);
    this.handleTestRoundSizeChange = this.handleTestRoundSizeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave(this.state);
  }
  handleTestRoundSizeChange(e) {
    this.setState({
      testRoundSize: e.target.value,
    });
  }
  handleTestNumberUpperLimit(e) {
    this.setState({
      testNumberUpperLimit: e.target.value,
    });
  }
  render() {
    const { testRoundSize, testNumberUpperLimit } = this.state;
    return (
      <div className={style.container}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <div className={style.item}>
            <label className={style.label}>
              <p>How many numbers per test round:</p>
              <select
                className={style.select}
                value={testRoundSize}
                onChange={this.handleTestRoundSizeChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </label>
          </div>
          <div className={style.item}>
            <label className={style.label}>
              <p>Keep the numbers smaller than:</p>
              <select
                className={style.select}
                value={testNumberUpperLimit}
                onChange={this.handleTestNumberUpperLimit}>
                <option value={100}>100</option>
                <option value={1000}>1000</option>
                <option value={10000}>10000</option>
                <option value={100000}>100000</option>
                <option value={1000000}>1000000</option>
              </select>
            </label>
          </div>
          <div className={style.item}>
            <Link
              className="ui button basic"
              to="/">Cancel</Link>
            <button
              type="submit"
              className={`ui button primary ${style.saveBtn}`}
              onClick={this.onSave}>Save</button>
          </div>
        </form>
      </div>
    );
  }
}

Setting.propTypes = {
  onSave: PropTypes.func,
  defaultTestRoundSize: PropTypes.number,
  defaultTestNumberUpperLimit: PropTypes.number,
};
