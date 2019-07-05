const db = require('../database/index');

const selectAll = (req, response) => {
    console.log('entrando en selectAll empleados')
    db.query('SELECT * from empleado', (err,res) => {
    if (err.error)
        return console.log(err.error);
    response.status(200).json(res)
    })
}

const selectAllCargos = (req, response) => {
    console.log('entrando en selectAllCargos empleados')
    db.query('SELECT * from cargo', (err,res) => {
    if (err.error)
        return console.log(err.error);
    response.status(200).json(res)
    })
}

const selectAllRoles = (req, response) => {
    console.log('entrando en selectAllRoles empleados')
    db.query('SELECT * from rol', (err,res) => {
    if (err.error)
        return console.log(err.error);
    response.status(200).json(res)
    })
}

const selectOneCargoName = (req, response) => {
    console.log('Select clave de cargo por nombre',req.params.nombre)
    db.query('SELECT * FROM cargo WHERE nombre=($1)',[req.params.nombre], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('Devolviendo cargo:',res)    
    response.status(200).json(res);
    })
}

const insert = (req,response) => {
    console.log('insert empleado: ', req.body.nombre,req.body.apellido,req.body.cedula,req.body.sexo,req.body.telefono,req.body.fecha_nac,req.body.fecha_cont,req.body.fk_cargo,req.body.fk_status,req.body.fk_lugar)
    if(req.body.nombre){
        db.query('INSERT INTO empleado(nombre,apellido,cedula,sexo,telefono,fecha_nac,fecha_contratado,fk_cargo,fk_status,fk_lugar) VALUES(($1),($2),($3),($4),($5),($6),($7),($8),($9),($10)) returning clave,nombre',[req.body.nombre,req.body.apellido,req.body.cedula,req.body.sexo,req.body.telefono,req.body.fecha_nac,req.body.fecha_cont,req.body.fk_cargo,req.body.fk_status,req.body.fk_lugar], (err,res) => {
        if (err.error)
            return console.log(err.error);
        console.log('se insertó el empleado',res)
        response.status(200).json(res)
        })
    }   
}

const insertUsuario = (req,response) => {
    console.log('insert usuario: ', req.body.usuario,req.body.contraseña,req.body.clave_emp,req.body.rol)
    db.query('INSERT INTO usuario(nombre,contraseña,fk_empleado,fk_rol) VALUES(($1),($2),($3),($4)) returning clave,nombre',[req.body.usuario,req.body.contraseña,req.body.clave_emp,req.body.rol], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('se insertó el usuario',res)
    response.status(200).json(res)
    })
}

const selectUsuario = (req, response) => {
    console.log('CLAVE:',req.params.fk_empleado)
    db.query('SELECT * from usuario where fk_empleado=($1)',[req.params.fk_empleado], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('SELECT usuario: ', res)
    response.status(200).json(res)
    })
}

const selectCargo = (req, response) => {
    console.log('FK CARGO QUE LLEGA AL QUERY',req.params.fk_cargo)
    db.query('SELECT * from cargo where clave=($1) ',[req.params.fk_cargo], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('CARGO RESPUESTA: ', res)
    response.status(200).json(res)
    })
}

const selectRol = (req, response) => {
    db.query('SELECT * from rol where clave=($1) ',[req.params.fk_rol], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('SELECT usuario: ', res)
    response.status(200).json(res)
    })
}

const update = (req,response) => {  
    console.log('actualizando empleado',req.body.clave,req.body.nombre,req.body.apellido,req.body.cedula,req.body.sexo,req.body.telefono,req.body.fecha_nac,req.body.fecha_cont,req.body.fk_cargo,req.body.fk_status,req.body.fk_lugar)
        db.query('UPDATE empleado SET nombre=($1), apellido=($2), cedula=($3), sexo=($4), telefono=($5), fecha_nac=($6), fecha_contratado=($7), fk_cargo=($8), fk_status=($9), fk_lugar=($10) WHERE clave=($11) returning clave,nombre',[req.body.nombre,req.body.apellido,req.body.cedula,req.body.sexo,req.body.telefono,req.body.fecha_nac,req.body.fecha_cont,req.body.fk_cargo,req.body.fk_status,req.body.fk_lugar,req.body.clave], (err,res) => {
        if (err.error)
            return console.log(err.error);
        console.log('se actualizó el empleado',res)
        response.status(200).json(res)
        })
}

const updateUsuario = (req,response) => {  
    console.log('actualizando usuario',req.body.usuario,req.body.contraseña,req.body.rol,req.body.clave)
        db.query('UPDATE usuario SET nombre=($1), contraseña=($2), fk_rol=($3) WHERE clave=($4) returning clave,nombre',[req.body.usuario,req.body.contraseña,req.body.rol,req.body.clave], (err,res) => {
        if (err.error)
            return console.log(err.error);
        console.log('se actualizó el usuario',res)
        response.status(200).json(res)
        })
}

const deleteE = (req,response) => {
    console.log('se está eliminando el empleado',req.body.clave)
    db.query('DELETE FROM empleado where clave=($1)',[req.body.clave], (err,res) => {
        if (err.error)  
            return console.log(err.error);
    response.status(200).json(res);  
    })
}

const selectEmpleadoCargo = (req, response) => {
    db.query('SELECT * from empleado where fk_cargo=($1)', [req.params.fk_cargo], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('CARGO RESPUESTA: ', res)
        response.status(200).json(res)
    })
}

const selectHorario = (req, response) => {
    db.query('SELECT * from horario', (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const selectMaquinasTipo = (req, response) => {
    db.query('SELECT * from maquinaria where fk_tipomaquinaria=($1)', [req.params.fk_cargo], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('CARGO RESPUESTA: ', res)
        response.status(200).json(res)
    })
}

module.exports ={
    selectAll,
    selectAllCargos,
    selectOneCargoName,
    selectAllRoles,
    insert,
    insertUsuario,
    selectUsuario,
    selectCargo,
    selectRol,
    update,
    updateUsuario,
    deleteE,
    selectEmpleadoCargo,
    selectHorario,
    selectMaquinasTipo
}