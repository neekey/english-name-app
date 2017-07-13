import App from './app/comp.App';

import HomeRoute from './home/route';
import NumberTestRoute from './numberTest/route';

const rootRoute = {
  path: '/',
  component: App,
  indexRoute: {
    onEnter: (nextState, replace) => replace('/index'),
  },
  childRoutes: [
    HomeRoute,
    NumberTestRoute,
  ],
};

export default rootRoute;
