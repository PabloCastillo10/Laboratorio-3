import  Admin from './Admin.model.js'
import { hash, verify } from "argon2";
import { generarJWT } from "../helpers/generate-jwt-.js";


    export const login = async (req, res) => {
        const { email, password, username } = req.body;

        try {
            const lowerEmail = email ? email.toLowerCase() : null;    
            const lowerUsername = username ? username.toLowerCase() : null;

            const user = await Admin.findOne({ $or: [{ email: lowerEmail }, { username: lowerUsername }] });

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


    export const createAdmin = async (req, res) => {
        try {
            
            const verifyUser = await Admin.findOne({ username: "Esantos" });
    
            if (!verifyUser) {
                const encryptedPassword = await hash("12345678", 10); 
    
                const adminUser = new Admin({
                    name: "Elmer",
                    surname: "Santos",
                    username: "Esantos", 
                    email: "esantos@gmail.com",
                    password: encryptedPassword,
                    role: "ADMIN_ROLE"
                });
    
                await adminUser.save();
                console.log(" Elmer Santos creado con éxito");
            } else { 
                console.log(" Elmer Santos ya existe en la base de datos");
            }
        } catch (error) {
            console.error(" Error al crear el usuario ADMIN: ", error);
        }
    };