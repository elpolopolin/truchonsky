import dotenv from "dotenv";
dotenv.config();
import { consultarStock } from "../utils/helpers.js";

const verificarStockMiddleware = async (req, res, next) => {
    const { cartData } = req.body;
  
    if (!cartData || !Array.isArray(cartData)) {
      return res.status(400).json({ error: 'Formato de datos de carrito incorrecto' });
    }
  
    const productosSinStock = [];
  
    try {
      for (const item of cartData) {
        const { id, count } = item;
        try {
          await consultarStock(id, count);
        } catch (error) {
          productosSinStock.push({ id, error: error.message });
        }
      }
  
      if (productosSinStock.length > 0) {
        return res.status(400).json({
          error: 'No hay suficiente stock para uno o más productos',
          productosSinStock,
        });
      }
  
      next();
    } catch (error) {
      console.error('Error al verificar el stock:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  export {
    verificarStockMiddleware
  };