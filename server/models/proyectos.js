const db = require('../database/index');

const selectAllPro = (req, response) => {
    console.log('selectAll proyectos')
    db.query('SELECT ex.clave, y.nombre, ex.cantidad_extraida, ex.fecha_inicio,ex.fecha_fin, ex.fk_yanmin, ex.fk_status, ex.fk_inventario, ex.fk_compra, ex.fk_venta from explotacion ex, yacimiento y, yan_min yan where y.clave = yan.fk_yacimiento and yan.clave = ex.fk_yanMin and ex.fk_status = 2', (err,res) => {
    if (err.error)
        return console.log(err.error);
    response.status(200).json(res)
    })
}

const selectOnePro = (req, response) => {
    db.query('SELECT * FROM explotacion WHERE clave=($1)',[req.params.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Devolviendo:',res)    
    response.status(200).json(res);
    })
}

const selectEtapa = (req, response) => {
    db.query('SELECT e.clave, e.nombre, e.numero, e.duracion, e.fecha_inicio, e.fk_explotacion, e.fk_status FROM etapa e, explotacion ex WHERE ex.clave = e.fk_explotacion and ex.clave=($1)',[req.params.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Devolviendo:',res)    
    response.status(200).json(res);
    })
}

const selectFase = (req, response) => {
    db.query('SELECT f.clave, f.nombre, f.numero, f.duracion, f.fecha_inicial, f.fk_status from fase f, etapa e, explotacion ex where ex.clave = e.fk_explotacion and e.clave = f.fk_etapa and e.clave = ($1)',[req.params.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Devolviendo:',res)    
    response.status(200).json(res);
    })
}

const selectFaseCargo = (req, response) => {
    db.query('SELECT fa.clave, fa.fk_cargo, ca.nombre from fase f, fase_cargo fa, etapa e, explotacion ex, cargo ca where ex.clave = e.fk_explotacion and e.clave = f.fk_etapa and f.clave = fa.fk_fase and fa.fk_cargo = ca.clave and f.clave = ($1)',[req.params.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Devolviendo:',res)    
    response.status(200).json(res);
    })
}

const selectFaseCargoEmp = (req, response) => {
    db.query('SELECT fa.clave, fa.fk_cargo, ca.nombre from fase f, fase_cargo fa, etapa e, explotacion ex, cargo ca where ex.clave = e.fk_explotacion and e.clave = f.fk_etapa and f.clave = fa.fk_fase and fa.fk_cargo = ca.clave and f.clave = ($1)',[req.params.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Devolviendo:',res)    
    response.status(200).json(res);
    })
}

const delete_Pro = (req,response) => {
    db.query('DELETE FROM explotacion where clave=($1)',[req.body.clave], (err,res) => {
        if (err.error)  
            return console.log(err.error);
    response.status(200).json(res);  
    })
}

module.exports = {
    selectAllPro,
    selectOnePro,
    delete_Pro,
    selectEtapa,
    selectFase,
    selectFaseCargo
}