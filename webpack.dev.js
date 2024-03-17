const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        biblioteca: './src/biblioteca.js',
        calculadora: './src/calculadora.js',
        detallesProducto: './src/detallesProducto.js',
        firebase: './src/firebase.js',
        loadNavFooter: './src/loadNavFooter.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: '[name].js'
    },
    watch: true //Igual que nodemon. Hace que los archivos se recompilen al guardarse los cambios
};