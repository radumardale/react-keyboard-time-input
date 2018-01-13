const env = require('babel-preset-env').buildPreset;
// process.env.BABEL_ENV === 'commonjs' ? 'commonjs' : false
console.log(' -> ', process.env.BABEL_ENV === 'commonjs' ? 'commonjs' : false);
module.exports = {
  presets: [
    [
      'es2015',
      {
        loose: true,
        modules: process.env.BABEL_ENV === 'commonjs' ? 'commonjs' : false
      }
    ]
  ]
};
