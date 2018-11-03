const debug = process.env.NODE_ENV !== 'production'
const dotenv = require('dotenv');
const path = require('path')
const webpack = require('webpack')

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  console.log(envKeys);

  return {
    devtool: debug ? 'inline-sourcemap' : null,
    entry: ['./src/js/client.js'],

    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: '/(node_modules|bower_components)/',
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['react', 'env', 'stage-0'],
                plugins: [
                  'react-html-attrs',
                  'transform-class-properties',
                  'transform-decorators-legacy'
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'build.js'
    }
  }
}
