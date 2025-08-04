// en src/routes/task.route.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const upload = require('../middlewares/upload.middleware'); // <-- IMPORTAMOS multer

// Aplicamos el middleware 'upload.single('image')' SOLO a la ruta POST.
// 'image' es el nombre del campo que la app Android debe usar para enviar el archivo.
router.post('/', upload.single('image'), taskController.create);

// Las otras rutas se quedan como están
router.get('/', taskController.getTastAll);
router.get('/:id_user', taskController.getTaskById);
router.put('/:idtasks', taskController.updateTask);
router.delete('/:idtasks', taskController.deleteTask);

module.exports = router;