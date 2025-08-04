// En el archivo: src/controllers/notification.controller.js

const UserModel = require('../models/user.model');
const admin = require('firebase-admin');

// --- TU FUNCIÓN ORIGINAL PARA ENVÍOS INDIVIDUALES (NO SE TOCA) ---
const sendNotification = async (req, res) => {
    // ... (el código de esta función no cambia)
};

// =======================================================
//          FUNCIÓN PARA ENVÍO MASIVO CORREGIDA
// =======================================================
const sendNotificationToTopic = async (req, res) => {
    try {
        const { title, message } = req.body;
        const topic = 'avisos_generales';

        if (!title || !message) {
            return res.status(400).json({
                error: 'Faltan datos obligatorios (title, message).'
            });
        }

        const payload = {
            notification: {
                title: title,
                body: message
            }
        };

        // ========================================================================
        //                  ESTA ES LA LÍNEA QUE SE HA CORREGIDO
        //  En lugar de sendToTopic, usamos send() y le pasamos un objeto que
        //  especifica el tópico y la notificación.
        // ========================================================================
        const response = await admin.messaging().send({
            topic: topic,
            notification: payload.notification
        });

        console.log('Notificación enviada exitosamente al tópico:', response);

        // La respuesta de send() es directamente el messageId.
        return res.status(200).json({
            success: `Notificación enviada al tópico '${topic}'.`,
            messageId: response
        });

    } catch (error) {
        console.error('Error al enviar notificación al tópico:', error);
        return res.status(500).json({
            error: 'Ocurrió un error en el servidor al enviar la notificación al tópico.'
        });
    }
};

module.exports = {
    sendNotification,
    sendNotificationToTopic
};