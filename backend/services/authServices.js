import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { getUsers } from "../utils/helpers.js";
import nodemailer from "nodemailer";

dotenv.config();

async function registerService(body) {
    try {
      const usuarios = await getUsers();
  
      const { username, password, email, phone } = body;
  
      if (!username || !password || !email || !phone) {
        return { status: "Error", message: "Los campos están incompletos" };
      }
  
      const usuarioAResvisar = usuarios.find(user => user.username === username.toLowerCase());
      if (usuarioAResvisar) {
        return { status: "Error", message: "El nombre de usuario ya existe" };
      }
      const emailArevisar = usuarios.find(user => user.email === email.toLowerCase());
      if (emailArevisar) {
        return { status: "Error", message: "El email dell usuario ya esta en uso" };
      }
  
      const salt = await bcryptjs.genSalt();
      const hashPassword = await bcryptjs.hash(password, salt);
  
      const nuevoUsuario = {
        username: username.toLowerCase(),
        password: hashPassword,
        email: email.toLowerCase(),
        phone: phone
      };
  
      return { status: "ok", nuevoUsuario };
    } catch (error) {
      return { status: "Error", message: "Error en el registro del usuario", error: error.message };
    }
  }

  async function loginService(email, password) {
    try {
        const usuarios = await getUsers();
        const usuarioAResvisar = usuarios.find(user => user.email === email);
        if (!usuarioAResvisar) {
            return { status: "Error", message: "Usuario no encontrado" };
        }

        const match = await bcryptjs.compare(password, usuarioAResvisar.password);
        if (!match) {
            return { status: "Error", message: "Contraseña incorrecta" };
        }

        // Generar el token JWT
        const maxAge = 3 * 60 * 60; // 3 horas en segundos
        const token = jsonwebtoken.sign(
            { 
                id: usuarioAResvisar.id,
                username: usuarioAResvisar.username,
                verificado: usuarioAResvisar.verificado,
                email: usuarioAResvisar.email
            },
            process.env.JWT_SECRET,
            { expiresIn: maxAge }
        );

        return {
            status: "ok",
            message: "Inicio de sesión exitoso",
            token,
            user: {
                id: usuarioAResvisar.id,
                username: usuarioAResvisar.username,
                email: usuarioAResvisar.email,
                phone: usuarioAResvisar.phone,
                verificado: usuarioAResvisar.verificado
            }
        };
    } catch (error) {
        return { status: "Error", message: "Error en el inicio de sesión" };
    }
}

async function adminLoginService(username, password) {
  try {
      const adminUsername = process.env.ADMIN_USER;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (username !== adminUsername || password !== adminPassword) {
          return { status: "Error", message: "Credenciales de administrador incorrectas" };
      }

      const maxAge = 1 * 60 * 60; // 1 horas en segundos
      const token = jsonwebtoken.sign(
          { 
              username,
              role: 'admin'
          },
          process.env.JWT_SECRET2,
          { expiresIn: maxAge }
      );

      return {
          status: "ok",
          message: "Inicio de sesión de administrador exitoso",
          token,
          admin: {
              username
          }
      };
  } catch (error) {
      return { status: "Error", message: "Error en el inicio de sesión de administrador" };
  }
}
  

export {
    registerService,
    loginService,
    adminLoginService
  }