const explotaciones = [{ 
    id: '1',
    nombre: 'Explotación 1',
    estatus: {
        clave: 1,
        nombre: 'En espera'
    },
    cantidad: '30',
    fecha: '05/08/2019',
    solicitud: '1'
}, {
    id: '2',
    nombre: 'Explotación 2',
    estatus: {
        clave: 2,
        nombre: 'En progreso'
    },
    cantidad: '80',
    fecha: '05/08/2019',
    solicitud: null
}, {
    id: '3',
    nombre: 'Explotación 3',
    estatus: {
        clave: 2,
        nombre: 'En progreso'
    },
    cantidad: '10',
    fecha: '05/08/2019',
    solicitud: null
}]

export default (state = explotaciones, action) => {
    switch (action.type) {
        case 'GUARDAR':
            return action.explotaciones
        default:
            return state
    }
}