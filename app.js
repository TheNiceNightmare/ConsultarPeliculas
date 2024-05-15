//Importaciones
const express = require('express');
const bodyParser = require('body-parser');
const {v4: uuiv4} = require('uuid');

const peliculasRoutes = require('./routes/peliculas-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/peliculas', peliculasRoutes);

//Manejo de errores
app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message : error.message || 'Error desconocido'
    });

});


app.listen(3000);