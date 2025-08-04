const UserModel = require('../models/user.model');
const admin = require('firebase-admin');

const sendNotification = async (req, res) => {
    try {
        // Obtenemos los datos del cuerpo de la petición que enviará nuestro frontend
        const { userId, title, message } = req.body;

        // Validación básica
        if (!userId || !title || !message) {
            return res.status(400).json({
                error: 'Faltan datos obligatorios (userId, title, message).'
            });
        }

        // Buscamos al usuario en la base de datos para obtener su token FCM
        const user = await UserModel.getUserById(userId);

        if (!user || !user.fcm_token) {
            return res.status(404).json({
                error: 'Usuario no encontrado o no tiene un token para notificar.'
            });
        }

        // Preparamos el mensaje de la notificación
        const payload = {
            notification: {
                title: title,
                body: message
            },
            token: user.fcm_token
        };

        // Enviamos la notificación usando Firebase Admin SDK
        await admin.messaging().send(payload);

        // Respondemos al frontend con un mensaje de éxito
        return res.status(200).json({ 
            success: `Notificación enviada exitosamente al usuario ${user.name}.`
        });

    } catch (error) {
        console.error('Error al enviar la notificación:', error);
        return res.status(500).json({ 
            error: 'Ocurrió un error en el servidor al intentar enviar la notificación.' 
        });
    }
};

module.exports = {
    sendNotification
};