const solicitud = [{
    nombre: 'Virita',
    select: false
}, {
    nombre: 'Durita',
    select: false
}, {
    nombre: 'Clarita',
    select: false
}, {
    nombre: 'Fusita',
    select: false
}]

export default (state = solicitud, action) => {
    switch (action.type) {
        case 'ACTUALIZAR_SOLICITUD':
            return state.map(s => {
                if (action.clave === s.clave) {
                    return {
                        ...s,
                        select: true
                    }
                } else {
                    return s
                }
            })
        default:
            return state
    }
}