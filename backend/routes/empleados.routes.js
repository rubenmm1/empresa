import { Router } from "express";
import * as empleadosController from "../controllers/empleados.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verificarToken, empleadosController.listar);
router.post("/", verificarToken, empleadosController.crear);
router.put("/:id", verificarToken, empleadosController.actualizar);
router.delete("/:id", verificarToken, empleadosController.eliminar);

export default router;
