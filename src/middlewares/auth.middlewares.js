const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET


const verificarJwt = (req, res, next) => {
    const token = req.header('Authorization');

    jwt.verify(token, jwtSecret, (err, decode) => {
        if (err) {
            return res.status(401).json({
                message: 'Token inválido',
                error: err
            });
        }
        req.usuario = decode.usuario;
        next();
    })
};

module.exports = {
    verificarJwt
}