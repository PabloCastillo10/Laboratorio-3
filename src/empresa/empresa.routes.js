import { Router } from "express";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { createEmpresa, getEmpresaTrayectoria, getEmpresaCategoria, getEmpresaAZ, getEmpresaZA, getEmpresas, updatrEmpresa, generarReporte } from "./empresa.controller.js";
import { validarUserJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post('/crear', deleteFileOnError, validarUserJWT, createEmpresa)

router.get('/trayectoria/:aniosTrayectoria', getEmpresaTrayectoria)

router.get('/categorias/:categoria', getEmpresaCategoria)

router.get('/az', getEmpresaAZ)

router.get('/za', getEmpresaZA)

router.get('/', getEmpresas)

router.put('/actualizar/:id', deleteFileOnError, validarUserJWT, updatrEmpresa)

router.get('/reporte', generarReporte)

export const empresaRoutes = router;
