// en src/models/task.model.js

const db = require('../configs/db.config');

class Task { // Cambiado el nombre de la clase a Task para mayor claridad
    constructor({idtasks, name, description, id_user, imageUrl}) { // <-- AÑADIDO imageUrl
        this.idtasks = idtasks;
        this.name = name;
        this.description = description;
        this.id_user = id_user;
        this.imageUrl = imageUrl; // <-- AÑADIDO imageUrl
    }

    async createtask() {
        const connection = await db.createConnection();

        // <-- MODIFICADA LA CONSULTA SQL
        const sql = "INSERT INTO tasks (name, description, id_user, imageUrl) VALUES (?, ?, ?, ?)";
        const [result] = await connection.execute(sql,
            [this.name, this.description, this.id_user, this.imageUrl] // <-- AÑADIDO this.imageUrl
        );

        connection.end();

        if (result.insertId === 0) {
            throw new Error('Error creando la tarea');
        }

        this.idtasks = result.insertId; // Corregido a idtasks para consistencia

        return this.idtasks;
    }

    static async getTask(id_user) {
        const connection = await db.createConnection();

        // <-- AÑADIDO imageUrl a la consulta
        const [result] = await connection.execute("SELECT idtasks, name, description, imageUrl FROM tasks WHERE id_user = ?",
            [id_user]
        );

        connection.end();

        return result;
    }

    static async getAll() {
        const connection = await db.createConnection();

        // <-- AÑADIDO imageUrl a la consulta
        const [result] = await connection.execute("SELECT idtasks, name, description, imageUrl FROM tasks");

        connection.end();

        if (result.length === 0) {
            // Modificado para no lanzar error si no hay tareas, sino devolver un array vacío
            return [];
        }
        return result;
    }

    static async updateTask(idtasks, name, description) {
        const connection = await db.createConnection();
        const [result] = await connection.execute(
            "UPDATE tasks SET name = ?, description = ? WHERE idtasks = ?",
            [name, description, idtasks]
        );
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error("No se encontró la tarea para actualizar");
        }
        return result;
    }

    static async deleteTask(idtasks) {
        const connection = await db.createConnection();
        const [result] = await connection.execute(
            "DELETE FROM tasks WHERE idtasks = ?",
            [idtasks]
        );
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error("No se encontró la tarea para eliminar");
        }
        return result;
    }
}

module.exports = Task; // Exportamos la clase Task