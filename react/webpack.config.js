const path = require('path');


module.exports = {
    entry:'./src/index.js',
    output: {
    filename: 'index-bundled.js',
    path: path.resolve(__dirname, 'static/js'),
    },

    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
            },
            {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
             }
        ]
    }
};