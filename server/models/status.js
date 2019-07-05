const db = require('../database/index');

const selectStatus = (req, response) => {
    db.query('SELECT * from status', (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log(res)
        response.status(200).json(res)
    })
}

const selectVentasPendientes = (req, response) => {
    db.query('SELECT * from venta_status WHERE fk_status=1', (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('Devolviendo:', res)
        response.status(200).json(res);
    })
}

const selectComprasPendientes = (req, response) => {
    db.query('SELECT * from compra_status WHERE fk_status=1', (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('Devolviendo:', res)
        response.status(200).json(res);
    })
}

module.exports = {
    selectStatus,
    selectVentasPendientes,
    selectComprasPendientes,
}

