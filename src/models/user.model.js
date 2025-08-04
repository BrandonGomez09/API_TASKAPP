const db = require('../configs/db.config');

class Usuario {
    constructor({id, name, password, fcm_token}) { // Se añade fcm_token al constructor
        this.id = id;
        this.name = name;
        this.password = password;
        this.fcm_token = fcm_token; // Se añade esta propiedad
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
        const connection = await db.createConnection();
        const [result] = await connection.execute("DELETE FROM user WHERE id =?", [id]);
        connection.end();
        if (result.affectedRows === 0) {
            throw new Error('No se encontró el usuario');
        }
        return;
    }

    static async getUsername(name) {
        const connection = await db.createConnection();
        const [result] = await connection.execute("SELECT id, password FROM user WHERE name = ?", 
            [name]
        );
        connection.end();
        if (result.length === 0) {
            // Se cambia el error para que sea más específico
            throw new Error('Usuario no encontrado'); 
        }
        return result;
    }

    // --- FUNCIÓN AÑADIDA ---
    // Esta función actualiza la columna fcm_token para un usuario específico.
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