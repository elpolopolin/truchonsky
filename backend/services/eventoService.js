import dotenv from "dotenv";
import { getAllEventos, capitalizeTitle } from "../utils/helpers.js";

dotenv.config();

async function añadirEventoService(req) {
  try {
    const { nombre, fecha, precio, cantParticipantes, direccion, descripcion, privacidad, portada, imagen2, idCategoria } = req.body;
    console.log("ID ORGANIZADOR:" + req.user.id);

    if (nombre.length > 120) {
      return { status: "Error", message: "El nombre debe tener menos de 120 caracteres" };
    }

    if (direccion.length > 150) {
      return { status: "Error", message: "La dirección debe tener menos de 150 caracteres" };
    }

    if (descripcion && descripcion.length > 400) {
      return { status: "Error", message: "La descripción debe tener menos de 400 caracteres" };
    }
    const eventos = await getAllEventos();
    const eventoArevisar = eventos.find(evento => evento.nombre.toLowerCase() === nombre.toLowerCase());
    if (eventoArevisar) {
      return { status: "Error", message: "El nombre del evento ya existe" };
    }

    const privacidadFinal = privacidad !== null ? privacidad : false;
    //console.log(privacidadFinal)

    if (!nombre || !fecha || !cantParticipantes || !direccion || !portada) {
      return { status: "Error", message: "Los campos están incompletos" };
    }

    const nuevoEvento = { nombre:capitalizeTitle(nombre), fecha:fecha, precio:precio, cantParticipantes:cantParticipantes, direccion:direccion, descripcion:descripcion, privacidad:privacidadFinal, portada:portada, imagen2:imagen2, idCategoria:idCategoria, idOrganizador: req.user.id}
    //console.log("evento:", nuevoEvento)
    return { status: "ok", message: "Evento creado exitosamente", nuevoEvento: nuevoEvento };
  } catch (error) {
    return { status: "Error", message: "Error al crear el evento", error: error.message };
  }
}
async function deleteEvento() { 

}

export {
    añadirEventoService,
    deleteEvento
} 