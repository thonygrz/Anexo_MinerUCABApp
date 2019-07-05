const maquinas = []

export default (state = maquinas, action) => {
    switch (action.type) {
        case 'GUARDAR_MAQUINAS':
            return action.maquinas
        case 'SELECCIONAR_MAQUINARIA':
            return state.map((maquina) => {
                if (maquina.clave === action.clave) {
                    return {
                        ...maquina,
                        cantidad: action.cantidad,
                        costo: action.costo
                    }
                } else {
                    return maquina
                }
            })
        default:
            return state
    }
}