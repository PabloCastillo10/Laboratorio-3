import { UserSchema } from "./login.model.js";
import { hash, verify } from "argon2";
import { generarJWT } from "../helpers/generate-jwt-.js";


    export const login = async (req, res) => {
        const { email, password, username } = req.body;

        try {
            const lowerEmail = email ? email.toLowerCase() : null;    
            const lowerUsername = username ? username.toLowerCase() : null;

            const user = await UserSchema.findOne({ $or: [{ email: lowerEmail }, { username: lowerUsername }] });

            if (!user) {
                return res.status(404).json({ message: "No existe el correo o username  en la base de datos" });
            }


            const validPassword = await verify(user.password, password);

            if (!validPassword) {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }

            const token = await generarJWT(user.id);

            return res.status(200).json({
                message: "Login exitoso",
                userDetails: {
                    username: user.username,
                    token
                }
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }