import React from 'react';
import { Link } from 'react-router';
import style from './comp.Home.scss';
import { track, EVENT_TYPE_PRODUCT } from 'app/utils/eventTrack';

export default function Home() {
  return (<div
    className={style.container}
    onClick={() => track('start-test', EVENT_TYPE_PRODUCT)}>
    <Link className={style.startButton} to="/number-test">Start Test</Link>
  </div>);
}

Home.propTypes = {
};
