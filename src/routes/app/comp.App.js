import React from 'react';
import PropTypes from 'prop-types';
import style from './comp.App.scss';
import Logo from './logo.png';
import { Link } from 'react-router';

export default function App(props) {
  return (<div className={style.container}>
    <div className={style.logo}>
      <Link to="/"><img alt="logo" src={Logo} />ENGLISH NUMBERS</Link>
    </div>
    {props.children}
  </div>);
}

App.propTypes = {
  children: PropTypes.any,
};
