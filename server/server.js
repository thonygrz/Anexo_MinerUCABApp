const path = require('path')
const express = require('express')
const body_parser = require('body-parser')
const app = express()
const publicPath = path.join(__dirname, '..', 'public')
const port = process.env.PORT || 3000

var db = require('./database');

app.use(express.static(publicPath))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'))
// })

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

// app.use('/models/privilegio', require('./models/privilegio'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

var Privilegio = require('./models/privilegio');
var Mineral = require('./models/minerales');
var Aliado = require('./models/aliados');
var Lugar = require('./models/lugares');
var Cliente = require('./models/clientes');

const Presentacion = require('./models/presentacion')
const Venta = require('./models/venta')
const Inventario = require('./models/inventario')
const Compra = require('./models/compra')
const Status = require('./models/status')
const Yacimiento = require('./models/yacimientos')
const proyecto = require('./models/proyectos')


var Empleado = require('./models/empleados');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.get('/selectPrivilegios', Privilegio.select);
app.post('/insert', Privilegio.insertar);

//minerales
app.get('/selectMineralesMet', Mineral.selectAllMet);
app.get('/selectMineralesNoMet', Mineral.selectAllNoMet);
app.get('/selectMineralMet', Mineral.selectOneMet);
app.get('/selectMineralNoMet', Mineral.selectOneNoMet);   
app.post('/insertMineralMet', Mineral.insertMetal);
app.post('/insertMineralNoMet', Mineral.insertNoMetal);
app.post('/deleteMineral', Mineral.delete_minMet);
app.post('/deleteMineral', Mineral.delete_minNoMet);
//fin minerales

//proyectos
app.get('/selectProyectos', proyecto.selectAllPro);
app.get('/selectProyecto/:clave', proyecto.selectOnePro);
app.get('/selectEtapa/:clave', proyecto.selectEtapa);
app.get('/selectFase/:clave', proyecto.selectFase);
app.get('/selectFaseCargo/:clave', proyecto.selectFaseCargo);

app.post('/deleteProyecto/:clave', proyecto.delete_Pro);
app.post('/deleteProyecto/:clave', proyecto.delete_Pro);
//fin proyectos

app.get('/selectAliados', Aliado.selectAll);
app.post('/deleteAliado', Aliado.delete_ali);
app.post('/insertAliado', Aliado.insert);
// app.get('/selectAliadoClave/:clave', Aliado.selectOneClave);
app.get('/selectAliadosClaves', Aliado.selectAllClaves);
app.get('/selectAliMinFk_Ali/:fk_aliado', Aliado.selectFk_ali);
app.get('/selectAliMinClaveID/:clave', Aliado.selectOneClaveID);
app.post('/updateAliado', Aliado.update);

app.get('/selectAliMin', Aliado.selectAllAliMin);
app.post('/deleteAliMin', Aliado.delete_aliMin);

app.get('/selectLugares', Lugar.selectAll);
app.get('/selectLugar/:fk_lugar', Lugar.selectOne);  // mosca

app.post('/insertMetal', Aliado.insertMetal);
app.post('/insertNoMetal', Aliado.insertNoMetal);

app.get('/selectMetMet/:clave', Mineral.selectMetMet)
app.get('/selectNoMetNoMet/:clave', Mineral.selectNoMetNoMet)

app.post('/updateMetal', Aliado.updateMetal);
app.post('/updateNoMetal', Aliado.updateNoMetal);
app.get('/selectClientesNat', Cliente.selectAllNat);
app.get('/selectClientesJud', Cliente.selectAllJud);
app.get('/selectClientes/:clave', Cliente.selectOneNat);
app.get('/selectJuridico/:clave', Cliente.selectOneJud);
app.post('/insertClienteNat', Cliente.insertNat);
app.post('/insertClienteJud', Cliente.insertJud);
app.post('/updateClienteNat', Cliente.updateNat);
app.post('/updateClienteJud', Cliente.updateJud);
app.post('/deleteClienteNat', Cliente.delete_nat);
app.post('/deleteClienteJud', Cliente.delete_jud);

app.get('/selectPresentacion', Presentacion.selectAll)
app.get('/selectMinPre', Presentacion.selectAllMinPre)

app.get('/selectVentas', Venta.selectAll)
app.get('/selectDetalleVenta/:fk_venta', Venta.selectAllDetVenta)
app.post('/insertVenta', Venta.insertVenta)
app.post('/insertDetVenta', Venta.insertDetVenta)
app.post('/insertVentaStatus', Venta.insertVentaStatus)
app.get('/selectVentaStatus/:fk_venta', Venta.selectVentaStatus)

app.post('/insertTPTransferencia', Venta.insertTPTransferencia)
app.post('/insertTPCheque', Venta.insertTPCheque)
app.post('/insertTPTCredito', Venta.insertTPTCredito)
app.post('/insertTPTDebito', Venta.insertTPTDebito)
app.post('/insertTPVenta', Venta.insertTPVenta)

app.get('/selectInventario', Inventario.selectAll)
app.post('/updateInventario', Inventario.updateInventario)

app.get('/selectCompras', Compra.selectAll)
app.get('/selectDetalleCompra/:fk_compra', Compra.selectAllDetCompra)
app.post('/insertCompra', Compra.insertCompra)
app.post('/insertDetCompra', Compra.insertDetCompra)
app.post('/insertCompraStatus', Compra.insertCompraStatus)
app.get('/selectCompraStatus/:fk_compra', Compra.selectCompraStatus)

app.get('/selectStatus', Status.selectStatus)
app.get('/selectVentasPendientes', Status.selectVentasPendientes)
app.get('/selectComprasPendientes', Status.selectComprasPendientes)

app.get('/selectVentaP/:fk_venta', Venta.selectVentaP)
app.get('/selectCompraP/:fk_compra', Compra.selectCompraP)
app.get('/selectEmpleados', Empleado.selectAll);
app.get('/selectCargos', Empleado.selectAllCargos);
app.get('/selectCargoName/:nombre', Empleado.selectOneCargoName);
app.get('/selectRoles', Empleado.selectAllRoles);
app.post('/insertEmpleado', Empleado.insert);
app.post('/insertUsuario', Empleado.insertUsuario);
app.get('/selectEmpleadoUsuario/:fk_empleado',Empleado.selectUsuario);
app.get('/selectEmpleadoCargo/:fk_cargo',Empleado.selectCargo);
app.get('/selectEmpleadoRol/:fk_rol',Empleado.selectRol);
app.post('/updateEmpleado', Empleado.update);
app.post('/updateUsuario', Empleado.updateUsuario);
app.post('/deleteEmpleado', Empleado.deleteE);

app.post('/insertMetMet', Mineral.insertMetMet);
app.post('/insertNoMetNoMet', Mineral.insertNoMetNoMet);
app.post('/insertMetPre', Mineral.insertMetPre);
app.post('/insertNoMetPre', Mineral.insertNoMetPre);
app.post('/updateVentaStatus', Venta.updateVentaStatus)
app.post('/updateCompraStatus', Compra.updateCompraStatus)

app.get('/selectYacimientos', Yacimiento.selectAllYac)
app.get('/selectOneYacimiento/:clave', Yacimiento.selectOneYacimiento)
app.get('/selectYanMin/:clave', Yacimiento.selectYanMin)
app.get('/selectEtapasY/:clave', Yacimiento.selectEtapasY)
app.post('/selectFasesE', Yacimiento.selectFasesE)
app.post('/selectCargoF', Yacimiento.selectFaseCargos)
app.post('/selectTipoMaquinariaF', Yacimiento.selectFaseTipoMaquinaria)

app.get('/selectTipoMaquinaria', Yacimiento.selectTipoMaquinaria)

app.post('/insertYacimiento', Yacimiento.insertYacimiento)
app.post('/insertYanMin', Yacimiento.insertYanMin)
app.post('/insertExplotacion', Yacimiento.insertExplotacion)
app.post('/insertEtapa', Yacimiento.insertEtapa)
app.post('/insertFase', Yacimiento.insertFase)
app.post('/insertFaseCargo', Yacimiento.insertFaseCargo)
app.post('/insertFaseTipoMaquinaria', Yacimiento.insertFaseTipoMaquinaria)
app.post('/deleteYacimiento', Yacimiento.delete_yac)

app.get('/selectEmpleadoCargoIndiv/:fk_cargo', Empleado.selectEmpleadoCargo)
app.get('/selectHorario', Empleado.selectHorario)
app.get('/selectMaquinasTipo/:fk_cargo', Empleado.selectMaquinasTipo)


db.query('SELECT NOW()', (err,res) => {
    if (err.error)
        return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}`)
});

// db.query('SELECT * from privilegio', (err,res) => {
//     if (err.error)
//         return console.log(err.error);
//     console.log(res);
// });

