const db = require('../database/index');

const select = (req, response) => {
    db.query('SELECT * from privilegio', (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log(res)
    response.status(200).json(res)
    return res;
    
    //callback(res);
    })
}

const insertar = (req, response) => {
    // console.log('probando')
    response.status(200).json(req)
    console.log(req)
    
    //callback(res);
    //return res;
    
    
    // response.status(200).json(resultado);
}

module.exports = {
    select,
    insertar
};

// class Privilegio {
//     static select (callback){
//         db.query('SELECT * from privilegio', (err,res) => {
//             if (err.error)
//                 return console.log(err.error);
//             console.log(res);
//             callback(res);
//             //return res;
//         })
//     }   
    
//     static insert (){
//         db.query('INSERT INTO privilegio(id,nombre,descripcion) VALUES(($1),($2),($3))',[2] ['privilinquiti'] ['lo que sea'], (err,res) => {
//             if (err.error)
//                 return console.log(err.error);
//             callback(res);
//         });
//     }
// }

// module.exports = {
//     Privilegio
// }

