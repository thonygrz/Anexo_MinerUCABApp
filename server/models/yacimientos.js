const db = require('../database/index');


const selectAllYac = (req, response) => {
    db.query('SELECT * from yacimiento', (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log('SELECT yacimiento')
    response.status(200).json(res)
    })
}


const selectOneYacimiento = (req, response) => {
    db.query('SELECT * FROM yacimiento WHERE clave=($1)',[req.params.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log(res)
    response.status(200).json(res)
    })
}

const selectYanMin = (req, response) => {
    db.query('SELECT * FROM yan_min WHERE fk_yacimiento=($1)', [req.params.clave], (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log(res)
        response.status(200).json(res)
    })
}

const selectEtapasY = (req, response) => {
    db.query('SELECT e.clave, e.nombre, e.numero, e.duracion, e.fecha_inicio, e.fk_explotacion, e.fk_status from yacimiento y, etapa e, explotacion ex, yan_min yan where y.clave = yan.fk_yacimiento and yan.clave = ex.fk_yanMin and ex.clave = e.fk_explotacion and y.clave = ($1)',[req.params.clave], (err,res) => {
    if (err.error)
        return console.log(err.error);
    response.status(200).json(res)
    })
}

const selectFasesE = (req, response) => {
    db.query('SELECT f.clave, f.nombre, f.numero, f.duracion, f.fecha_inicial, f.fk_status, f.fk_etapa from fase f, yacimiento y, etapa e, explotacion ex, yan_min yan  where y.clave = yan.fk_yacimiento and yan.clave = ex.fk_yanMin and ex.clave = e.fk_explotacion and e.clave = f.fk_etapa and e.clave = ($1) and y.clave = ($2)',[req.body.claveE,req.body.claveY], (err,res) => {
    if (err.error)
        return console.log(err.error);
    response.status(200).json(res)
    })
}

const selectFaseCargos = (req, response) => {
    db.query('SELECT fa.clave, fa.cantidad, fa.fk_cargo, fa.costo, ca.nombre from fase f, yacimiento y, etapa e, explotacion ex, yan_min yan, cargo ca, fase_cargo fa  where f.clave = fa.fk_fase and y.clave = yan.fk_yacimiento and yan.clave = ex.fk_yanMin and ex.clave = e.fk_explotacion and e.clave = f.fk_etapa and ca.clave = fa.fk_cargo and f.clave = ($1) and e.clave =($2) and y.clave = ($3)',[req.body.claveF,req.body.claveE,req.body.claveY], (err,res) => {
    if (err.error)
        return console.log(err.error);
    response.status(200).json(res)
    })
}

const selectFaseTipoMaquinaria = (req, response) => {
    db.query('SELECT fm.clave, fm.cantidad, fm.fk_tipomaquinaria, fm.costo, ca.nombre from fase f, yacimiento y, etapa e, explotacion ex, yan_min yan, tipo_maquinaria ca, fase_tipomaquinaria fm  where f.clave = fm.fk_fase and y.clave = yan.fk_yacimiento and yan.clave = ex.fk_yanMin and ex.clave = e.fk_explotacion and e.clave = f.fk_etapa and ca.clave = fm.fk_tipomaquinaria and f.clave = ($1) and e.clave =($2) and y.clave = ($3)', [req.body.claveF,req.body.claveE,req.body.claveY], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const selectCargos = (req, response) => {
    db.query('SELECT * from cargo', (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const selectTipoMaquinaria = (req, response) => {
    db.query('SELECT * from tipo_maquinaria', (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const insertYacimiento = (req, response) => {
    db.query('INSERT INTO yacimiento(nombre,metros,fk_lugar) VALUES(($1),($2),($3)) returning clave', [req.body.nombre, req.body.metros, req.body.fk_lugar], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const insertYanMin = (req, response) => {
    db.query('INSERT INTO yan_min(cantidad,fk_nometal,fk_metal,fk_yacimiento) VALUES(($1),($2),($3),($4)) returning clave', [req.body.cantidad, req.body.fk_nometal, req.body.fk_metal, req.body.fk_yacimiento], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const insertExplotacion = (req, response) => {
    db.query('INSERT INTO explotacion(cantidad_extraida,fecha_inicio,fecha_fin,fk_yanmin,fk_status,fk_inventario,fk_compra,fk_venta) VALUES(($1),($2),($3),($4),($5),($6),($7),($8)) returning clave', [req.body.cantidad_extraida, req.body.fecha_inicio, req.body.fecha_fin, req.body.fk_yanmin, req.body.fk_status, req.body.fk_inventario, req.body.fk_compra, req.body.fk_venta], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const insertEtapa = (req, response) => {
    db.query('INSERT INTO etapa(nombre,numero,duracion,fecha_inicio,fk_explotacion,fk_status) VALUES(($1),($2),($3),($4),($5),($6)) returning clave', [req.body.nombre, req.body.numero, req.body.duracion, req.body.fecha_inicio, req.body.fk_explotacion, req.body.fk_status], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const insertFase = (req, response) => {
    db.query('INSERT INTO fase(nombre,numero,duracion,fecha_inicial,fk_status,fk_etapa) VALUES(($1),($2),($3),($4),($5),($6)) returning clave', [req.body.nombre, req.body.numero, req.body.duracion, req.body.fecha_inicial, req.body.fk_status, req.body.fk_etapa], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const insertFaseCargo = (req, response) => {
    db.query('INSERT INTO fase_cargo(costo,cantidad,fk_fase,fk_cargo) VALUES(($1),($2),($3),($4)) returning clave', [req.body.costo, req.body.cantidad, req.body.fk_fase, req.body.fk_cargo], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const insertFaseTipoMaquinaria = (req, response) => {
    db.query('INSERT INTO fase_tipomaquinaria(costo,cantidad,fk_fase,fk_tipomaquinaria) VALUES(($1),($2),($3),($4)) returning clave', [req.body.costo, req.body.cantidad, req.body.fk_fase, req.body.fk_tipomaquinaria], (err, res) => {
        if (err.error)
            return console.log(err.error);
        response.status(200).json(res)
    })
}

const delete_yac = (req,response) => {
    db.query('DELETE FROM yacimiento where clave=($1)',[req.body.clave], (err,res) => {
        if (err.error)  
            return console.log(err.error);
    response.status(200).json(res);  
    })
}

module.exports = {
    selectAllYac,
    selectOneYacimiento,
    selectYanMin,
    selectEtapasY,
    selectFasesE,
    selectFaseCargos,
    selectFaseTipoMaquinaria,
    selectCargos,
    selectTipoMaquinaria,
    insertYacimiento,
    insertYanMin,
    insertExplotacion,
    insertEtapa,
    insertFase,
    insertFaseCargo,
    insertFaseTipoMaquinaria,
    delete_yac,
}

