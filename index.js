const fs = require('fs');

const nombreCarpeta = 'prueba';

fs.mkdir(nombreCarpeta, (error) => {
  if (error) {
    console.error(`Error al crear la carpeta: ${error}`);
    return;
  }
  console.log(`Carpeta "${nombreCarpeta}" creada exitosamente.`);
});
