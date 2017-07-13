export default {
  path: 'number-test',
  getComponent(nextState, done) {
    require.ensure([], require => {
      done(null, require('./cont.NumberTest').default);
    });
  },
};
