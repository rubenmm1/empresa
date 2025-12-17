import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // ❌ No hay header Authorization
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token no proporcionado"
    });
  }

  // Espera formato: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token mal formado"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos el usuario en la request
    req.usuario = decoded;

    next(); // ✅ continúa a la ruta
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado"
    });
  }
}
