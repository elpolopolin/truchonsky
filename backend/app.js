import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import { methods } from './controllers/authController.js';
import { eventosMethods } from './controllers/eventoController.js';
import { userMethods } from './controllers/userController.js';
import { ProductMethods } from './controllers/ProductosController.js';
import { verificarAdmin, verificarTokenJWT } from './midlewares/auth.js';
import adminroutes from "./routes/admin-routes.js"
import cookieParser from 'cookie-parser';
import {fileURLToPath} from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import paymentroutes from "./routes/payment-routes.js"


dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

app.post("/api/register",methods.register);
app.post("/api/login",methods.login);
app.post("/verifyOTP", methods.verifyOTP );
app.post("/resendOTP", methods.resendOTPVerificationCode);
app.post("/api/crearEvento", verificarTokenJWT, eventosMethods.añadirEvento);
app.get("/api/verified", verificarTokenJWT, (req, res) => {
  return res.status(200).json({ id: req.user.id, verificado: true });
});
app.get("/api/userData", verificarTokenJWT, userMethods.getUserData);
//products
app.get("/api/getProducts", ProductMethods.getProducts);
app.get("/api/productSearch", ProductMethods.ProductSearch);
app.get("/api/getProduct/:id", ProductMethods.getProductbyid);
//api admin
app.post("/api/loginAdmin", methods.adminLogin);
app.post("/api/admin", verificarAdmin, (req, res) => {
  res.send('Acción de administrador ejecutada');
});
app.post("/api/admin/crearProducto", verificarAdmin, ProductMethods.crearProducto);
app.post("/api/admin/agregarStockProducto", verificarAdmin, ProductMethods.agregarStockProducto);
app.post("/api/admin/deleteProduct", verificarAdmin, ProductMethods.deleteProducto);
app.post("/api/admin/verderProducto",verificarAdmin, ProductMethods.venderProducto);
//admin routes 
app.use(adminroutes);
//paymen routes
app.use(paymentroutes);


app.listen(PORT, () => {
  console.log('API running on port', PORT);
});