const db = require('../database/index');

const selectAll = (req, response) => {
    console.log('selectAll')
    db.query('SELECT * from aliado', (err,res) => {
    if (err.error)
        return console.log(err.error);
    response.status(200).json(res)
    })
}

const selectAllClaves = (req, response) => {
    console.log('selectAllClaves')
    db.query('SELECT clave from aliado', (err,res) => {
    if (err.error)
        return console.log(err.error);
    response.status(200).json(res)
    return res;
    })
}

const selectFk_ali = (req, response) => {
    console.log('Select alimin por fk_aliado',req.params.fk_aliado)
    db.query('SELECT * FROM ali_min WHERE fk_aliado=($1)',[req.params.fk_aliado], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Devolviendo:',res)    
    response.status(200).json(res);
    })
}

const selectOneClaveID = (req, response) => {
    console.log('Select alimin por clave',req.params.clave)
    db.query('SELECT * FROM ali_min WHERE clave=($1)',[req.params.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Devolviendo:',res)    
    response.status(200).json(res);
    })
}

const selectAllAliMin = (req, response) => {
    console.log('Select alimin')
    db.query('SELECT * FROM ali_min', (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('Devolviendo:', res)
        response.status(200).json(res);
    })
}

const insert = (req,response) => {
    console.log('insert aliado')
    if(req.body.nombre){
        db.query('INSERT INTO aliado(nombre,fecha_creacion,fk_lugar) VALUES(($1),($2),($3))',[req.body.nombre,req.body.fecha_c,req.body.fk_lugar], (err,res) => {
        if (err.error)
            return console.log(err.error);
        console.log('se insertó el aliado',req.body,res)
        response.status(200).json(res)
        return res;
        })
    }   
}

const update = (req,response) => {
    console.log('update aliado', req.body.clave,req.body.nombre,req.body.fecha_c,req.body.fk_lugar)
    // if(req.body.nombre && req.body.fecha_c && req.body.fk_lugar){
        db.query('UPDATE aliado SET nombre=($1),fecha_creacion=($2),fk_lugar=($3) WHERE clave=($4) returning clave,nombre',[req.body.nombre,req.body.fecha_c,req.body.fk_lugar,req.body.clave], (err,res) => {
        if (err.error)
            return console.log(err.error);
        console.log('SE ACTUALIZÖ EL ALIADO: ',res.data)
        response.status(200).json(res)
        })
    // }   
    // else if(req.body.nombre && req.body.fecha_c){
    //     db.query('UPDATE aliado SET nombre=($1),fecha_creacion=($2) WHERE clave=($3) returning clave,nombre',[req.body.nombre,req.body.fecha_c,req.body.clave], (err,res) => {
    //     if (err.error)
    //         return console.log(err.error);
    //     console.log('se actualizo el aliado',res.data)
    //     response.status(200).json(res)
    //     })
    // } 
    // else if(req.body.nombre && req.body.fk_lugar){
        // db.query('UPDATE aliado SET nombre=($1),fk_lugar=($2) WHERE clave=($3) returning clave,nombre',[req.body.nombre,req.body.fk_lugar,req.body.clave], (err,res) => {
        // if (err.error)
        //     return console.log(err.error);
        // console.log('se actualizo el aliado',req.body.nombre)
        // response.status(200).json(res)
        // })
    // }  
    // else{
    //     db.query('UPDATE aliado SET fecha_creacion=($1),fk_lugar=($2) WHERE clave=($3) returning clave,nombre',[req.body.fecha_c,req.body.fk_lugar,req.body.clave], (err,res) => {
    //     if (err.error)
    //         return console.log(err.error);
    //     console.log('se actualizo el aliado',res.data)
    //     response.status(200).json(res)
    //     })
    // }
}

const insertP = (req,response) => {
    console.log('se insertó',req.body.nom);
    db.query('INSERT INTO aliado(nombre,fecha_creacion,fk_lugar) VALUES(($1),($2),($3))',[req.body.nom,'2000-05-03',5], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('se insertó el aliado',req.body,res,'wepa')
    response.status(200).json(res)
    return res;
    })
}

const insertMetal = (req,response) => {
    console.log('insertando metal','costo',req.body.costo,'claveali',req.body.fk_aliado,'fkmin',req.body.fk_mineral)
    db.query('INSERT INTO ali_min(costo,fk_aliado,fk_metal) VALUES(($1),($2),($3))',[req.body.costo,req.body.fk_aliado,req.body.fk_mineral], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('se insertó el metal')
    response.status(200).json(res)
    })
}

const insertNoMetal = (req,response) => {
    console.log('insertando no metal',req.body.costo,req.body.fk_aliado,req.body.fk_mineral)
    db.query('INSERT INTO ali_min(costo,fk_aliado,fk_nometal) VALUES(($1),($2),($3))',[req.body.costo,req.body.fk_aliado,req.body.fk_mineral], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('se insertó el no metal')
    response.status(200).json(res)
    })
}

const updateMetal = (req,response) => {
    
          console.log('actualizando metal','costo',req.body.costo,'claveali',req.body.fk_aliado,'fkmin',req.body.fk_mineral)
            db.query('UPDATE ali_min SET costo=($1) WHERE fk_aliado=($2) and fk_metal=($3)',[req.body.costo,req.body.fk_aliado,req.body.fk_mineral], (err,res) => {
            if (err.error)
                return console.log(err.error);
            console.log('se actualizó el metal')
            response.status(200).json(res)
            })
}

const updateNoMetal = (req,response) => {
    console.log('actualizando no metal','costo',req.body.costo,'claveali',req.body.fk_aliado,'fkmin',req.body.fk_mineral)
    db.query('UPDATE ali_min SET costo=($1) WHERE fk_aliado=($2) and fk_nometal=($3)',[req.body.costo,req.body.fk_aliado,req.body.fk_mineral], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('se actualizó el no metal')
    response.status(200).json(res)
    })
}


const delete_ali = (req,response) => {
    console.log('se eliminó',req.body.clave)
    db.query('DELETE FROM aliado where clave=($1)',[req.body.clave], (err,res) => {
        if (err.error)  
            return console.log(err.error);
    response.status(200).json(res);  
    })
}

const delete_aliMin = (req,response) => {
    console.log('delete alimin por clave: ',req.body.clave)
    db.query('DELETE FROM ali_min where clave=($1)',[req.body.clave], (err,res) => {
        if (err.error)  
            return console.log(err.error);
    response.status(200).json(res);  
    })
}

module.exports = {
    selectAll,
    selectAllClaves,
    selectFk_ali,
    selectOneClaveID,
    selectAllAliMin,
    insert,
    insertMetal,
    insertNoMetal,
    delete_ali,
    delete_aliMin,
    insertP,
    update,
    updateMetal,
    updateNoMetal,
}

