import { Router } from "express";
import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import { getAllCategorias, getAllProducts, getAllProductsAndData } from "../utils/helpers.js";
import { verificarAdmin } from "../midlewares/auth.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router()

router.get("/", (req,res)=> res.render(__dirname + "/pages/home.ejs"));
router.get("/login", (req,res)=> res.render(__dirname + "/pages/login.ejs"));
router.get("/admin/home", verificarAdmin, (req,res)=> res.render(__dirname + "/pages/adminHome.ejs"));
router.get("/admin/nuevoproducto", verificarAdmin, async (req, res) => {
    try {
        const categorias = await getAllCategorias();
        res.render(__dirname + "/pages/añadirProducto.ejs", { categorias  });
    } catch (error) {
        res.status(500).send("Error interno del servidor al obtener categorias");
    }
});

router.get("/admin/productos", verificarAdmin, async (req, res) => { 
    try {
        const categorias = await getAllCategorias();
        const allproducts = await getAllProductsAndData();
        res.render(__dirname + "/pages/productos.ejs", { allproducts,categorias });
    } catch (error) {
        res.status(500).send("Error interno del servidor al obtener productos");
    }
});
router.get("/admin/tablaproductos", verificarAdmin, async (req, res) => { 
    try {
        const allproducts = await getAllProducts();
        res.render(__dirname + "/pages/tablaproductos.ejs", { allproducts });
    } catch (error) {
        res.status(500).send("Error interno del servidor al obtener productos");
    }
});



export default router;