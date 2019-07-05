const proyectos = [{ 
    id: '1',
    nombre: 'Proyecto 1',
    cedula: '26411292',
    apellido: 'Perez',
    ubicacion: 'Caracas',
    telefono: '01410315625',
    cargo: 'maquinista',
    usuario: 'alnimaro',
    contraseña: 'orjhr',
    fechaNac: '17-03-1998',
    fechaIng: '02-12-2017'
}, {
    id: '2',
    nombre: 'Proyecto 2',
    cedula: '24541292',
    apellido: 'P654646rez',
    ubicacion: 'Caracas',
    telefono: '014541315625',
    cargo: 'ma213a',
    usuario: 'aln431maro',
    contraseña: '1512121hr',
    fechaNac: '17-03-1998',
    fechaIng: '02-12-2017'
}]

export default (state = proyectos, action) => {
    switch (action.type) {
        case 'GUARDAR':
            return action.proyectos
        default:
            return state
    }
}