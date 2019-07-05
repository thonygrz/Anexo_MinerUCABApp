export default (state = [], action) => {
    switch (action.type) {
        case 'GUARDAR_MAQUINARIA': 
            return action.datos
        default:
            return state
    }
}