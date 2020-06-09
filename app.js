const express = require('express');
const app = express();
const morgan = require('morgan');
const rotaProducts = require('./routes/products');

app.use(morgan('dev'));
app.use('/products', rotaProducts);

app.use( (req, res, next) => {
    const erro = new Error('Not Found');
    erro.status = 404;
    next(erro);
});

app.use( (error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            message: error.message
        }
    });
});


module.exports = app;