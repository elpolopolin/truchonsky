import { pool } from '../config/connection.js';

async function getProcessedPayment(payment_id) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM pagos_procesados WHERE payment_id = ?', [payment_id], function (err, rows) {
            if (err) {
                console.error('Error al buscar el pago procesado:', err);
                reject(err);
            } else {
                console.log("rows", rows);
                resolve(rows.length > 0); // Devuelve true si hay filas, false si no
            }
        });
    });
}

async function markPaymentProcessed(payment_id, idComprador,totalAmount) {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO pagos_procesados (payment_id, idComprador,totalCompra) VALUES (?, ?,?)', [payment_id, idComprador,totalAmount], function (err, result) {
            if (err) {
                console.error('Error al marcar el pago como procesado:', err);
                reject(err);
            } else {
                console.log('Pago marcado como procesado:', result.insertId);
                resolve(result.insertId);
            }
        });
    });
}

async function logError(message) {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO errores_notificaciones (error_message) VALUES (?)', [message], function (err, result) {
            if (err) {
                console.error('Error al registrar el error:', err);
                reject(err);
            } else {
                console.log('Error registrado en la base de datos:', result.insertId);
                resolve(result.insertId);
            }
        });
    });
}

export { getProcessedPayment, markPaymentProcessed, logError };