const path = require("path");

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var moduleConfig = {
    rules: [    
      {
        test: /\.js[x]?$/,
        resolve: { extensions: [".js", ".jsx"] },
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]  
          }
        }
      }
    ]
  };

var resolveConfig = {
  extensions: [".js", ".jsx", ".json"],
  modules: [path.resolve(__dirname,"src"), "node_modules"]
};

module.exports = {
  entry: {
    index: path.resolve(__dirname,"src", "index.jsx"),
    bundle: path.resolve(__dirname, "index.jsx")
  },
  output: {
    path:  path.resolve(__dirname, "build"),
    filename: "[name].js",
    library: {
      name: "VolcanoPlot",
      type: "umd"
    }
  },
  module: moduleConfig,
  resolve: resolveConfig,
  externals: {
    react: "react",
    d3: "d3"
  }  
};