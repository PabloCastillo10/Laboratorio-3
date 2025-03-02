'use strict';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {dbConnection} from './mongo.js';
import { login } from '../src/Admin/Admin.controller.js';
import { createAdmin } from '../src/Admin/Admin.controller.js';
import {clienteRoutes} from '../src/clients/cliente.routes.js'
const configurarMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
}
const configurarRutas = (app) => {
    app.use('/laboratorio3/login', login);
    app.use('/laboratorio3/clientes', clienteRoutes);
   
}
 const conectarDB = async  () => {
    try{
        await dbConnection();
        console.log("Conexión a la base de datos exitosa");
        await createAdmin(); 
    }catch(error){
        console.error('Error conectando a la base de datos', error);
        process.exit(1);
    }
}
export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 8000;
    await conectarDB();
    configurarMiddlewares(app);
    configurarRutas(app);
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}