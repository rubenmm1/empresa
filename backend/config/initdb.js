import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function initDB() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      multipleStatements: true,
    });

    console.log("✅ Conectado a MySQL");

    await connection.query(`
      CREATE DATABASE IF NOT EXISTS empresa
      CHARACTER SET utf8mb4
      COLLATE utf8mb4_general_ci;
    `);

    await connection.query(`USE empresa;`);

    console.log("📦 Base de datos 'empresa' lista");

    const sql = `
    SET FOREIGN_KEY_CHECKS = 0;

    DROP TABLE IF EXISTS empleado_proyecto;
    DROP TABLE IF EXISTS empleados;
    DROP TABLE IF EXISTS proyectos;
    DROP TABLE IF EXISTS jefes;

    SET FOREIGN_KEY_CHECKS = 1;

    CREATE TABLE jefes (
      id INT NOT NULL AUTO_INCREMENT COMMENT 'id del jefe',
      nombre VARCHAR(150) NOT NULL,
      nif VARCHAR(150) NOT NULL,
      telefono VARCHAR(9) NOT NULL,
      especialidad VARCHAR(150) NOT NULL,
      password VARCHAR(150) NOT NULL,
      email VARCHAR(150) NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY uni_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE empleados (
      id_empleado INT NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(150) NOT NULL,
      nif VARCHAR(10) NOT NULL,
      cargo VARCHAR(150),
      telefono VARCHAR(10),
      id_jefe INT NOT NULL,
      PRIMARY KEY (id_empleado),
      CONSTRAINT fk_jefe FOREIGN KEY (id_jefe)
        REFERENCES jefes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE proyectos (
      id_proyecto INT NOT NULL AUTO_INCREMENT,
      nombre VARCHAR(150) NOT NULL,
      fecha_inicio DATE DEFAULT CURDATE(),
      tematica VARCHAR(150),
      id_jefe INT,
      PRIMARY KEY (id_proyecto),
      CONSTRAINT proyectos_ibfk_1 FOREIGN KEY (id_jefe)
        REFERENCES jefes(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE empleado_proyecto (
      id_empleado INT NOT NULL,
      id_proyecto INT NOT NULL,
      CONSTRAINT fk_emple_pro FOREIGN KEY (id_empleado)
        REFERENCES empleados(id_empleado)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_pro_emp FOREIGN KEY (id_proyecto)
        REFERENCES proyectos(id_proyecto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

    await connection.query(sql);

    console.log("✅ Tablas creadas correctamente");

    console.log("🎉 Base de datos inicializada con éxito");
  } catch (error) {
    console.error("❌ Error inicializando la base de datos:", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("🔌 Conexión cerrada");
    }
  }
}

initDB();
