import dotenv from "dotenv";
import { pool } from "../config/connection.js";
import { getAProducts, searchProducts, crearProductoService, agregarStockService, deleteProductoService, venderProductoService, buscarproductobyidservice } from "../services/ProductsService.js";


dotenv.config();

async function getProducts(req, res) {
    try {
      const { status, AllProducts, message } = await getAProducts();
      if (status === "Error") {
        return res.status(400).send({ status, message });
      } else {
        return res.status(200).send({ status, message, AllProducts });
      }
    } catch (error) {
      return res.status(500).send({ status: "Error", message: "Error al crear el evento", error: error.message });
    }
  }
  async function ProductSearch(req, res) {
    try {
      const { nombre, precio, categoria } = req.query;
      const filters = {};
      if (nombre) filters.nombre = nombre;
      if (precio) filters.precio = precio;
      if (categoria) filters.categoria = categoria;
      
      const { status, message, products } = await searchProducts(filters);
      if (status === "Error") {
        return res.status(400).send({ status, message });
      } else {
        return res.status(200).send({ status, message, products });
      }
    } catch (error) {
      return res.status(500).send({ status: "Error", message: "Error al buscar productos", error: error.message });
    }
  }

    async function crearProducto(req, res) {
        try {
            const { nombre, descripcion, imagen, precio, categoria } = req.body;
            const producto = { nombre, descripcion, imagen, precio, categoria };
            const { status, message, product } = await crearProductoService(producto);
            if (status === "Error") {
                return res.status(400).send({ status, message });
            } else {
                return res.status(200).send({ status, message, product });
            }
        } catch (error) {
            return res.status(500).send({ status: "Error", message: "Error al crear el producto", error: error.message });
        }
    }
    async function agregarStockProducto(req, res) {
        try {
            const { productoId, cantidad } = req.body;
            const { status, message } = await agregarStockService(productoId, cantidad);
            if (status === "Error") {
                return res.status(400).send({ status, message });
            } else {
                return res.status(200).send({ status, message });
            }
        } catch (error) {
            return res.status(500).send({ status: "Error", message: "Error al agregar el stock del producto", error: error.message });
        }
    }
    async function deleteProducto(req, res) {
      try {
          const { productoId } = req.body;
          const { status, message } = await deleteProductoService(productoId);
          if (status === "Error") {
              return res.status(400).send({ status, message });
          } else {
              return res.status(200).send({ status, message });
          }
      } catch (error) {
          return res.status(500).send({ status: "Error", message: "Error al eliminar producto", error: error.message });
      }
  }
  async function venderProducto(req, res) {
    try {
        const { idProducto, cantidad,idComprador } = req.body;
        const { status, message } = await venderProductoService(idProducto, cantidad,idComprador);
        if (status === "Error") {
            return res.status(400).send({ status, message });
        } else {
            return res.status(200).send({ status, message });
        }
    } catch (error) {
        return res.status(500).send({ status: "Error", message: "Error al realizar la venta", error: error.message });
    }
}
async function getProductbyid(req,res) {
  try { 
    const { id } = req.params;
   // console.log(id)
    const { status, message, producto } = await buscarproductobyidservice(id);
    if (status === "Error") {
      return res.status(400).send({ status, message });
    } else {
      return res.status(201).send({ status, producto });
     }
  } catch (error) {
    return res.status(500).send({ status: "Error", message: "Error al encontrar producto", error: error.message });
  }
}


    

export const ProductMethods =  {
    getProducts,
    ProductSearch,
    crearProducto,
    agregarStockProducto,
    deleteProducto,
    venderProducto,
    getProductbyid
    }