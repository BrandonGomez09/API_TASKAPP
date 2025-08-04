// en src/middlewares/upload.middleware.js

const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento en disco
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Le decimos que guarde los archivos en la carpeta 'uploads' que creamos
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Creamos un nombre de archivo único para evitar que se sobreescriban
        // Será: fecha_actual_en_milisegundos + extensión_original (ej. 1678886400000.jpg)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;