const ventas_pen = [{ 
    id: '1',
    cliente: 'Pedro Pérez',
    cantidad: '5',
    costo: '150',
    fecha: '05/08/2019'
}, { 
    id: '2',
    cliente: 'Carbonsín C.A.',
    cantidad: '80',
    costo: '2400',
    fecha: '05/08/2019'
},{ 
    id: '3',
    cliente: 'TuCarbonsito C.A.',
    cantidad: '10',
    costo: '300',
    fecha: '05/08/2019'
}]

export default (state = ventas_pen, action) => {
    switch (action.type) {
        case 'GUARDAR_VENTAS_PEN':
            return action.ventas_pen
        default:
            return state
    }
}