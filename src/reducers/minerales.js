let minerales = [{
    id: '1',
    nombre: 'Carbón',
    cantidad: '51 T',
    //yacimiento: '7',
    tipo: 'lamina',
    label: 'Carbón',
    value: 'carbon'
}, {
    id: '2',
    nombre: 'Oro',
    cantidad: '10 T',
    //yacimiento: '1',
    tipo: '8 quilates',
    label: 'Oro',
    value: 'oro'
}, {
    id: '3',
    nombre: 'Plata',
    cantidad: '30 T',
    //yacimiento: '1',
    tipo: '9 quilates',
    label: 'Plata',
    value: 'plata'
}]

/*const getMineralList = () => {
    fetch('../../server/models/minerales')
    .then(res => {
        console.log(res.json())
        res.json()})
    .then(res => {
        minerales = res.map(r => {
            r.id;
            r.nombre;
        });
    })
    .then(this.minerales.map((mineral) => console.log(mineral)));    
};*/

export default (state = minerales, action) => {
    switch (action.type) {
        case 'GUARDAR_MINERALES':
            return action.minerales
        default:
            return state
    }
}

//module.exports = {
//    getMineralList
//}