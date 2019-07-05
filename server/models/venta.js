const db = require('../database/index');

const selectAll = (req, response) => {
    db.query('SELECT * from venta', (err,res) => {
        if (err.error)
            return console.log(err.error);
        console.log(res)
        response.status(200).json(res)
    })
}

const selectAllDetVenta = (req, response) => {
    db.query('SELECT * from detalle_venta WHERE fk_venta=($1)', [req.params.fk_venta], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('Devolviendo:', res)
        response.status(200).json(res);
    })
}

const insertVenta = (req, response) => {
    //if (req.body.nombre) {
    db.query('INSERT INTO venta(monto_total,fecha,fk_clientenatural,fk_clientejuridico) VALUES(($1),($2),($3),($4)) returning clave,monto_total,fecha,fk_clientenatural,fk_clientejuridico', [req.body.monto_total, req.body.fecha, req.body.fk_clientenatural, req.body.fk_clientejuridico], (err, res) => {
            if (err.error)
                return console.log(err.error);
            response.status(200).json(res)
        })
    //}
}

const insertDetVenta = (req, response) => {
    //if (req.body.nombre) {
        db.query('INSERT INTO detalle_venta(cantidad,costo_ind,fk_inventario,fk_venta,fk_minpre) VALUES(($1),($2),($3),($4),($5))', [req.body.cantidad, req.body.costo_ind, req.body.fk_inventario, req.body.fk_venta, req.body.fk_minpre], (err, res) => {
            if (err.error)
                return console.log(err.error);
            response.status(200).json(res)
        })
    //}
}

const insertTPTransferencia = (req, response) => {
    //if (req.body.nombre) {
    db.query('INSERT INTO tipopagotransferencia(numero,num_cuenta) VALUES(($1),($2)) returning clave,numero,num_cuenta', [req.body.numero, req.body.num_cuenta], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

const insertTPCheque = (req, response) => {
    //if (req.body.nombre) {
    db.query('INSERT INTO tipopagocheque(numero,numero_cuenta) VALUES(($1),($2)) returning clave,numero,numero_cuenta', [req.body.numero, req.body.numero_cuenta], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

const insertTPTDebito = (req, response) => {
    //if (req.body.nombre) {
    db.query('INSERT INTO tipopagotarjetadebito(numero,tipo) VALUES(($1),($2)) returning clave,numero,tipo', [req.body.numero, req.body.tipo], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

const insertTPTCredito = (req, response) => {
    //if (req.body.nombre) {
    db.query('INSERT INTO tipopagotarjetacredito(numero,codigo,fecha_vencimiento) VALUES(($1),($2),($3)) returning clave,numero,codigo,fecha_vencimiento', [req.body.numero, req.body.codigo, req.body.fecha_vencimiento], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

const insertTPVenta= (req, response) => {
    //if (req.body.nombre) {
    db.query('INSERT INTO tipopago_venta(fecha,monto,fk_transferencia,fk_credito,fk_cheque,fk_debito,fk_venta) VALUES(($1),($2),($3),($4),($5),($6),($7))', [req.body.fecha, req.body.monto, req.body.fk_transferencia, req.body.fk_credito, req.body.fk_cheque, req.body.fk_debito, req.body.fk_venta], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

const insertVentaStatus = (req, response) => {
    //if (req.body.nombre) {
    db.query('INSERT INTO venta_status(fecha,fk_venta,fk_status) VALUES(($1),($2),($3))', [req.body.fecha, req.body.fk_venta, req.body.fk_status], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

const selectVentaStatus = (req, response) => {
    db.query('SELECT * from venta_status WHERE fk_venta=($1)', [req.params.fk_venta], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('Devolviendo:', res)
        response.status(200).json(res);
    })
}

const selectVentaP = (req, response) => {
    db.query('SELECT * from venta WHERE clave=($1)', [req.params.fk_venta], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('Devolviendo:', res)
        response.status(200).json(res);
    })
}

const updateVentaStatus = (req, response) => {
    //if (req.body.nombre) {
    db.query('UPDATEs venta_status SET fk_status=($1) WHERE fk_venta=($2)', [req.body.fk_status, req.body.fk_venta], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

module.exports = {
    selectAll,
    selectAllDetVenta,
    insertVenta,
    insertDetVenta,
    insertTPTransferencia,
    insertTPCheque,
    insertTPTCredito,
    insertTPTDebito,
    insertTPVenta,
    insertVentaStatus,
    selectVentaStatus,
    selectVentaP,
    updateVentaStatus,
}

