import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default {
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
