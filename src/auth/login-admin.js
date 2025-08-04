const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;

const loginAdmin = async (req, res) => {
     try {
        const { name, password } = req.body;

        const user = await Usuario.getUsername(name)

        if (!user) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos",
            });
        }

        const contraseñaValida = await bcrypt.compare(password, user[0].password);

        if (!contraseñaValida) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos",
            });
        }
        
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        
        return res.status(200).json({
            status: "success",
            message: "Autenticación exitosa",
            id: user[0].id,
            token: token
        });

     } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor a crear el administrador",
            error: error.message
        })
     }
}

module.exports = {
    loginAdmin
}

