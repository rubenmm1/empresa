import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { verificarToken } from "../middlewares/auth.middleware.js";
 
const router = Router();
 
/**
 * ==========================================
 * 🔐 RUTAS DE AUTENTICACIÓN
 * ==========================================
 */
 
// Registrar usuario
router.post('/register', authController.register);
 
// Login usuario
router.post('/login', authController.login);


router.get('/me', verificarToken, authController.me);
 
export default router;