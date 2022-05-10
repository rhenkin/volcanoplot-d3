var path = require("path");

module.exports = {
    context: __dirname,
    mode: "development",
    devtool: "inline-source-map",
    entry: "./demo.js",
    output: {
        path: __dirname,
        filename: "demo.build.js",
        publicPath: ""
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"]  
                }
              }
            }]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "/")
        }
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    }
}
