const clientes = [{ 
    id: '1',
    nombre: 'Cliente 1',
    cedula: '26411292',
    apellido: 'Perez',
    telefono: '01410315625',
    fk_lugar: '7'
}, {
    id: '2',
    nombre: 'Cliente 2',
    rif: '24541292',
    apellido: 'P654646rez',
    telefono: '014541315625',
    fk_lugar: '7'
}]

export default (state = clientes, action) => {
    switch (action.type) {
        case 'GUARDAR_CLIENTES':
            return action.clientes
        default:
            return state
    }
}