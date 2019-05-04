export default {
  path: 'setting',
  getComponent(nextState, done) {
    require.ensure([], require => {
      done(null, require('./cont.Setting').default);
    });
  },
};
