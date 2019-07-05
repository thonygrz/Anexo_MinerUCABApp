const db = require('../database/index');

const selectAll = (req, response) => {
    console.log('selectAll')
    db.query('SELECT * from presentacion', (err,res) => {
    if (err.error)
        return console.log(err.error);
    response.status(200).json(res)
    })
}

const selectAllMinPre = (req, response) => {
    console.log('Select minpre')
    db.query('SELECT * FROM min_pre', (err, res) => {
        if (err.error)
            return console.log(err.error);
        console.log('Devolviendo:', res)
        response.status(200).json(res);
    })
}

module.exports = {
    selectAll,
    selectAllMinPre,
}

