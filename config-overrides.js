const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    stream: require.resolve('stream-browserify'),
    https: require.resolve('https-browserify'),
    querystring: require.resolve('querystring-es3'),
    assert: require.resolve('assert/'),
    http: require.resolve('stream-http'),
    url: require.resolve('url/'),
  };
  return config;
};
