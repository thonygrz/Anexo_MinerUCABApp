import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import authReducer from '../reducers/auth'
import yacimientosReducer from '../reducers/yacimientos'
import aliadosReducer from '../reducers/aliados'
import cargosReducer from '../reducers/cargos'
import maquinasReducer from '../reducers/maquinas'
import mineralesReducer from '../reducers/minerales'
import empleadosReducer from '../reducers/empleados'
import clientesReducer from '../reducers/clientes'
import comprasReducer from '../reducers/compras'
import explotacionesReducer from '../reducers/explotaciones'
import proyectosReducer from '../reducers/proyectos'
import comprasPenReducer from '../reducers/compras-pen'
import ventasPenReducer from '../reducers/ventas-pen'
import lugaresReducer from '../reducers/lugares'
import solicitudReducer  from '../reducers/solicitud'
import ventaReducer from '../reducers/venta'
import gdEmpleadoReducer from '../reducers/datosEmpleados'
import gdMaquinaReducer from '../reducers/datosMaquinarias'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            yacimientos: yacimientosReducer,
            aliados: aliadosReducer,
            cargos: cargosReducer,
            maquinas: maquinasReducer,
            minerales: mineralesReducer,
            empleados: empleadosReducer,
            compras: comprasReducer,
            explotaciones: explotacionesReducer,
            proyectos: proyectosReducer,
            compras_pen: comprasPenReducer,
            ventas_pen: ventasPenReducer,
            solicitud: solicitudReducer,
            lugares: lugaresReducer,
            clientes: clientesReducer,
            venta: ventaReducer,
            datosEmpleado: gdEmpleadoReducer,
            datosMaquinaria: gdMaquinaReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store
}