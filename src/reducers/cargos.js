const cargos = []

export default (state = cargos, action) => {
    switch (action.type) {
        case 'GUARDAR_CARGOS':
            return action.cargos
        case 'SELECCIONAR_CARGOS':
            return state.map((cargo) => {
                if (cargo.clave === action.clave) {
                    return {
                        ...cargo,
                        cantidad: action.cantidad,
                        costo: action.costo
                    }
                } else {
                    return cargo
                }
            })
        default:
            return state
    }
}