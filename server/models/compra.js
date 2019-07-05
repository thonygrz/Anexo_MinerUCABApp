const db = require('../database/index');

const selectAll = (req, response) => {
    db.query('SELECT * from compra', (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log(res)
        response.status(200).json(res)
    })
}

const selectAllDetCompra = (req, response) => {
    db.query('SELECT * from detalle_compra WHERE fk_compra=($1)', [req.params.fk_compra], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('Devolviendo:', res)
        response.status(200).json(res);
    })
}

const insertCompra = (req, response) => {
    //if (req.body.nombre) {
    db.query('INSERT INTO compra(monto_total,fecha,fk_aliado) VALUES(($1),($2),($3)) returning clave,monto_total,fecha,fk_aliado', [req.body.monto_total, req.body.fecha, req.body.fk_aliado], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

const insertDetCompra = (req, response) => {
    //if (req.body.nombre) {
    db.query('INSERT INTO detalle_compra(cantidad,costo_ind,fk_inventario,fk_compra,fk_alimin) VALUES(($1),($2),($3),($4),($5))', [req.body.cantidad, req.body.costo_ind, req.body.fk_inventario, req.body.fk_compra, req.body.fk_alimin], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

const insertCompraStatus = (req, response) => {
    //if (req.body.nombre) {
    db.query('INSERT INTO compra_status(fecha,fk_compra,fk_status) VALUES(($1),($2),($3))', [req.body.fecha, req.body.fk_compra, req.body.fk_status], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

const selectCompraStatus = (req, response) => {
    db.query('SELECT * from compra_status WHERE fk_compra=($1)', [req.params.fk_compra], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('Devolviendo:', res)
        response.status(200).json(res);
    })
}

const selectCompraP = (req, response) => {
    db.query('SELECT * from compra WHERE clave=($1)', [req.params.fk_compra], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('Devolviendo:', res)
        response.status(200).json(res);
    })
}

const updateCompraStatus = (req, response) => {
    //if (req.body.nombre) {
    db.query('UPDATE compra_status SET fk_status=($1) WHERE fk_compra=($2)', [req.body.fk_status, req.body.fk_compra], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
    //}
}

module.exports = {
    selectAll,
    selectAllDetCompra,
    insertCompra,
    insertDetCompra,
    insertCompraStatus,
    selectCompraStatus,
    selectCompraP,
    updateCompraStatus,
}

