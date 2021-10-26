const nodeExternals = require('webpack-node-externals');

module.exports = {
    optimization: { minimize: false },
    target: 'node',
    externals: [nodeExternals()],
    node: {
      __dirname: false,
    },
    module: {
      rules: [
        {
          test: /\.ejs$/i,
          use: 'raw-loader',
        }
      ],
    }
  };