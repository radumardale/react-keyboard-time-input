const env = require('babel-preset-env').buildPreset;
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
