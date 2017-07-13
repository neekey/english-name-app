export default {
  path: 'index',
  getComponent(nextState, done) {
    require.ensure([], require => {
      done(null, require('./comp.Home').default);
    });
  },
};
