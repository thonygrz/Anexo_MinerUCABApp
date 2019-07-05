const db = require('../database/index');


const selectAllMet = (req, response) => {
    db.query('SELECT * from mineral_metal', (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('SELECT METALES')
    response.status(200).json(res)
    })
}

const selectAllNoMet = (req, response) => {
    db.query('SELECT * from mineral_nometal', (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('SELECT NO METALES')
    response.status(200).json(res)
    })
}

const selectOneMet = (req, response) => {
    db.query('SELECT * FROM mineral_metal WHERE clave=($1)',[req.body.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log(res)
    response.status(200).json(res)
    })
}

const selectOneNoMet = (req, response) => {
    db.query('SELECT * FROM mineral_noMetal WHERE clave=($1)',[req.body.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log(res)
    response.status(200).json(res)
    })
}

const insertMetal = (req,response) => {
    console.log('se está insertando el METAL',req.body.nombre);
    db.query('INSERT INTO mineral_metal(nombre,descripcion,dureza,maleabilidad) VALUES(($1),($2),($3),($4)) returning clave,nombre',[req.body.nombre,req.body.descripcion,req.body.dureza,req.body.maleabilidad], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('SE INSERTÓ EL METAL: ',res)
    response.status(200).json(res)   
    })
}

const insertNoMetal = (req,response) => {
    console.log('se está insertando el NO METAL',req.body.nombre);
    db.query('INSERT INTO mineral_nometal(nombre,descripcion) VALUES(($1),($2)) returning nombre,clave',[req.body.nombre,req.body.descripcion], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log(res)
    console.log('SE INSERTÓ EL NO METAL: ',res)
    response.status(200).json(res)   
    })
}

const insertMetMet = (req,response) => {
    console.log('se está insertando el METMET: ',req.body.fk_metal_1,req.body.fk_metal_2,req.body.cantidad);
    db.query('INSERT INTO met_met(fk_metal_1,fk_metal_2,cantidad) VALUES(($1),($2),($3)) returning clave',[req.body.fk_metal_1,req.body.fk_metal_2,req.body.cantidad], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Se insertó el metmet:',res)
    response.status(200).json(res)   
    })
}

const insertMetPre = (req,response) => {
    console.log('se está insertando el MINPRE: ',req.body.fk_metal,req.body.fk_presentacion,req.body.costo);
    db.query('INSERT INTO min_pre(fk_metal,fk_presentacion,costo) VALUES(($1),($2),($3)) returning clave',[req.body.fk_metal,req.body.fk_presentacion,req.body.costo], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Se insertó el minpre:',res)
    response.status(200).json(res)   
    })
}

const insertNoMetNoMet = (req,response) => {
    console.log('se está insertando el NOMETNOMET: ',req.body.fk_nometal_1,req.body.fk_nometal_2,req.body.cantidad);
    db.query('INSERT INTO noMet_noMet(fk_nometal_1,fk_nometal_2,cantidad) VALUES(($1),($2),($3)) returning clave',[req.body.fk_nometal_1,req.body.fk_nometal_2,req.body.cantidad], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Se insertó el nometnomet:',res)
    response.status(200).json(res)   
    })
}

const insertNoMetPre = (req,response) => {
    console.log('se está insertando el MINPRE: ',req.body.fk_nometal,req.body.fk_presentacion,req.body.costo);
    db.query('INSERT INTO min_pre(fk_nometal,fk_presentacion,costo) VALUES(($1),($2),($3)) returning clave',[req.body.fk_nometal,req.body.fk_presentacion,req.body.costo], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Se insertó el minpre:',res)
    response.status(200).json(res)   
    })
}

const delete_minMet = (req,response) => {
    console.log('se eliminó',req.body.clave)
    db.query('DELETE FROM mineral_metal where clave=($1)',[req.body.clave], (err,res) => {
        if (err.error)  
            return console.log(err.error);
    response.status(200).json(res);  
    })
}

const delete_minNoMet = (req,response) => {
    console.log('se eliminó',req.body.clave)
    db.query('DELETE FROM mineral_nometal where clave=($1)',[req.body.clave], (err,res) => {
        if (err.error)  
            return console.log(err.error);
    response.status(200).json(res);  
    })
}

const selectMetMet = (req, response) => {
    db.query('SELECT * FROM met_met WHERE fk_metal_2=($1)', [req.params.clave], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log(res)
        response.status(200).json(res)
    })
}

const selectNoMetNoMet = (req, response) => {
    db.query('SELECT * FROM nomet_nomet WHERE fk_nometal_2=($1)', [req.params.clave], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log(res)
        response.status(200).json(res)
    })
}

module.exports = {
    selectAllMet,
    selectAllNoMet,
    selectOneMet,
    selectOneNoMet,
    insertMetal,
    insertNoMetal,
    delete_minMet,
    delete_minNoMet,
    selectMetMet,
    selectNoMetNoMet,
    insertMetMet,
    insertNoMetNoMet,
    insertMetPre,
    insertNoMetPre,
}

