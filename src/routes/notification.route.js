// En el archivo: src/routes/notification.route.js

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

// Ruta existente para enviar a un solo usuario
router.post('/send', notificationController.sendNotification);

router.post('/send-to-all', notificationController.sendNotificationToTopic);


module.exports = router;