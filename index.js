// En el archivo: index.js

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const admin = require('firebase-admin');
const path = require('path'); 
const app = express();
const PORT = process.env.PORT;

// Inicialización de Firebase (esto se queda igual)
const serviceAccount = require('./firebase-service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log('✅ Firebase Admin SDK inicializado correctamente.');

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/uploads', express.static('uploads'));

// Rutas de la API (esto se queda igual)
const loginRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const taskRoutes = require('./src/routes/task.route');
const notificationRoutes = require('./src/routes/notification.route');

app.use('/auth', loginRoutes);
app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/notification', notificationRoutes);

// =======================================================
//   AÑADIMOS LA RUTA PARA SERVIR NUESTRO PANEL DE ADMIN
// =======================================================
// Cuando alguien acceda a la ruta raíz (ej: http://localhost:3000/),
// le enviaremos el archivo admin-panel.html.
app.get('/', (req, res) => {
    // Usamos path.join para crear una ruta al archivo de forma segura,
    // sin importar el sistema operativo. __dirname es la ubicación actual.
    res.sendFile(path.join(__dirname, 'admin-panel.html'));
});



app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    // Añadimos un mensaje útil para saber a dónde acceder
    console.log(`🔑 Panel de Administración disponible en: http://localhost:${PORT}`);
});