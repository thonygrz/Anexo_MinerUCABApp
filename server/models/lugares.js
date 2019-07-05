const db = require('../database/index');

const selectAll = (req, response) => {
    console.log('selectAll')
    db.query('SELECT * from lugar', (err,res) => {
    if (err.error)
        return console.log(err.error);
    //console.log(res)
    response.status(200).json(res)
    })
}

const selectOne = (req, response) => {

    console.log('Select lugar por fk_lugar',req.params.fk_lugar)
    db.query('SELECT nombre, fk_lugar FROM lugar WHERE clave=($1)',[req.params.fk_lugar], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Devolviendo:',res) 
    response.status(200).json(res);
    })
}

const insert = (req,response) => {
    console.log('se insertó',req.body.nombre);
    db.query('INSERT INTO lugar(nombre,tipo,fk_lugar) VALUES(($1),($2),()$3)',[req.body.nombre,req.body.tipo,req.body.tipo], (err,res) => {
    if (err.error)
        return console.log(err.error);
    return res;
    })
}

const delete_lug = (req,response) => {
    console.log('se eliminó',req.body.clave)
    db.query('DELETE FROM lugar where clave=($1)',[req.body.clave], (err,res) => {
        if (err.error)  
            return console.log(err.error);
    //response.status(200).json(res);  
    return res;
    })
}

module.exports = {
    selectAll,
    selectOne,
    insert,
    delete_lug
}

