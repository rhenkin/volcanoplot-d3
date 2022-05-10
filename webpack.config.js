const path = require("path");

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
  modules: ["node_modules"],
  alias: {
    components: path.resolve(__dirname, 'src/components')
  }
};

module.exports = {
  entry: {
    index: path.resolve(__dirname,"src", "index.jsx")
  },
  output: {
    path:  path.resolve(__dirname, "build"),
    filename: "[name].js",
    library: "VolcanoPlot"
  },
  module: moduleConfig,
  resolve: resolveConfig,
  externals: {
    react: "react",
    reactDOM: "react-dom",
    d3: "d3"
  }
};