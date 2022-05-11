const path = require("path");

var SRC = path.resolve(__dirname, "src")

var moduleConfig = {
    rules: [    
      {
        test: /\.js[x]?$/,
        resolve: { extensions: [".js", ".jsx"] },
        include: [SRC],
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
  modules: [SRC, "node_modules"]
};

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src", "index.jsx")    
  },
  output: {        
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js",
    library: {
      name: "VolcanoPlot",
      type: "umd"
    }
  },
  module: moduleConfig,
  resolve: resolveConfig,
  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    d3: "d3"
  }  
};