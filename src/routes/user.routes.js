const express = require('express');
const router = express.Router();
const adminController = require('../controllers/user.controller');

// Ruta para crear un usuario (la que ya tenías)
router.post('/', adminController.create);

// --- RUTA AÑADIDA ---
// Ruta para actualizar el token FCM de un usuario.
// Usará el método PUT. Ejemplo: PUT /user/12/fcm-token
router.put('/:id/fcm-token', adminController.updateFcmToken);

module.exports = router;    