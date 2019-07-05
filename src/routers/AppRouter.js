import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import HomePage from '../components/HomePage'
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/LoginPage'
import AliadosPage from '../components/AliadosPage'
import AliadosConsultar from '../components/AliadosConsultar'
import AliadosNuevo from '../components/AliadosNuevo'
import AliadosModificar from '../components/AliadosModificar'
import EmpleadosPage from '../components/EmpleadosPage'
import ComprasPage from '../components/ComprasPage'
import ComprasDetalles from '../components/ComprasDetalles'
import VentasPage from '../components/VentasPage'
import VentaCliente from '../components/VentaCliente'
import VentasHistorial from '../components/VentasHistorial'
import VentasDetalles from '../components/VentasDetalles'
import SolicitudCompra from '../components/SolicitudCompra'
import EstatusPage from '../components/EstatusPage'
import CambiarEstatus from '../components/EstatusCambiar'
import MineralesPage from '../components/MineralesPage'
import MineralesConsultar from '../components/MineralesConsultar'
import MineralesNuevo from '../components/MineralesNuevo'
import YacimientosPage from '../components/YacimientosPage'
import YacimientosModificar from '../components/YacimientosModificar'
import YacimientosNuevo from '../components/YacimientosNuevo'
import YacimientosEtapas from '../components/YacimientosEtapas'
import YacimientosEtapaNuevo from '../components/YacimientosEtapaNuevo'
import YacimientoEtapaFase from '../components/YacimientoEtapaFase'
import YacimientosFaseNuevo from '../components/YacimientosFaseNuevo'
import YacimientosConsultar from '../components/YacimientosConsultar'
import YacimientosFaseModificar from '../components/YacimientosFaseModificar'
import EmpleadoNuevo from '../components/EmpleadoNuevo'
import EmpleadoModificar from '../components/EmpleadoModificar'
import EmpleadoConsultar from '../components/EmpleadoConsultar'
import ProyectosPage from '../components/ProyectosPage'
import ProyectosNuevo from '../components/ProyectosNuevo'
import ProyectosNuevoFaseEmpleados from '../components/ProyectosNuevoFaseEmpleados'
import ProyectosNuevoFaseMaquinaria from '../components/ProyectosNuevoFaseMaquinaria'
import ProyectosConsultar from '../components/ProyectosConsultar'
import ProyectosConsultarFaseEmpleados from '../components/ProyectosConsultarFaseEmpleados'
import ProyectosConsultarFaseMaquinaria from '../components/ProyectosConsultarFaseMaquinaria'
import ProyectosModificar from '../components/ProyectosModificar'
import ProyectosModificarFaseEmpleados from '../components/ProyectosModificarFaseEmpleados'
import ProyectosModificarFaseMaquinaria from '../components/ProyectosModificarFaseMaquinaria'
import ClientesPage from '../components/ClientesPage'
import ClientesConsultar from '../components/ClientesConsultar'
import ClientesModificar from '../components/ClientesModificar'
import ClientesNuevo from '../components/ClientesNuevo'
import MineralesSeleccionar from '../components/MineralesSeleccionar'
import MineralesModificar from '../components/MineralesModificar'


export const history = createBrowserHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/home" component={HomePage} />
                <PrivateRoute path="/yacimientos" component={YacimientosPage} exact={true} />
                <PrivateRoute path="/yacimientos/nuevo" component={YacimientosNuevo} />
                <PrivateRoute path="/yacimientos/modificar/:id" component={YacimientosModificar} />
                <PrivateRoute path="/yacimientos/etapas" component={YacimientosEtapas} exact={true} />
                <PrivateRoute path="/yacimientos/etapas/fases/:id" component={YacimientoEtapaFase} exact={true} />
                <PrivateRoute path="/yacimientos/etapas/nuevo" component={YacimientosEtapaNuevo} exact={true} />
                <PrivateRoute path="/yacimientos/fases/nuevo" component={YacimientosFaseNuevo} exact={true} />
                <PrivateRoute path="/yacimientos/fases/modificar" component={YacimientosFaseModificar} exact={true} />
                <PrivateRoute path="/yacimientos/consultar/:id" component={YacimientosConsultar} exact={true} />
                <PrivateRoute path="/aliados" component={AliadosPage} exact={true} />
                <PrivateRoute path="/aliados/nuevo" component={AliadosNuevo} exact={true} />
                <PrivateRoute path="/aliados/modificar/:id" component={AliadosModificar} exact={true} />
                <PrivateRoute path="/aliados/consultar/:id" component={AliadosConsultar} exact={true} />
                <PrivateRoute path="/empleados" component={EmpleadosPage} exact={true} />
                <PrivateRoute path="/empleados/nuevo" component={EmpleadoNuevo} exact={true} /> 
                <PrivateRoute path="/empleados/modificar/:id" component={EmpleadoModificar} exact={true} />
                <PrivateRoute path="/empleados/consultar/:id" component={EmpleadoConsultar} exact={true} />
                <PrivateRoute path="/clientes" component={ClientesPage} exact={true} />
                <PrivateRoute path="/clientes/nuevo" component={ClientesNuevo} exact={true} />
                <PrivateRoute path="/clientes/modificar/:id" component={ClientesModificar} exact={true} />
                <PrivateRoute path="/clientes/consultar/:id" component={ClientesConsultar} exact={true} />
                <PrivateRoute path="/compras" component={ComprasPage} exact={true} />
                <PrivateRoute path="/compras/detalles/:id" component={ComprasDetalles} exact={true} />
                <PrivateRoute path="/ventas" component={VentasPage} exact={true}/>
                <PrivateRoute path="/ventas/cliente" component={VentaCliente} exact={true}/>
                <PrivateRoute path="/ventas/solicitud" component={SolicitudCompra} exact={true} />
                <PrivateRoute path="/ventas/historial" component={VentasHistorial} exact={true} />
                <PrivateRoute path="/ventas/historial/detalles/:id" component={VentasDetalles} exact={true} />
                <PrivateRoute path="/estatus" component={EstatusPage} exact={true} />
                <PrivateRoute path="/estatus/cambiar/:id" component={CambiarEstatus} exact={true} />
                <PrivateRoute path="/minerales" component={MineralesPage} exact={true}/>
                <PrivateRoute path="/minerales/nuevo" component={MineralesNuevo} exact={true}/>
                <PrivateRoute path="/minerales/consultar/:id" component={MineralesConsultar} exact={true} />
                <PrivateRoute path="/proyectos" component={ProyectosPage} exact={true}/>
                <PrivateRoute path="/proyectos/nuevo" component={ProyectosNuevo} exact={true}/>
                <PrivateRoute path="/proyectos/nuevo/fase/empleados/:id" component={ProyectosNuevoFaseEmpleados} exact={true} />
                <PrivateRoute path="/proyectos/nuevo/fase/maquinaria" component={ProyectosNuevoFaseMaquinaria} exact={true} />
                <PrivateRoute path="/proyectos/consultar/:id" component={ProyectosConsultar} exact={true} />
                <PrivateRoute path="/proyectos/consultar/fase/empleados/:id" component={ProyectosConsultarFaseEmpleados} exact={true} />
                <PrivateRoute path="/proyectos/consultar/fase/maquinaria/:id" component={ProyectosConsultarFaseMaquinaria} exact={true} />
                <PrivateRoute path="/proyectos/modificar" component={ProyectosModificar} exact={true} />
                <PrivateRoute path="/proyectos/modificar/fase/empleados" component={ProyectosModificarFaseEmpleados} exact={true} />
                <PrivateRoute path="/proyectos/modificar/fase/maquinaria" component={ProyectosModificarFaseMaquinaria} exact={true} />
                <PrivateRoute path="/minerales/seleccionar" component={MineralesSeleccionar} exact={true}/>
                <PrivateRoute path="/minerales/modificar/:id" component={MineralesModificar} exact={true}/>

                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
)

export default AppRouter