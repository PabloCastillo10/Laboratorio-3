import { Router } from "express";
import {deleteFileOnError} from "../middlewares/delete-file-on-error.js"
import {login} from "./Admin.controller.js"
const router = Router();


router.post('/login', deleteFileOnError, login)

export default router;