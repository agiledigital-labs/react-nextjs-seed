const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const fp = require('lodash/fp');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = fp.compose(withTypescript, withSass)({
    distDir: './dist/.next',
    webpack: (config, { dev }) => {
    config.resolve.modules = [
    path.resolve('./node_modules'),
    path.resolve()
]

if (dev) {
    // linting on hot-reload in dev mode
    config.module.rules.push({
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        options: {
            configFile: 'tslint.json',
            tsConfigFile: 'tsconfig.json'
        }
    });
}

config.module.rules.push({
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    loader: 'file-loader',
    options: {
        name: '[path][name].[ext]'
    }
});

return config;
},
publicRuntimeConfig: {
    SERVER_URL: 'https://Project.location.com.au',   //ToDo #@Change-this
        API_VERSION: 'api/v1'
}
});
