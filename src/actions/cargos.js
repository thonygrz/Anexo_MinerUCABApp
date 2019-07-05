export const guardarCargos = (cargos) => ({
    type: 'GUARDAR_CARGOS',
    cargos
})

export const seleccionarCargos = (clave, cantidad, costo) => ({
    type: 'SELECCIONAR_CARGOS',
    clave,
    cantidad,
    costo
})