const path = require("path");

var buildDir = path.resolve(__dirname, "build");

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
  modules: [path.resolve(__dirname, "src"), "node_modules"]
};

module.exports = {
  entry: {
    index: "./src/index.jsx",
  },
  output: {
    path: buildDir,
    filename: "[name].js"
  },
  module: moduleConfig,
  resolve: resolveConfig,
  externals: {
    react: "react",
    reactDOM: "react-dom",
    d3: "d3"
  }
};