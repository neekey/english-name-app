import React from 'react';
import PropTypes from 'prop-types';

export default class SettingIcon extends React.Component {
  constructor(props) {
    super(props);
    this.handleSettingClick = this.handleSettingClick.bind(this);
  }

  handleSettingClick() {
    console.log('clicked');
  }
  render() {
    return (
      <i
        onClick={this.handleSettingClick}
        className={`icon cog ${this.props.className}`} />
    );
  }
}

SettingIcon.propTypes = {
  className: PropTypes.string,
};
