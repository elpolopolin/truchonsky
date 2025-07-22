import { Router } from "express";
import { pagosMethods } from "../controllers/PagosController.js";
import mercadopago from "mercadopago";
import dotenv from "dotenv";
import { verificarTokenJWT } from '../midlewares/auth.js';
import { verificarStockMiddleware } from "../midlewares/stockMd.js";

dotenv.config();

// Configurar el token de acceso de MercadoPago
mercadopago.configurations.setAccessToken(process.env.MERCADOPAGOTOKEN);

const router = Router();

router.post('/create_preference',verificarTokenJWT,verificarStockMiddleware, pagosMethods.createPreference); //agregar midleware de verificar stock, no comenzar proceso de pago para recibir notificaciones si no hay stock de los productso

router.get('/failure', (req, res) => {
    res.send("failure");
});

router.use('/notificar', pagosMethods.handleNotification);

router.get("/verComprasUser", verificarTokenJWT,pagosMethods.VercomprasDesdeUsuario)

router.get("/verCompra/:compraId", verificarTokenJWT,pagosMethods.verCompra)

router.get('/success', (req, res) => {
    const {
        collection_id,
        collection_status,
        payment_id,
        status,
        external_reference,
        payment_type,
        merchant_order_id,
        preference_id,
        site_id,
        processing_mode,
        merchant_account_id
    } = req.query;

    let externalReferenceData;
    try {
        externalReferenceData = JSON.parse(external_reference);
    } catch (error) {
        console.error('Error parsing external_reference:', error);
        externalReferenceData = {};
    }
    const successMessage = `
        <h1>Estado de la compra: ${status}</h1>
        <p>ID de colección: ${collection_id}</p>
        <p>Estado de colección: ${collection_status}</p>
        <p>ID de pago: ${payment_id}</p>
        <p>Tipo de pago: ${payment_type}</p>
        <p>ID de orden del comerciante: ${merchant_order_id}</p>
        <p>ID de preferencia: ${preference_id}</p>
        <p>ID de sitio: ${site_id}</p>
        <p>Modo de procesamiento: ${processing_mode}</p>
        <p>ID de cuenta de comerciante: ${merchant_account_id}</p>
        <h2>Datos de la compra:</h2>
        <p>Productos comprados: ${externalReferenceData.productos}</p>
        <p>Cantidades: ${externalReferenceData.cantidades}</p>
        <p>ID del comprador: ${externalReferenceData.idComprador}</p>
    `;

    res.send(successMessage);
});
export default router;