const db = require('../database/index');

const selectAll = (req, response) => {
    db.query('SELECT * from inventario', (err,res) => {
        if (err.error)
            return console.log(err.error);
        console.log(res)
        response.status(200).json(res)
    })
}

const updateInventario = (req, response) => {
    //if (req.body.nombre) {
    db.query('UPDATE inventario SET cantidad_almacenada=cantidad_almacenada+($1) WHERE fk_metal=($2) OR fk_nometal=($3)', [req.body.cantidad, req.body.fk_metal, req.body.fk_no_metal], (err, res) => {
            if (err.error)
                return console.log(err.error);
            response.status(200).json(res)
        })
    //}
}

module.exports = {
    selectAll,
    updateInventario
}

