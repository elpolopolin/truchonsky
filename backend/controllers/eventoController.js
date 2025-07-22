import dotenv from "dotenv";
import { pool } from "../config/connection.js";
import { añadirEventoService } from "../services/eventoService.js";


dotenv.config();

async function añadirEvento(req, res) {
  try {
    const { status, nuevoEvento, message } = await añadirEventoService(req);
    if (status === "Error") {
      return res.status(400).send({ status, message });
    }
    const { nombre, fecha, precio, cantParticipantes, direccion, descripcion, privacidad, portada, imagen2, idCategoria, idOrganizador } = nuevoEvento;

    const insertQuery = `INSERT INTO eventos (nombre, fecha, precio, cantParticipantes, direccion, descripcion, privacidad, portada, imagen2, idCategoria, idOrganizador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nombre, fecha, precio, cantParticipantes, direccion, descripcion, privacidad, portada, imagen2, idCategoria, idOrganizador];

    pool.query(insertQuery, values, function (err, result) {
      if (err) {
        return res.status(500).send({ status: "Error", message: "Error al agregar el nuevo evento", error: err.message });
      } else {
        return res.status(201).send({ status: "ok", message: `Evento: ${nombre} agregado`, redirect: "/" });
      }
    });
  } catch (error) {
    return res.status(500).send({ status: "Error", message: "Error al crear el evento", error: error.message });
  }
}


export const eventosMethods =  {
    añadirEvento
    }