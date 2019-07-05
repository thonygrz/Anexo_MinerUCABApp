const aliados = [{ 
    clave: '1',
    nombre: 'Aliado 1',
    fecha: '2000-01-23',
    fk_lugar: '7',
    minerales: [{ id: '1', costo: 2 }, { id: '3', costo: 3 }]
}, {
    clave: '2',
    nombre: 'Aliado 2',
    fecha: '2000-01-23',
    fk_lugar: '3',
    minerales: [{ id: '1', costo: 4 }]
}]

export default (state = aliados, action) => {
    switch (action.type) {
        case 'GUARDAR_ALIADOS':
            return action.aliados
        case 'MODIFICAR_ALIADOS':
            return state.map((aliado) => {
                if (aliado.id === action.id) {
                    return {
                        ...aliado,
                        ...action.updates
                    }
                } else {
                    return aliado
                }
            })
        default:
            return state
    }
}