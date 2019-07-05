const venta = []

export default (state = venta, action) => {
    switch (action.type) {
        case 'GUARDAR_VENTA':
            return action.venta
        default:
            return state
    }
}