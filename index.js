const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Crear la conexion a la BD
const db = require('./config/db');

// Importar el modelo
require('./models/Proyectos');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

// Crear una app de express
const app = express();

// Cargar los archivos estaticos
app.use(express.static('./public'));

// Agregar PUG
app.set('view engine', 'pug');

// Agregar las carpetas de las vistas
app.set('views', path.join(__dirname, '/views'));

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

app.listen(3001, () => {
    console.log('Servidor corriendo sobre puerto 3001');
});