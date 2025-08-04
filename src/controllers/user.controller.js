const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRPYT);

const create = async(req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                message: "Faltan datos obligatorios",
                error: "Campos requeridos: name, password"
            });
        }

        const usuario = new Usuario({
            name,
            password: bcrypt.hashSync(password, saltosBcrypt),
        });

        const resultado = await usuario.createUsuario();

        return res.status(201).json({
            message: "Usuario creado exitosamente",
            id: resultado, // Devolvemos el id del usuario creado
            name: usuario.name
        });

    } catch (error) {
        // Manejo de error si el usuario ya existe (basado en el código de error de MySQL)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: "Error al crear el usuario",
                error: "El nombre de usuario ya está en uso."
            });
        }
        return res.status(500).json({
            message: "Error en el servidor al crear el usuario",
            error: error.message
        });
    }
};

// --- FUNCIÓN AÑADIDA ---
// Esta función maneja la petición PUT para actualizar el token.
const updateFcmToken = async(req, res) => {
    try {
        const { id } = req.params; // Obtenemos el id de la URL
        const { fcm_token } = req.body; // Obtenemos el token del cuerpo JSON

        if (!fcm_token) {
            return res.status(400).json({
                message: "Falta el fcm_token en el cuerpo de la petición"
            });
        }

        // Llamamos a la función del modelo que actualiza en la BD
        await Usuario.updateFcmToken(id, fcm_token);

        return res.status(200).json({
            message: "Token FCM actualizado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al actualizar el token",
            error: error.message
        });
    }
};

// --- EXPORTACIÓN ACTUALIZADA ---
module.exports = {
    create,
    updateFcmToken // Exportamos la nueva función
};