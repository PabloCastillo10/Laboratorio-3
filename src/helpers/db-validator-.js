import { UserSchema } from "../login/login.model.js";


export const existenteEmailUser = async (email = ' ') => {

    const existeEmail = await UserSchema.findOne({ email });

    if (existeEmail) {
        throw new Error(`El email ${ email } ya existe en la base de datos`);
    }
}

export const existeUserById = async (id = '') => {
    
    const existeUser = await UserSchema.findById(id);

    if (!existeUser) {
        throw new Error(`El ID ${ id } no existe en la base de datos`);
    }
}
