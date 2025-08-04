// En el archivo: src/models/user.model.js

const db = require('../configs/db.config');

class Usuario {
    constructor({id, name, password, fcm_token}) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.fcm_token = fcm_token;
    }

    async createUsuario() {
        const connection = await db.createConnection();
        const [result] = await connection.execute("INSERT INTO user (name, password) VALUES (?, ?)",
            [this.name, this.password]
        );
        connection.end();
        if (result.insertId === 0) {
            throw new Error('Error creando el usuario');
        }
        this.id = result.insertId;
        return this.id;
    }

    static async deleteUsuario(id) {
        // ... (esta función está bien, no se toca)
    }

    static async getUsername(name) {
        const connection = await db.createConnection();
        // Esta consulta es para el login, está bien que solo pida el password.
        const [result] = await connection.execute("SELECT id, password, fcm_token, name FROM user WHERE name = ?", 
            [name]
        );
        connection.end();
        if (result.length === 0) {
            throw new Error('Usuario no encontrado'); 
        }
        return result;
    }

    // =======================================================
    //          FUNCIÓN NUEVA Y ESENCIAL AÑADIDA
    // =======================================================
    /**
     * Busca un usuario por su ID y devuelve sus datos, incluyendo el fcm_token.
     * @param {number} id - El ID del usuario a buscar.
     * @returns {Promise<Array>} - Un array con el objeto del usuario.
     */
    static async getUserById(id) {
        const connection = await db.createConnection();
        // Esta consulta busca por ID y trae el token, ¡justo lo que necesitamos!
        const [result] = await connection.execute("SELECT id, name, fcm_token FROM user WHERE id = ?", 
            [id]
        );
        connection.end();
        return result; // No lanzamos error si está vacío, el controlador lo manejará.
    }
    // =======================================================

    static async updateFcmToken(id, fcmToken) {
        const connection = await db.createConnection();
        const [result] = await connection.execute(
            "UPDATE user SET fcm_token = ? WHERE id = ?",
            [fcmToken, id]
        );
        connection.end();
        if (result.affectedRows === 0) {
            throw new Error('No se encontró el usuario para actualizar el token');
        }
        return result;
    }
}

module.exports = Usuario;