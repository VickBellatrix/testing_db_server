const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const app = express();
const port = 3000;
const path = require('path');

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_test_server',
});

// Connection with the database
connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("¡Conexión exitosa!")
    }
});

// Configuración de la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));


// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');

app.use(express.static(__dirname)); // Para servir archivos estáticos como script.js

// Ruta para acceder a los datos y renderizar la vista
app.get('/datos', (req, res) => {
    const sql = 'SELECT * FROM inventario';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        res.render('index', { connectionDetails: connection.config, data: results });
    });
});

// 
app.get('/datos-json', (req, res) => {
    const sql = 'SELECT * FROM inventario';
    connection.query(sql, (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            res.json(results);
        }
    });
});

// Start the server using your private ip or localhost
app.listen(port, function () {
    console.log(`Servidor escuchando en http://10.20.7.200:${port}/datos`);
});


