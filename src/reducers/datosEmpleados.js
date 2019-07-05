export default (state = [], action) => {
    switch (action.type) {
        case 'GUARDAR_EMPLEADOS':
            return action.datos
        default:
            return state
    }
}