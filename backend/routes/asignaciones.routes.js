import { Router } from 'express';
import * as asignacionesController from '../controllers/asignaciones.controller.js';
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verificarToken, asignacionesController.listarAsignaciones);
router.post("/", verificarToken, asignacionesController.crearAsignacion);
router.delete(
  "/:id_proyecto/:id_empleado",
  verificarToken,
  asignacionesController.eliminarAsignacion
);

export default router;
