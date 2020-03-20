const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/Server/image', to: 'Server/image'},
            {from: 'src/Server/public', to: 'Server/public'},
            {from: 'src/config.json', to: 'config.json'}
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    }
};