import React from 'react';
import { Link } from 'react-router';

export default function Home() {
  return (<div>
    <Link to="/number-test"><span className="ui button primary">Start Test</span></Link>
  </div>);
}

Home.propTypes = {
};
