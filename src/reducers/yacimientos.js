const yacimientos = [{
    id: '1',
    nombre: 'Yacimiento 1',
    superficie: 50,
    cantidad: 100,
    fk_lugar: '3',
    minerales: [{ id: '1', cantidad: 2 }, { id: '2', cantidad: 3 }, { id: '3', cantidad: 4 }]
}, {
    id: '2',
    nombre: 'Yacimiento 2',
    superficie: 30,
    cantidad: 20,
    fk_lugar: '3',
    minerales: [{ id: '1', cantidad: 2 }]
}, {
    id: '3',
    nombre: 'Yacimiento 3',
    superficie: 200,
    cantidad: 1000,
    fk_lugar: '7',
    minerales: [{ id: '2', cantidad: 2 }, { id: '3', cantidad: 3 }]
}, {
    id: '4',
    nombre: 'Yacimiento 4',
    superficie: 40,
    cantidad: 130,
    fk_lugar: '7',
    minerales: [{ id: '1', cantidad: 2 }, { id: '3', cantidad: 3 }]
}]

export default (state = yacimientos, action) => {
    switch (action.type) {
        case 'GUARDAR_YACIMIENTOS':
            return action.yacimientos
        case 'MODIFICAR_YACIMIENTOS':
            return state.map((yacimiento) => {
                if (yacimiento.id === action.id) {
                    return {
                        ...yacimiento,
                        ...action.updates
                    }
                } else {
                    return yacimiento
                }
            })
        default:
            return state
    }
}