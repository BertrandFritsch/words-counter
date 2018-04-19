declare module 'fork-ts-checker-webpack-plugin' {

  import { Plugin } from 'webpack';

  interface Constructable {
    new (options: {}): Plugin;
  }

  const ForkTsCheckerWebpackPlugin: Constructable;
  export = ForkTsCheckerWebpackPlugin;
}
