import dotenv from "dotenv";
import { getAllProducts, searchProductsInDatabase, crearProductoEnBaseDeDatos, EliminarProductoEnBaseDeDatos, generarYGuardarStock, venderProducto,getProductById } from "../utils/helpers.js";
import { response } from "express";

dotenv.config();

async function getAProducts() {
    try {
      const products = await getAllProducts();
      //console.log(products);
      if (products) {
        return { status: "ok", message: "Productos Encontrados Exitosamente", AllProducts: products };
      } else {
        return { status: "Error", message: "Productos No Encontrados" };
      }
    } catch (error) {
      return { status: "Error", message: "Error al encontrar productos", error: error.message };
    }
  }
  async function buscarproductobyidservice(idProducto) {
    try {
      const producto = await getProductById(idProducto);
      //console.log(products);
      if (producto) {
        return { status: "ok", message: "Productos Encontrados Exitosamente", producto: producto };
      } else {
        return { status: "Error", message: "Producto No Encontrados" };
      }
    } catch (error) {
      return { status: "Error", message: "Error al encontrar producto", error: error.message };
    }
  }

  async function searchProducts(filters) {
    try {
      const products = await searchProductsInDatabase(filters);
      if (products.length > 0) {
        return { status: "ok", message: "Productos encontrados exitosamente", products };
      } else {
        return { status: "Error", message: "Productos no encontrados" };
      }
    } catch (error) {
      return { status: "Error", message: "Error al buscar productos", error: error.message };
    }
  }

  async function crearProductoService(producto) {
    try {
        const nuevoProductoId = await crearProductoEnBaseDeDatos(producto);

        if (nuevoProductoId) {
            return {
                status: "ok",
                message: "Producto creado exitosamente",
                product: { ...producto, id: nuevoProductoId }
            };
        } else {
            return { status: "Error", message: "Error al crear el producto" };
        }
    } catch (error) {
        return { status: "Error", message: "Error al crear el producto", error: error.message };
    }
    }

    async function agregarStockService(productoId, cantidad) {
        try {
            const resultado = await generarYGuardarStock(productoId, cantidad);
            if (resultado) {
                return { status: "ok", message: "Stock agregado exitosamente" };
            } else {
                return { status: "Error", message: "Error al agregar el stock del producto" };
            }
        } catch (error) {
            return { status: "Error", message: "Error al agregar el stock del producto", error: error.message };
        }
    }
    
    async function deleteProductoService(productoId){
      try {
        const resultado = await EliminarProductoEnBaseDeDatos(productoId);
        if (resultado) {
            return { status: "ok", message: "Producto eliminado exitosamente" };
        } else {
            return { status: "Error", message: "Error al eliminar producto",productoId };
        }
    } catch (error) {
        return { status: "Error", message: "Error al eliminar producto", error: error.message };
    }
    }

    async function venderProductoService(idProducto, cantidad, idComprador) {
      try {
          await venderProducto(idProducto, cantidad,idComprador);
          return { status: "Success", message: "Venta realizada con éxito" };
      } catch (error) {
          return { status: "Error", message: error.message };
      }
  }

export {
    getAProducts,
    searchProducts,
    crearProductoService,
    agregarStockService,
    deleteProductoService,
    venderProductoService,
    buscarproductobyidservice
} 