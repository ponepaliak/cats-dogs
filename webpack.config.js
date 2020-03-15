const path = require('path');

module.exports = {
    entry: './src/Server/Server.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    target : 'node',
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    }
};