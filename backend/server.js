
import 'dotenv/config';  // Carga automáticamente las variables del .env

import express from 'express';
import cors from 'cors';

// Importar rutas del sistema
import authRoutes from './routes/auth.routes.js';
import empleadosRoutes from './routes/empleados.routes.js';
import proyectosRoutes from './routes/proyectos.routes.js';


const app = express();
const PORT = process.env.PORT || 3001;

// ==========================================
// MIDDLEWARES DE LA APLICACIÓN
// ==========================================

// CORS - Configuración para desarrollo
// OPCIÓN 1: Autorización universal (SOLO PARA DESARROLLO)
app.use(cors({
  origin: '*', // Permite cualquier origen - útil durante desarrollo
  credentials: false // Deshabilitado para compatibilidad con origin: '*'
}));

// OPCIÓN 2: Configuración específica (RECOMENDADO PARA PRODUCCIÓN)
// Descomenta las siguientes líneas y comenta la configuración anterior para producción:
/*
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // URLs específicas del frontend
  credentials: true // Permite cookies y headers de autenticación
}));
*/

// NOTA 
// - origin: '*' permite cualquier dominio conectarse a tu API
// - Es cómodo para desarrollo pero INSEGURO para producción
// - En producción, especifica los dominios exactos que pueden acceder
// - credentials: true permite envío de cookies/tokens pero requiere origins específicos

// Parser de JSON
app.use(express.json());

// Middleware de logging para desarrollo
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ==========================================
// RUTAS DE LA API
// ==========================================

// Ruta de salud del servidor
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Servidor API Bazar funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/proyectos', proyectosRoutes);

// ==========================================
// MANEJO DE ERRORES
// ==========================================

// Ruta no encontrada - debe ir al final después de todas las otras rutas
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error del servidor:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {
  console.log('==========================================');
  console.log('🚀 SERVIDOR EMPRESA INICIADO');
  console.log('==========================================');
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log('==========================================');
});

export default app;
