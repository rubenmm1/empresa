import { Router } from "express";
import * as proyectosController from "../controllers/proyectos.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verificarToken, proyectosController.listar);
router.post("/", verificarToken, proyectosController.crear);
router.put("/:id", verificarToken, proyectosController.actualizar);
router.delete("/:id", verificarToken, proyectosController.eliminar);

export default router;
