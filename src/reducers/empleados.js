const empleados = [{ 
    id: '1',
    nombre: 'Empleado 1',
    cedula: '26411292',
    sexo: 'Masculino',
    apellido: 'Perez',
    fk_lugar: '7',
    telefono: '01410315625',
    cargo: '2',
    usuario: 'alnimaro',
    contraseña: 'orjhr',
    rol: 'Administrador',
    fechaNac: '1999-03-03',
    fechaIng: '2018-04-02'
}, {
    id: '2',
    nombre: 'Empleado 2',
    sexo: 'Femenino',
    cedula: '24541292',
    apellido: 'P654646rez',
    fk_lugar: '7',
    telefono: '014541315625',
    cargo: '1',
    fechaNac: '1998-12-02',
    fechaIng: '2018-04-02'
}]

export default (state = empleados, action) => {
    switch (action.type) {
        case 'GUARDAR_EMPLEADOS':
            return action.empleados
        default:
            return state
    }
}