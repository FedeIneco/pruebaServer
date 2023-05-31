const express = require("express");
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3010;

const carpetaBase = './';

// Función para obtener el listado de carpetas
function obtenerListadoCarpetas(callback) {
  fs.readdir(carpetaBase, (error, carpetas) => {
    if (error) {
      console.error(`Error al obtener el listado de carpetas: ${error}`);
      callback([]);
      return;
    }
    callback(carpetas);
  });
}

// Ruta al archivo del script que deseas ejecutar
const scriptPath = 'index.js';

// Endpoint para crear una carpeta
app.get('/crear-carpeta', (req, res) => {
  const nombreCarpeta = `carpeta_${Date.now()}`;

  fs.mkdir(`${carpetaBase}/${nombreCarpeta}`, (error) => {
    if (error) {
      console.error(`Error al crear la carpeta: ${error}`);
      res.send('Error al crear la carpeta');
      return;
    }
    console.log(`Carpeta "${nombreCarpeta}" creada exitosamente.`);
    obtenerListadoCarpetas((carpetas) => {
      res.send(`Carpeta "${nombreCarpeta}" creada exitosamente. Listado de carpetas: ${carpetas.join(', ')}`);
    });
  });
});

// Endpoint para obtener el listado de carpetas
app.get('/listado-carpetas', (req, res) => {
  obtenerListadoCarpetas((carpetas) => {
    res.send(`Listado de carpetas: ${carpetas.join(', ')}`);
  });
});

// Servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));
