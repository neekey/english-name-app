import React from 'react';
import PropTypes from 'prop-types';
import style from './comp.App.scss';
import Logo from './logo.png';
import { Link } from 'react-router';
import { track, EVENT_TYPE_FB, EVENT_TYPE_PRODUCT } from 'app/utils/eventTrack';

export default function App(props) {
  return (<div className={style.container}>
    <div className={style.logo}>
      <Link
        onClick={() => track('home-click', EVENT_TYPE_PRODUCT)}
        to="/">
        <img alt="logo" src={Logo} />ENGLISH NUMBERS
      </Link>
      <a
        onClick={() => track('fb-website-click', EVENT_TYPE_FB)}
        target="_blank"
        className={style.facebookSite}
        href="https://www.facebook.com/English-Number-Community-480842478915669/">
        <i className="icon facebook square" />
      </a>
    </div>
    {props.children}
  </div>);
}

App.propTypes = {
  children: PropTypes.any,
};
