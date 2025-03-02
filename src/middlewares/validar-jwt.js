import jwt from 'jsonwebtoken'
import AdminModel from '../Admin/Admin.model.js'

export const validarUserJWT = async (req, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(400).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await AdminModel.findById(uid);

        if (!user) {
            return res.status(400).json({
                msg: 'Token del Usuario no existe en la base de datos'
            });
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: 'Token no válido - Usuarios con estado: false'
            });
        }
        
        req.user = user;
        
        next();
    
    } catch (e) {
        console.log(e);
        res.status(400).json({
            msg: "Token no válido"
        });
    }
};