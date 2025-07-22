import mercadopago from 'mercadopago';
import { venderProducto, getProductById,getComprasDeUser,getCompra } from '../utils/helpers.js';
import dotenv from "dotenv";
import { getProcessedPayment,markPaymentProcessed,logError } from '../utils/paymentTracker.js';
import { sendPurchaseEmail } from '../utils/emailUtils.js';

dotenv.config();

mercadopago.configurations.setAccessToken(process.env.MERCADOPAGOTOKEN);

async function handleNotification(req, res) {
  console.log("Notificar");
  try {
    const { id, topic } = req.query;
    console.log(topic, "id:", id);

    if (topic === 'payment') {
      const alreadyProcessed = await getProcessedPayment(id);  // Verificar si ya se procesó este ID de pago antes
      if (alreadyProcessed) {
        console.log(`Payment ${id} already processed. Skipping...`);
        return res.sendStatus(200);
      }

      const payment = await mercadopago.payment.findById(id);
      const paymentData = payment.body;
      console.log("paymentdata id", paymentData);

      if (paymentData.status === 'approved') {
        let external_reference;

        try {
          external_reference = JSON.parse(paymentData.external_reference);
        } catch (e) {
          throw new Error('Invalid external reference format');
        }

        const { productos, cantidades, idComprador, emailComprador } = external_reference || {};

        if (!productos || !cantidades || !idComprador) {
          throw new Error('Missing data in external reference');
        }
       
        for (let i = 0; i < productos.length; i++) {
          try {
             await venderProducto(productos[i], cantidades[i], idComprador, paymentData.id);
          } catch (error) {
            throw error; 
          }
        }

        

        // Preparar los detalles de la compra
        const purchaseDetails = {
          productos: paymentData.additional_info.items,
          cantidades,
          totalAmount: paymentData.transaction_details.total_paid_amount,
          purchaseId: paymentData.id
        };

        // Marcar el pago como procesado después de vender todos los productos
        await markPaymentProcessed(id, idComprador, purchaseDetails.totalAmount);
        // Enviar correo electrónico al usuario con los detalles de la compra
        await sendPurchaseEmail(emailComprador, purchaseDetails);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling notification from Mercado Pago:", error);
    res.status(500).send("Error handling notification from Mercado Pago");
  }
}


async function createPreference(req, res) {
  try {
    const { cartData } = req.body;
    const { id: idComprador } = req.user; // obtener el id del usuario logeado y autenticado
    const { email: emailComprador } = req.user;

    const items = await Promise.all(cartData.map(async ({ id, count }) => {
      const product = await getProductById(id);
      return {
        id: product[0].id,
        title: product[0].nombre,
        quantity: Number(count),
        currency_id: 'ARS',
        unit_price: Number(product[0].precio), 
      };
    }));
    
    const externalReference = JSON.stringify({
      productos: cartData.map(item => item.id),
      cantidades: cartData.map(item => item.count),
      idComprador: idComprador,
      emailComprador: emailComprador
    });
    console.log(externalReference);

    const preference = {
      items: items,
      external_reference: externalReference,
      back_urls: {
        success: "https://skilled-obviously-earwig.ngrok-free.app/success",
        failure: "https://skilled-obviously-earwig.ngrok-free.app/failure",
        pending: "https://skilled-obviously-earwig.ngrok-free.app/pending"
      },
      notification_url: "https://skilled-obviously-earwig.ngrok-free.app/notificar",
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function VercomprasDesdeUsuario(req, res) {
  try {
    const { id: idComprador } = req.user; 
    const response = await getComprasDeUser(idComprador);
    res.json({ comprasUser: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function verCompra(req, res) {
 
  try {
   
    const { id: idComprador } = req.user; 
    const { compraId } = req.params; 
    console.log("user",req.user.id,"abrio la vista de compra ",compraId)
    const compra = await getCompra(idComprador, compraId);
    if (!compra) {
      return res.status(403).json({ error: `Usuario no tiene acceso a la compra ${compraId}` });
    }
    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const pagosMethods = {
  createPreference,
  handleNotification,
  VercomprasDesdeUsuario,
  verCompra
};