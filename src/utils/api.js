import Axios from "axios";

function getMinerales() {
    return Axios.get('http://localhost:3000/selectMinerales');
}

function getMetales() {
    return Axios.get('http://localhost:3000/selectMineralesMet');
}

function getNoMetales() {
    return Axios.get('http://localhost:3000/selectMineralesNoMet');
}

function getAliados() {
    console.log('axios')
    return Axios.get('http://localhost:3000/selectAliados');
}

function getAliadosClaves() {
    console.log('axios')
    return Axios.get('http://localhost:3000/selectAliadosClaves');
}


function getLugares() {
    console.log('axios')
    return Axios.get('http://localhost:3000/selectLugares');
}

function getLugar(fk_lugar) {
    console.log('axios')
    return Axios.get(`http://localhost:3000/selectLugar/${fk_lugar}`);
}

function getAli_Min_fk_ali(fk_aliado) {
    console.log('axios')
    return Axios.get(`http://localhost:3000/selectAliMinFk_ali/${fk_aliado}`);
}

function getAli_Min(clave) {
    console.log('axios')
    return Axios.get(`http://localhost:3000/selectAliMinClaveID/${clave}`);
}

function getAli_MinSinFK() {
    console.log('axios')
    return Axios.get(`http://localhost:3000/selectAliMin`);
}

function postMineral(nombre,descripcion) {
    console.log('axios hizo la peticion')
    return Axios.post('http://localhost:3000/insertMineral',{nombre,descripcion});
}

function postAliado(nombre,fecha_c,fk_lugar) {
    console.log('axios hizo la peticion')
    return Axios.post('http://localhost:3000/insertAliado',{nombre,fecha_c,fk_lugar});
}

function updateAliado(clave,nombre,fecha_c,fk_lugar) {
    console.log('axios hizo la peticion')
    return Axios.post('http://localhost:3000/updateAliado',{clave,nombre,fecha_c,fk_lugar});
}

function updateMetal(fk_mineral,fk_aliado,costo) {
    console.log('axios hizo la peticion')
    return Axios.post('http://localhost:3000/updateMetal',{fk_mineral,costo,fk_aliado});
}

function updateNoMetal(fk_mineral,fk_aliado,costo) {
    console.log('axios hizo la peticion')
    return Axios.post('http://localhost:3000/updateNoMetal',{fk_mineral,costo,fk_aliado});
}

function getAliadoClave(clave) {
    console.log('axios hizo la peticion')
    return Axios.get(`http://localhost:3000/selectAliadoClave/${clave}`);
}

function postAliadoPrueba(nom) {
    console.log('axios hizo la peticion')
    return Axios.post('http://localhost:3000/insertAliadoP',{nom});
}

function postMetal(fk_mineral,fk_aliado,costo) {
    console.log('axios hizo la peticion')
    return Axios.post('http://localhost:3000/insertMetal',{fk_mineral,costo,fk_aliado});
}

function postNoMetal(fk_mineral,fk_aliado,costo) {
    console.log('axios hizo la peticion')
    return Axios.post('http://localhost:3000/insertNoMetal',{fk_mineral,costo,fk_aliado});
}


function deleteMineral(clave){
    console.log('axios')
    return Axios.post('http://localhost:3000/deleteMineral',{clave})
}

function deleteAliado(clave){
    console.log('axios')
    return Axios.post('http://localhost:3000/deleteAliado',{clave})
}

function deleteAli_Min(clave){
    console.log('axios')
    return Axios.post('http://localhost:3000/deleteAliMin',{clave})
}

function getMineral(clave) {
    return Axios.get('http://localhost:3000/selectMineral',{clave});
}

//clientes

function getClientesNat() {
    return Axios.get('http://localhost:3000/selectClientesNat');
}

function getClientesJud() {
    return Axios.get('http://localhost:3000/selectClientesJud');
}

function getClienteNat(clave) {
    return Axios.get(`http://localhost:3000/selectClientes/${clave}`);
}

function getClienteJud() {
    return Axios.get(`http://localhost:3000/selectJuridico/${clave}`);
}

function postInsertClienteNat(nombre,apellido,telefono,cedula,fk_lugar) {
    return Axios.post('http://localhost:3000/insertClienteNat',{nombre,apellido,telefono,cedula,fk_lugar});
}

function postInsertClienteJud(nombre,telefono,rif,fk_lugar) {
    return Axios.post('http://localhost:3000/insertClienteJud',{nombre,telefono,rif,fk_lugar});
}

function updateClienteNat(clave,nombre,apellido,telefono,ci,fk_lugar) {
    return Axios.post('http://localhost:3000/updateClienteNat',{clave,nombre,apellido,telefono,ci,fk_lugar});
}

function updateClienteJud(clave,nombre,telefono,rif,fk_lugar) {
    return Axios.post('http://localhost:3000/updateClienteJud',{clave,nombre,telefono,rif,fk_lugar});
}

function deleteClienteNat(clave) {
    return Axios.post('http://localhost:3000/deleteClienteNat',{clave});
}

function deleteClienteJud(clave) {
    return Axios.post('http://localhost:3000/deleteClienteJud',{clave});
}
//fin cliente

function getPresentacion() {
    return Axios.get('http://localhost:3000/selectPresentacion')
}

function getMinPre() {
    return Axios.get('http://localhost:3000/selectMinPre')
}

function getVentas() {
    return Axios.get('http://localhost:3000/selectVentas')
}

function getDetVenta(fk_venta) {
    return Axios.get(`http://localhost:3000/selectDetalleVenta/${fk_venta}`)
}

function postVenta(monto_total, fecha, fk_clientenatural, fk_clientejuridico) {
    return Axios.post('http://localhost:3000/insertVenta', { monto_total, fecha, fk_clientenatural, fk_clientejuridico});
}

function postDetVenta(cantidad, costo_ind, fk_inventario, fk_venta, fk_minpre) {
    return Axios.post('http://localhost:3000/insertDetVenta', { cantidad, costo_ind, fk_inventario, fk_venta, fk_minpre });
}

function postTPTransferencia(numero, num_cuenta) {
    return Axios.post('http://localhost:3000/insertTPTransferencia', { numero, num_cuenta });
}

function postTPCheque(numero, numero_cuenta) {
    return Axios.post('http://localhost:3000/insertTPCheque', { numero, numero_cuenta });
}

function postTPTDebito(numero, tipo) {
    return Axios.post('http://localhost:3000/insertTPTDebito', { numero, tipo });
}

function postTPTCredito(numero, codigo, fecha_vencimiento) {
    return Axios.post('http://localhost:3000/insertTPTCredito', { numero, codigo, fecha_vencimiento });
}

function postTPVenta(fecha, monto, fk_transferencia, fk_credito, fk_cheque, fk_debito, fk_venta) {
    return Axios.post('http://localhost:3000/insertTPVenta', { fecha, monto, fk_transferencia, fk_credito, fk_cheque, fk_debito, fk_venta });
}

function getInventario() {
    return Axios.get('http://localhost:3000/selectInventario')
}

function postUpdateInventario(cantidad, fk_metal, fk_no_metal) {
    return Axios.post('http://localhost:3000/updateInventario', { cantidad, fk_metal, fk_no_metal })
}

function getMetMet(clave) {
    return Axios.get(`http://localhost:3000/selectMetMet/${clave}`);
}

function getNoMetNoMet(clave) {
    return Axios.get(`http://localhost:3000/selectNoMetNoMet/${clave}`);
}

function getCompras() {
    return Axios.get('http://localhost:3000/selectCompras')
}

function getDetCompra(fk_compra) {
    return Axios.get(`http://localhost:3000/selectDetalleCompra/${fk_compra}`)
}

function postCompra(monto_total, fecha, fk_aliado) {
    return Axios.post('http://localhost:3000/insertCompra', { monto_total, fecha, fk_aliado });
}

function postDetCompra(cantidad, costo_ind, fk_inventario, fk_compra, fk_alimin) {
    return Axios.post('http://localhost:3000/insertDetCompra', { cantidad, costo_ind, fk_inventario, fk_compra, fk_alimin });
}

function postVentaStatus(fecha, fk_venta, fk_status) {
    return Axios.post('http://localhost:3000/insertVentaStatus', { fecha, fk_venta, fk_status });
}

function postCompraStatus(fecha, fk_compra, fk_status) {
    return Axios.post('http://localhost:3000/insertCompraStatus', { fecha, fk_compra, fk_status });
}

function getVentaStatus(fk_venta) {
    return Axios.get(`http://localhost:3000/selectVentaStatus/${fk_venta}`)
}

function getCompraStatus(fk_compra) {
    return Axios.get(`http://localhost:3000/selectCompraStatus/${fk_compra}`)
}

function getStatus() {
    return Axios.get('http://localhost:3000/selectStatus')
}

function getVentasPendientes() {
    return Axios.get('http://localhost:3000/selectVentasPendientes')
}

function getComprasPendientes() {
    return Axios.get('http://localhost:3000/selectComprasPendientes')
}

function getVentaP(fk_venta) {
    return Axios.get(`http://localhost:3000/selectVentaP/${fk_venta}`)
}

function getCompraP(fk_compra) {
    return Axios.get(`http://localhost:3000/selectCompraP/${fk_compra}`)
}

function getEmpleados() {
    return Axios.get('http://localhost:3000/selectEmpleados');
}

function getCargos() {
    return Axios.get('http://localhost:3000/selectCargos');
}

function getRoles() {
    return Axios.get('http://localhost:3000/selectRoles');
}

function postInsertEmpleado(nombre, apellido, cedula, sexo, telefono, fecha_nac, fecha_cont, fk_cargo, fk_status, fk_lugar) {
    return Axios.post('http://localhost:3000/insertEmpleado', { nombre, apellido, cedula, sexo, telefono, fecha_nac, fecha_cont, fk_cargo, fk_status, fk_lugar });
}

function postInsertUsuario(usuario, contraseña, rol, clave_emp) {
    return Axios.post('http://localhost:3000/insertUsuario', { usuario, contraseña, rol, clave_emp });
}

function postUpdateVentaStatus(
    postUpdateCompraStatus,fk_status, fk_venta) {
    return Axios.post('http://localhost:3000/updateVentaStatus', { fk_status, fk_venta });
}

function postUpdateCompraStatus(fk_status, fk_compra) {
    return Axios.post('http://localhost:3000/updateCompraStatus', { fk_status, fk_compra });
}

function getYacimientos() {
    return Axios.get('http://localhost:3000/selectYacimientos');
}

function getOneYacimiento(clave) {
    return Axios.get(`http://localhost:3000/selectOneYacimiento/${clave}`);
}

function getYanMin(clave) {
    return Axios.get(`http://localhost:3000/selectYanMin/${clave}`);
}

function getEtapasY(clave) {
    return Axios.get(`http://localhost:3000/selectEtapasY/${clave}`);
}

function getFasesE(claveE, claveY) {
    return Axios.post(`http://localhost:3000/selectFasesE`, { claveE, claveY });
}

function getCargoF(claveF, claveE, claveY) {
    return Axios.post(`http://localhost:3000/selectCargoF`, { claveF, claveE, claveY });
}

function getTipoMaquinariaF(claveF, claveE, claveY) {
    return Axios.post(`http://localhost:3000/selectTipoMaquinariaF`, { claveF, claveE, claveY });
}

function getTipoMaquinaria() {
    return Axios.get(`http://localhost:3000/selectTipoMaquinaria`);
}

function postYacimiento(nombre, metros, fk_lugar) {
    return Axios.post(`http://localhost:3000/insertYacimiento`, { nombre, metros, fk_lugar });
}

function postYanMin(cantidad, fk_nometal, fk_metal, fk_yacimiento) {
    return Axios.post(`http://localhost:3000/insertYanMin`, { cantidad, fk_nometal, fk_metal, fk_yacimiento });
}

function postExplotacion(cantidad_extraida, fecha_inicio, fecha_fin, fk_yanmin, fk_status, fk_inventario, fk_compra, fk_venta) {
    return Axios.post(`http://localhost:3000/insertExplotacion`, { cantidad_extraida, fecha_inicio, fecha_fin, fk_yanmin, fk_status, fk_inventario, fk_compra, fk_venta });
}

function postEtapa(nombre, numero, duracion, fecha_inicio, fk_explotacion, fk_status) {
    return Axios.post(`http://localhost:3000/insertEtapa`, { nombre, numero, duracion, fecha_inicio, fk_explotacion, fk_status });
}

function postFase(nombre, numero, duracion, fecha_inicial, fk_status, fk_etapa) {
    return Axios.post(`http://localhost:3000/insertFase`, { nombre, numero, duracion, fecha_inicial, fk_status, fk_etapa });
}

function postFaseCargo(costo,cantidad,fk_fase,fk_cargo) {
    return Axios.post(`http://localhost:3000/insertFaseCargo`, { costo, cantidad, fk_fase, fk_cargo });
}

function postFaseTipoMaquinaria(costo, cantidad, fk_fase, fk_tipomaquinaria) {
    return Axios.post(`http://localhost:3000/insertFaseTipoMaquinaria`, { costo, cantidad, fk_fase, fk_tipomaquinaria });
}

function deleteYacimiento(clave) {
    return Axios.post('http://localhost:3000/deleteYacimiento', { clave });
}

function getEmpleadosCargo(fk_cargo) {
    return Axios.get(`http://localhost:3000/selectEmpleadoCargoIndiv/${fk_cargo}`);
}

function getHorario() {
    return Axios.get(`http://localhost:3000/selectHorario`);
}


function getMaquinasTipo(fk_cargo) {
    return Axios.get(`http://localhost:3000/selectMaquinasTipo/${fk_cargo}`);
}


function postInsertMetal(nombre, descripcion, dureza, maleabilidad) {
    return Axios.post('http://localhost:3000/insertMineralMet', { nombre, descripcion, dureza, maleabilidad });
}

function postInsertNoMetal(nombre, descripcion) {
    return Axios.post('http://localhost:3000/insertMineralNoMet', { nombre, descripcion });
}

function getUsuario(fk_empleado) {
    console.log('CLAVE EMPLEADO EN API:', fk_empleado)
    return Axios.get(`http://localhost:3000/selectEmpleadoUsuario/${fk_empleado}`);
}

function getCargo(fk_cargo) {
    return Axios.get(`http://localhost:3000/selectEmpleadoCargo/${fk_cargo}`);
}

function getRol(fk_rol) {
    return Axios.get(`http://localhost:3000/selectEmpleadoRol/${fk_rol}`);
}

function updateEmpleado(clave, nombre, apellido, cedula, sexo, telefono, fecha_nac, fecha_cont, fk_cargo, fk_status, fk_lugar) {
    return Axios.post('http://localhost:3000/updateEmpleado', { clave, nombre, apellido, cedula, sexo, telefono, fecha_nac, fecha_cont, fk_cargo, fk_status, fk_lugar });
}

function updateUsuario(clave, usuario, contraseña, rol) {
    return Axios.post('http://localhost:3000/updateUsuario', { clave, usuario, contraseña, rol });
}

function deleteEmpleado(clave) {
    return Axios.post('http://localhost:3000/deleteEmpleado', { clave });
}

//proyecto
function getProyectos() {
    return Axios.get('http://localhost:3000/selectProyectos');
}

function getProyecto(clave) {
    return Axios.get(`http://localhost:3000/selectProyecto/${clave}`);
}

function getEtapas(clave) {
    return Axios.get(`http://localhost:3000/selectEtapa/${clave}`);
}

function getFases(clave) {
    return Axios.get(`http://localhost:3000/selectFase/${clave}`);
}

function postInsertMetMet(fk_metal_2,fk_metal_1,cantidad) {
    return Axios.post('http://localhost:3000/insertMetMet', {fk_metal_2,fk_metal_1,cantidad});
}

function postInsertNoMetNoMet(fk_nometal_2,fk_nometal_1,cantidad) {
    return Axios.post('http://localhost:3000/insertNoMetNoMet', {fk_nometal_2,fk_nometal_1,cantidad});
}

function postInsertMetPre(fk_metal,fk_presentacion,costo) {
    return Axios.post('http://localhost:3000/insertMetPre', {fk_metal,fk_presentacion,costo});
}

function postInsertNoMetPre(fk_nometal,fk_presentacion,costo) {
    return Axios.post('http://localhost:3000/insertNoMetPre', {fk_nometal,fk_presentacion,costo});
}

function getFasesCargos(clave) {
    return Axios.get(`http://localhost:3000/selectFaseCargo/${clave}`);
}

module.exports = {
        getFasesCargos,
        getFases,
        getEtapas,
        getProyecto,
        getProyectos,
        postUpdateVentaStatus,
        postUpdateCompraStatus,

        getMinerales,
        getAliados,
        getAliadoClave,
        getAliadosClaves,
        getAli_Min,
        getAli_Min_fk_ali,
        getMineral,
        getMetales,
        getNoMetales,
        getLugares,
        getLugar,
        postMineral,
        postAliado,
        postMetal,
        postNoMetal,
        updateMetal,
        updateNoMetal,
        deleteMineral,
        deleteAliado,
        deleteAli_Min,
        postAliadoPrueba,
        getAli_MinSinFK,
        updateAliado,
        getAli_Min,
        //clientes
        getClientesNat,
        getClientesJud,
        getClienteNat,
        getClienteJud,
        updateClienteNat,
        updateClienteJud,
        postInsertClienteNat,
        postInsertClienteJud,
        deleteClienteNat,
        deleteClienteJud,
        
        //fin cliente
        //Empleados
        getEmpleados,
        getCargos,
        getCargo,
        // getCargoName,
        getRoles,
        getRol,
        getUsuario,
        postInsertEmpleado,
        postInsertUsuario,
        updateEmpleado,
        updateUsuario,
        deleteEmpleado,
        //fin empleados
        getPresentacion,
        getMinPre,
        getVentas,
        getDetVenta,
        postVenta,
        postDetVenta,
        getInventario,
        postUpdateInventario,

        postTPTransferencia,
        postTPCheque,
        postTPTDebito,
        postTPTCredito,
        postTPVenta,

        getMetMet,
        getNoMetNoMet,

        getCompras,
        getDetCompra,
        postCompra,
        postDetCompra,

        getStatus,
        postVentaStatus,
        postCompraStatus,
        getVentaStatus,
        getCompraStatus,
        getVentasPendientes,
        getComprasPendientes,
        getVentaP,
        getCompraP,
        postInsertMetal,
        postInsertNoMetal,

        postInsertMetMet,
        postInsertNoMetNoMet,
        postInsertMetPre,
        postInsertNoMetPre,  
        
        getYacimientos,
        getOneYacimiento,
        getYanMin,
        getEtapasY,
        getFasesE,
        getCargoF,
        getTipoMaquinariaF,
        getTipoMaquinaria,
        deleteYacimiento,
        getEmpleadosCargo,
        getHorario,
        getMaquinasTipo,
        postYacimiento,
        postYanMin,
        postExplotacion,
        postEtapa,
        postFase,
        postFaseCargo,
        postFaseTipoMaquinaria,
}