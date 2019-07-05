export const guardarMaquinas = (maquinas) => ({
    type: 'GUARDAR_MAQUINAS',
    maquinas
})

export const seleccionarMaquinaria = (clave, cantidad, costo) => ({
    type: 'SELECCIONAR_MAQUINARIA',
    clave,
    cantidad,
    costo
})