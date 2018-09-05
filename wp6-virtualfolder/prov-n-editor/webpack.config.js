var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'editor.bundle.js'
    },
    plugins:[
        new CopyWebpackPlugin([
            { from: 'index2.html', to:'index.html' },
            'prov-n-worker.js',
            'worker-base.js',
            'vendor/ace-builds/**',
            'vendor/ace-worker/**',
            'vendor/antlr4/**',
            'parser/*.js',
            'parser/*.tokens',
            'parser/*.g4',
            'parser/*.interp',
            'require.js'
            ]),
    ]

};
