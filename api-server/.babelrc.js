module.exports = {
  plugins: [
    require.resolve('babel-plugin-transform-function-bind'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-proposal-optional-chaining')
  ],
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          node: '10'
        }
      }
    ]
  ]
};
