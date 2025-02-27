import { Schema, model } from "mongoose";


export const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'ADMIN_ROLE'
    }
},
{
    timestamps: true,
    versionKey: false
}
)

export const User = model('User', UserSchema);

