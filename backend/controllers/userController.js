import dotenv from "dotenv";
import { pool } from "../config/connection.js";
import { getUserByIdService } from "../services/userService.js";


dotenv.config();

async function getUserData(req, res) {
  try {
    const { status, user, message } = await getUserByIdService(req);
    if (status === "Error") {
      return res.status(400).send({ status, message });
    }
    return res.status(200).send({ status, message,user });
   
  } catch (error) {
    return res.status(500).send({ status: "Error", message: "Error al crear el evento", error: error.message });
  }
}

export const userMethods =  {
    getUserData,
    }