const db = require('../database/index');


const selectAllNat = (req, response) => {
    db.query('SELECT * from cliente_natural', (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('SELECT NATURAL')
    response.status(200).json(res)
    })
}

const selectAllJud = (req, response) => {
    db.query('SELECT * from cliente_juridico', (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('SELECT JURIDICO')
    response.status(200).json(res)
    })
}

const selectOneNat = (req, response) => {
    db.query('SELECT * FROM CLIENTE_NATURAL WHERE clave=($1)',[req.body.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log(res)
    response.status(200).json(res)
    })
}

const selectOneJud = (req, response) => {
    db.query('SELECT * FROM CLIENTE_JURIDICO WHERE clave=($1)',[req.body.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log(res)
    response.status(200).json(res)
    })
}

const insertNat = (req,response) => {
    console.log('insert clienteNat', req.body.nombre,req.body.apellido,req.body.telefono,req.body.cedula,req.body.fk_lugar)
    db.query('INSERT INTO cliente_natural(nombre,apellido,telefono,ci,fk_lugar) values(($1),($2),($3),($4),($5)) returning clave,nombre',[req.body.nombre,req.body.apellido,req.body.telefono,req.body.cedula,req.body.fk_lugar], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('SE ACTUALIZÖ EL CLIENTE NATURAL: ',res.data)
    response.status(200).json(res)
    })
}

const insertJud = (req,response) => {
    console.log('insert clienteJud', req.body.nombre,req.body.telefono,req.body.rif,req.body.fk_lugar)
    db.query('INSERT INTO cliente_juridico(nombre,telefono,rif,fk_lugar) values(($1),($2),($3),($4)) returning clave,nombre',[req.body.nombre,req.body.telefono,req.body.rif,req.body.fk_lugar], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('SE ACTUALIZÖ EL CLIENTE JURIDICO: ',res.data)
    response.status(200).json(res)
    })
}

const updateNat = (req,response) => {
    console.log('update clienteNat', req.body.clave,req.body.nombre,req.body.apellido,req.body.telefono,req.body.fk_lugar)
        db.query('UPDATE cliente_natural SET nombre=($1),apellido=($2),telefono=($3),fk_lugar=($4) WHERE clave=($5) returning clave,nombre',[req.body.nombre,req.body.apellido,req.body.telefono,req.body.fk_lugar,req.body.clave], (err,res) => {
        if (err.error)
            return console.log(err.error);
        console.log('SE ACTUALIZÖ EL CLIENTE NATURAL: ',res.data)
        response.status(200).json(res)
        })
}

const updateJud = (req,response) => {
    console.log('update clienteJud', req.body.clave,req.body.nombre,req.body.telefono,req.body.rif,req.body.fk_lugar)
        db.query('UPDATE cliente_juridico SET nombre=($1),telefono=($2),rif=($3),fk_lugar=($4) WHERE clave=($5) returning clave,nombre',[req.body.nombre,req.body.telefono,req.body.rif,req.body.fk_lugar,req.body.clave], (err,res) => {
        if (err.error)
            return console.log(err.error);
        console.log('SE ACTUALIZÖ EL CLIENTE JURIDICO: ',res.data)
        response.status(200).json(res)
        })
}

const delete_nat = (req,response) => {
    console.log('eliminando cliente natural',req.body.clave)
    db.query('DELETE FROM cliente_natural where clave=($1)',[req.body.clave], (err,res) => {
        if (err.error)  
            return console.log(err.error);
    response.status(200).json(res);  
    })
}

const delete_jud = (req,response) => {
    console.log('eliminando cliente juridico',req.body.clave)  
    db.query('DELETE FROM cliente_juridico where clave=($1)',[req.body.clave], (err,res) => {
        if (err.error)  
            return console.log(err.error);
    response.status(200).json(res);  
    })
}

module.exports = {
    selectAllNat,
    selectAllJud,
    selectOneNat,
    selectOneJud,
    insertNat,
    insertJud,
    updateNat,
    updateJud,
    delete_nat,
    delete_jud
}

