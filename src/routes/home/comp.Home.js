import React from 'react';
import { Link } from 'react-router';
import style from './comp.Home.scss';

export default function Home() {
  return (<div className={style.container}>
    <Link className={style.startButton} to="/number-test">Start Test</Link>
  </div>);
}

Home.propTypes = {
};
