const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rotaProducts = require('./routes/products');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//CORS
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

//Define Rotas
app.use('/products', rotaProducts);


//Rota Não Encontrada
app.use( (req, res, next) => {
    const erro = new Error('Not Found');
    erro.status = 404;
    next(erro);
});


//Tratativa Erros
app.use( (error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            message: error.message
        }
    });
});


module.exports = app;