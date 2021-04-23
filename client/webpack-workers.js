const { writeFileSync } = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env = {}) => {
  const __DEV__ = env.production !== true;
  const staticPath = path.join(__dirname, './static/js');
  const configPath = path.join(__dirname, '../config/client');
  return {
    mode: __DEV__ ? 'development' : 'production',
    entry: {
      'frame-runner': './src/client/frame-runner.js',
      'sass-compile': './src/client/workers/sass-compile.js',
      'test-evaluator': './src/client/workers/test-evaluator.js'
    },
    devtool: __DEV__ ? 'inline-source-map' : 'source-map',
    output: {
      publicPath: '/js/',
      filename: chunkData => {
        // construct and output the filename here, so the client can use the
        // json to find the file.
        const filename = `${chunkData.chunk.name}.${chunkData.chunk.contentHash.javascript}`;
        writeFileSync(
          path.join(configPath, `${chunkData.chunk.name}.json`),
          `{"filename": "${filename}"}`
        );
        return filename + '.js';
      },
      chunkFilename: '[name].[contenthash].js',
      path: staticPath
    },
    stats: {
      // Display bailout reasons
      optimizationBailout: true
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [path.join(__dirname, 'src/client/')],
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  { modules: false, targets: '> 0.25%, not dead' }
                ]
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import'
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'node_modules/sass.js/dist/sass.sync.js' }
      ]),
      new webpack.ProvidePlugin({
        process: 'process/browser'
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      })
    ],
    resolve: {
      fallback: {
        buffer: require.resolve('buffer'),
        util: false,
        stream: false,
        process: require.resolve('process/browser')
      }
    }
  };
};
