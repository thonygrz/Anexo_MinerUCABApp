const compras_pen = [{ 
    id: '1',
    aliado: 'Oro C.A.',
    mineral: 'Oro',
    cantidad: '30',
    costo: '300',
    fecha: '05/08/2019',
}, { 
    id: '2',
    aliado: 'Bauxita C.A.',
    mineral: 'Bauxita',
    cantidad: '50',
    costo: '700',
    fecha: '05/08/2019',
},{ 
    id: '3',
    aliado: 'Cobre C.A.',
    mineral: 'Cobre',
    cantidad: '10',
    costo: '250',
    fecha: '05/08/2019',
}]

export default (state = compras_pen, action) => {
    switch (action.type) {
        case 'GUARDAR_COMPRAS_PEN':
            return action.compras_pen
        default:
            return state
    }
}