import HtmlWebPackPlugin from 'html-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import {DefinePlugin} from 'webpack';
import PrettierPlugin from 'prettier-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const API_URL = '';
const UI_URL = '';

// Note that env var changes will require a restart of any dev server instances.
const envVars = {
  API_URL: JSON.stringify(API_URL),
  UI_URL: JSON.stringify(UI_URL)
};

const config = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          emitError: true,
          quiet: true,
          failOnError: true
        }
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        exclude: [/\.(js|jsx|mjs|css|scss|html|json|woff|woff2|eot|ttf|otf)$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  output: {
    filename: '[name].[contenthash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true
  }
};

module.exports = (env, argv) => {

  if (!argv.env || argv.env !== 'profiler') {
    console.log('ENVIRONMENT VARIABLES: ', envVars);
    console.log('MODE: ', argv.mode);
  }

  const preconnect = argv.mode === 'development'
    ? `http://${API_URL}`
    : `https://${API_URL}`;

  config.plugins = [
    new HtmlWebPackPlugin({template: './public/index.html', filename: './index.html', favicon: './public/favicon.ico', preconnect: preconnect}),
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['dist']}),
    new PrettierPlugin({
      extensions: ['.scss', '.json']
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets'
      }
    ])
  ];

  if (argv.mode === 'none') {
    config.plugins = [
      ...config.plugins,
      new DefinePlugin({
        'process.env': {
          ...envVars,
          TESTING_ENV: 1
        }
      })
    ];
  } else if (argv.mode === 'development') {
    config.output.crossOriginLoading = 'anonymous';
    config.devtool = 'cheap-module-source-map';
    config.plugins = [
      ...config.plugins,
      new DefinePlugin({
        'process.env': {
          ...envVars,
          DEV_ENV: 1
        }
      })
    ];
  } else {
    config.plugins = [
      ...config.plugins,
      new DefinePlugin({
        'process.env': {
          ...envVars
        }
      })
    ];
    config.devtool = 'source-map';
  }

  return config;
};
