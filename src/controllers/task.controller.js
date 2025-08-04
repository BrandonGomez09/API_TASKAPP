const Task = require('../models/task.model');

const create = async (req, res) => {
    // 1. Log para saber si entramos a la función
    console.log('--- INTENTO DE CREAR TAREA ---');

    try {
        // 2. Log para ver el cuerpo y el archivo que llegan
        console.log('DATOS RECIBIDOS (body):', req.body);
        console.log('ARCHIVO RECIBIDO (file):', req.file);

        const { name, description, id_user } = req.body;
        const file = req.file;

        if (!name || !description || !id_user) {
            console.error('!!! ERROR: Faltan datos obligatorios.');
            return res.status(400).json({
                message: "Faltan datos obligatorios (name, description, id_user)"
            });
        }

        // 3. Log para ver la URL que estamos construyendo
        const imageUrl = file ? `${process.env.BASE_URL}/uploads/${file.filename}` : null;
        console.log('URL de imagen construida:', imageUrl);

        const task = new Task({
            name,
            description,
            id_user,
            imageUrl
        });

        const resultado = await task.createtask();
        const data = { ...task, idtasks: resultado };

        console.log('--- TAREA CREADA CON ÉXITO ---');
        return res.status(201).json({
            message: "Tarea creada exitosamente",
            data: data
        });

    } catch (error) {
        // 4. Log para capturar cualquier error dentro del 'try'
        console.error('!!! ERROR EN EL BLOQUE CATCH DEL CONTROLADOR !!!');
        console.error(error); // Imprimimos el objeto de error completo
        return res.status(500).json({
            message: "Error en el servidor al crear la tarea",
            error: error.message
        });
    }
};

// ... (El resto de funciones se quedan igual)

const getTaskById = async (req, res) => {
    try {
        const { id_user } = req.params;
        const tasks = await Task.getTask(id_user);
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al obtener las tareas",
            error: error.message
        });
    }
};

const getTastAll = async (req, res) => {
    try {
        const tasks = await Task.getAll();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al obtener todas las tareas",
            error: error.message
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const { idtasks } = req.params;
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const result = await Task.updateTask(idtasks, name, description);
        return res.status(200).json({ message: "Tarea actualizada exitosamente", result });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar tarea", error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { idtasks } = req.params;
        const result = await Task.deleteTask(idtasks);
        return res.status(200).json({ message: "Tarea eliminada correctamente", result });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar tarea", error: error.message });
    }
};

module.exports = {
    create,
    getTaskById,
    getTastAll,
    updateTask,
    deleteTask
};