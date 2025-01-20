const path = require("path");
//const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/main.js"),
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
        clean: true,
    },

    mode: "production",
    /*    devServer: {
          //historyApiFallback: true,
          //contentBase: path.resolve(__dirname, './dist'),
          //open: true,
          //compress: true,
          //hot: true,
          //port: 8080,
          port: 9000,
          hot: true,
          static: {
              directory: path.join(__dirname, './dist'),
          },
      }, */
    plugins: [
        // ...
        // применять изменения только при горячей перезагрузке
        //new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            /*title: "Прогноз погоды",
                  meta: {
                      viewport: 'width=device-width, initial-scale=1.0'
                  },*/
            template: "src/index.html",
        }),
    ],
};