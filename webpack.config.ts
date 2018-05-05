import * as path from 'path';
import * as webpack from 'webpack';
import * as WebpackNotifierPlugin from 'webpack-notifier';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

interface Env {
  NODE_ENV: 'development' | 'production';
  PUBLIC_PATH?: 'string';
}

export default (env: Env) => {
  const productionEnv = env.NODE_ENV === 'production';
  const developmentEnv = !productionEnv;
  const title = 'words-counterer';
  const publicPath = env.PUBLIC_PATH || '/';

  let config: webpack.Configuration = {};

  config.entry = [];
  config.plugins = [];

  if (developmentEnv) {
    // add development-specific properties
    config = {
      ...config,
      plugins: [
        ...config.plugins,
        new WebpackNotifierPlugin({ alwaysNotify: true, title }),

        new ForkTsCheckerWebpackPlugin(
          {
            tslint: false,
            watch: [ './src' ]
          }
        )
      ],

      devtool: 'cheap-module-eval-source-map'
    };
  }

  // add common properties
  return {
    ...config,

    entry: { lib: './src/index.ts', lambda: './src/lambdaIndex.ts' },

    output: {
      path: path.join(__dirname, '/dist/'),
      filename: '[name].js',
      library: 'wordsCounter',
      libraryTarget: 'umd',

      // avoid having window defined as the global object
      // because it prevents the library used by node
      // see https://github.com/webpack/webpack/issues/6522
      globalObject: "typeof self !== 'undefined' ? self : this"
    },

    resolve: {
      // resolvable extensions.
      extensions: [ '.ts', '.js' ]
    },

    module: {
      rules: [
        // All files with a '.ts' extension will be handled by 'ts-loader'.
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true
              }
            }
          ],
          exclude: /node_modules/
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          use: 'source-map-loader',
          exclude: [ /node_modules/, /dist/, /__test__/ ]
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|pdf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                hash: 'sha512',
                digest: 'hex',
                publicPath: path.join(publicPath, 'assets/'),
                outputPath: 'assets/',
                name: '[name]-[hash].[ext]'
              }
            }
          ]
        }
      ]
    }
  };
};
