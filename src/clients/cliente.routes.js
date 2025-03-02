import { Router } from "express";
import { deleteFileOnError} from "../middlewares/delete-file-on-error.js";
import { createCliente, getCliente, getClienteById, updateCliente, deleteCliente} from "./cliente.controller.js";
import { validarUserJWT } from "../middlewares/validar-jwt.js";


const router = Router();

router.post('/', validarUserJWT, deleteFileOnError, createCliente)

router.get('/', getCliente)

router.get('/:id', getClienteById)

router.put('/:id', validarUserJWT, deleteFileOnError, updateCliente)

router.delete('/:id', validarUserJWT, deleteCliente)

export const clienteRoutes = router; 
