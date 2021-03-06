const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    AngularCompilerPlugin
} = require('@ngtools/webpack');
const webpack = require('webpack');

const projectPath = path.resolve('.').split(path.sep + '.meteor')[0];

const clientConfig = {
    entry: './client/index.ts',
    devtool: 'nosources-source-map',
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [{
                "test": /\.html$/,
                "loader": "raw-loader"
            },
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            }
        ]
    },
    plugins: [
        new AngularCompilerPlugin({
            tsConfigPath: path.join(projectPath, './tsconfig.json'),
            mainPath: path.join(projectPath, './client/index.ts'),
            entryModule: path.join(projectPath, './client/app/app.module#AppModule'),
            sourceMap: true,
            skipCodeGeneration: process.env.NODE_ENV !== 'production'
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html'
        }),
        new webpack.ProgressPlugin()
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js'
    }
};
const serverConfig = {
    entry: './server/index.ts',
    target: 'node',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new webpack.ProgressPlugin()
    ],
    output: {
        filename: 'bundle.js'
    }
}
module.exports = [clientConfig, serverConfig];