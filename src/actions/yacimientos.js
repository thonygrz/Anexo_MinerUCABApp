export const guardarYacimientos = (yacimientos) => ({
    type: 'GUARDAR_YACIMIENTOS',
    yacimientos
})

export const modificarYacimientos = (id, updates) => ({
    type: 'MODIFICAR_YACIMIENTOS',
    id,
    updates
})