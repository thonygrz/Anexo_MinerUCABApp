export const guardarAliados = (aliados) => ({
    type: 'GUARDAR_ALIADOS',
    aliados
})

export const modificarAliados = (id, updates) => ({
    type: 'MODIFICAR_ALIADOS',
    id,
    updates
})