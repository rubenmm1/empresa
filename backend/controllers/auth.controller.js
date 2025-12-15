import * as jefesModel from '../models/jefes.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function login(req, res) {
  try {
    const { email, password } = req.body;
   
    console.log('🔑 Intentando login:', email);
   
    // Buscar usuario
    const usuario = await jefesModel.buscarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Email o password incorrectos'
      });
    }
   
    // Verificar password
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({
        success: false,
        message: 'Email o password incorrectos'
      });
    }
   
    // Generar token
    const token = jwt.sign(
      { cliente_id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
   
    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
   
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}



export async function register(req, res) {
  try {
    const { nombre, email, nif, telefono, especialidad, password } = req.body;
    
    console.log('📝 Registrando usuario:', email);
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await jefesModel.buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }
    
    // Encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear usuario
    const nuevoUsuario = await jefesModel.crearJefe({
      nombre,
      email,
      nif, 
      telefono,
      especialidad,
      password: hashedPassword
    });
    
    // Generar token
    const token = jwt.sign(
      { cliente_id: nuevoUsuario.insertId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: nuevoUsuario.insertId,
        nombre,
        email,
        nif, 
        telefono,
        especialidad
      }
    });
    
  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}

