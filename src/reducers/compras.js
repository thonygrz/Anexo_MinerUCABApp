const compras = [{ 
    clave: '1',
    nombre: 'Oro',
    cant: '30',
    fk_aliado: '1'
}, {
    clave: '2',
    nombre: 'Carbón',
    cant: '10',
    fk_aliado: '1'
}, {
    clave: '3',
    nombre: 'Carbón',
    cant: '5',
    fk_aliado: '2'
}, {
    clave: '4',
    nombre: 'Oro',
    cant: '50',
    fk_aliado: '1'
}, {
    clave: '5',
    nombre: 'Carbón',
    cant: '25',
    fk_aliado: '2'
}]

export default (state = compras, action) => {
    switch (action.type) {
        case 'GUARDAR_COMPRAS':
            return action.compras
        default:
            return state
    }
}