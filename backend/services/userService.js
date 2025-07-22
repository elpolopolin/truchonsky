import dotenv from "dotenv";
import { getUserById } from "../utils/helpers.js";
import { response } from "express";

dotenv.config();

async function getUserByIdService(req) {
    try {
    console.log
    const id = req.user.id;
    //console.log("ID a buscar :" + req.user.id);
    if (id){ 
        const usuario = await getUserById(id);
        if (usuario){
            return { status: "ok", message: "Usuario Encontrado Exitosamente", user: usuario }; 
        }else{
            return { status: "Error", message: "Usuario No Encontrado" }; 
        }
       
    }
    } catch (error) {
    return { status: "Error", message: "Error al crear el evento", error: error.message };
  }

}


export {
    getUserByIdService,
} 