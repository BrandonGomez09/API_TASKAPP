require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(express.json());

// LÍNEA AÑADIDA: Servir archivos estáticos desde la carpeta 'uploads'
// Esto hace que cualquier archivo dentro de la carpeta 'uploads' sea accesible
// a través de una URL como http://tu_ip:puerto/uploads/nombre_del_archivo.jpg
app.use('/uploads', express.static('uploads'));

const loginRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const taskRoutes = require('./src/routes/task.route');

app.use('/auth', loginRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Crear usuario funciona