import React from 'react'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { connect } from 'react-redux'
import Select from 'react-select'
import { postCompraStatus, postCompra, postDetCompra, getAliados, getAli_MinSinFK, getMetales, getNoMetales, getMetMet, getNoMetNoMet } from '../utils/api';
import moment from 'moment'

class EmpleadoNuevo extends React.Component {
    state = {
        aliadoList: [],
        aliadoSelect: [],
        aliMinList: [],
        mineralList: [],
        noMetalList: [],
        metalList: [],
        metMetList: [],
        noMetNoMetList: [],
        componentesList: [],
        mineralesCantidadEstan: [],
        mineralesCantidadFaltan: [],
        mineralesMostrar: '',
        componentesFaltan: [],
        componentesEstan: [],
        total: 0,
        compraActual: [],
    }

    getAli_MinList = () => {
        getAli_MinSinFK()
            .then((res) => {
                console.log('ya llegaron los aliados_min', res);
                var aliMinList = res.data;
                this.setState({ aliMinList });
            })
            .then(() => {
                const aliadoList = []
                const min = []
                const aliMinList = []
                if (this.state.mineralList && this.state.mineralList.length > 0) {
                    this.state.componentesList.forEach((s) => {
                        let m = ''
                        if (s.fk_metal_1) {
                            m = this.state.mineralList.find((m) => m.clave === s.fk_metal_1)
                        } else {
                            m = this.state.mineralList.find((m) => m.clave === s.fk_no_metal_1)
                        }
                        if (m && m !== '') {
                            min.push(m)
                        }
                    })
                }
                console.log(this.state.aliMinList)
                console.log(min)
                if ((this.state.aliMinList && this.state.aliMinList.length > 0) && (min && min.length > 0)) {
                    this.state.aliMinList.forEach((m) => {
                        const ma = min.find((s) => m.fk_metal === s.clave || m.fk_no_metal === s.clave)
                        if (ma) {
                            aliMinList.push(m)
                        }
                    })
                }
                console.log('state',this.state.aliadoList)
                if ((this.state.aliadoList && this.state.aliadoList.length > 0) && (aliMinList && aliMinList.length > 0)) {
                    this.state.aliadoList.forEach((s) => {
                        const ali = aliMinList.find((a) => a.fk_aliado === s.clave)
                        if (ali) {
                            aliadoList.push(s)
                        }
                    })
                }

                console.log('local',aliadoList)
                this.setState({ aliadoList, aliMinList })
            })
    }

    getAliadoList = () => {
        getAliados()
            .then((res) => {
                console.log('ya llegaron los aliados', res);
                var aliadoList = res.data;
                this.setState({ aliadoList });
            })
            .then(() => {
                this.getAli_MinList()
            })
            .catch((err) => console.log(err));
    }

    getNoMetalList = () => {
        getNoMetales()
            .then((res) => {
                    var noMetalList = res.data;
                    this.setState({ noMetalList });
            })
            .then(() => {
                this.setState((prevState) => ({ mineralList: prevState.mineralList.concat(prevState.noMetalList) }))
            })
            .then(() => {
                this.getAliadoList()
            })
            .catch((err) => console.log(err));
    }

    getMetalList = () => {
        getMetales()
            .then((res) => {
                var metalList = res.data;
                this.setState({ metalList });
            })
            .then(() => {
                this.setState((prevState) => ({ mineralList: prevState.metalList }))
            })
            .then(() => {
                this.getNoMetalList()
            })
            .catch((err) => console.log(err));
    }

    getMetMetList = (fk_metal) => {
        getMetMet(fk_metal)
            .then((res) => {
                const metMetList = res.data
                this.setState((prevState) => ({ metMetList: prevState.metMetList.concat(metMetList) }))
            })
            .then(() => {
                const componentesList = this.state.metMetList
                this.setState((prev) => ({ componentesList: prev.componentesList.concat(componentesList) }))
            })
    }

    getNoMetNoMetList = (fk_nometal) => {
        getNoMetNoMet(fk_nometal)
            .then((res) => {
                const noMetNoMetList = res.data
                this.setState((prevState) => ({ noMetNoMetList: prevState.noMetNoMetList.concat(noMetNoMetList) }))
            })
            .then(() => {
                const componentesList = this.state.noMetNoMetList
                this.setState((prev) => ({ componentesList: prev.componentesList.concat(componentesList)}))
            })
    }

    componentWillMount() {
        if (this.props.location.state.componentesFaltan) {
            const componentesList = this.props.location.state.componentesFaltan
            this.setState(() => ({ componentesList }))
        } else {
            this.props.location.state.mineralesCantidad.forEach((m) => {
                if (m.fk_metal) {
                    this.getMetMetList(m.fk_metal)
                } else {
                    this.getNoMetNoMetList(m.fk_no_metal)
                }
            })
        }
        
        this.getMetalList()
    }

    aliadoNuevo = (e) => {
        const aliadoSelect = e
        let total = 0
        console.log('aliadoSelect', aliadoSelect)
        let mineralesMostrar = ''
        const mineralesCantidadFaltan = []
        const mineralesCantidadEstan = []
        const componentesEstan = []
        const componentesFaltan = []
        const aliMin = this.state.aliMinList.filter((am) => am.fk_aliado === aliadoSelect.clave)
        console.log('aliMin', aliMin)        
        this.state.componentesList.forEach((mc) => {
            console.log('hola')
            let esta = ''
            if (mc.fk_metal_1) {
                esta = aliMin.find((am) => am.fk_metal === mc.fk_metal_1)
            } else {
                esta = aliMin.find((am) => am.fk_nometal === mc.fk_nometal_1)
            }
            if (esta && esta !== '') {
                if (!mineralesCantidadEstan.find((e) => e.fk_metal === mc.fk_metal_2 && e.fk_no_metal === mc.fk_no_metal_2 )) {
                    mineralesCantidadEstan.push(this.props.location.state.mineralesCantidad.find((ml) => ml.fk_metal === mc.fk_metal_2 && ml.fk_no_metal === mc.fk_no_metal_2 ))
                }
                const nombre = this.state.mineralList.find((ml) => ml.clave === mc.fk_metal_1 || ml.clave === mc.fk_no_metal_1).nombre
                const cant = this.props.location.state.mineralesCantidad.find((c) => c.fk_metal === mc.fk_metal_2 && c.fk_no_metal === mc.fk_no_metal_2).cantidad
                mineralesMostrar = mineralesMostrar + cant * mc.cantidad + ' Kg de ' + nombre + ' a ' + esta.costo * cant * mc.cantidad  + ' | '
                componentesEstan.push(mc)
                total += esta.costo * cant * mc.cantidad
            } else {
                componentesFaltan.push(mc)
            }
        })
        
        componentesFaltan.forEach((f) => {
            if (!mineralesCantidadFaltan.find((e) => e.fk_metal === f.fk_metal_2 && e.fk_no_metal === f.fk_no_metal_2)) {
                mineralesCantidadFaltan.push(this.props.location.state.mineralesCantidad.find((m) => m.fk_metal === f.fk_metal_2 && m.fk_no_metal === f.fk_nometal_2))
            }
        })

        console.log('mineralesCantidadEstan', mineralesCantidadEstan)
        console.log('mineralesCantidadFaltan', mineralesCantidadFaltan)
        console.log('componentesEstan', componentesEstan)
        console.log('componentesFaltan', componentesFaltan)

        
        this.setState({ total, aliadoSelect, mineralesCantidadEstan, mineralesCantidadFaltan, componentesEstan, componentesFaltan, mineralesMostrar })
    }

    postDetCompraActual = (cantidad, costo_ind, fk_inventario, fk_compra, fk_alimin) => {
        postDetCompra(cantidad, costo_ind, fk_inventario, fk_compra, fk_alimin)
            .then((res) => {
                console.log('postDetCompra', cantidad)
            })
    }

    postCompraActual = () => {
        postCompra(this.state.total, moment(), this.state.aliadoSelect.clave)
        .then((res) => {
            const compraActual = res.data
            this.setState({ compraActual: compraActual[0] })
        })
        .then(() => {
            postCompraStatus(moment(), this.state.compraActual.clave, 1)
        })
        .then(() => {
            this.state.componentesEstan.forEach((c) => {
                let aliMin = ''
                if (c.fk_metal_1) {
                    aliMin = this.state.aliMinList.find((am) => am.fk_metal === c.fk_metal_1 && am.fk_aliado === this.state.aliadoSelect.clave)
                } else {
                    aliMin = this.state.aliMinList.find((am) => am.fk_nometal === c.fk_nometal_1 && am.fk_aliado === this.state.aliadoSelect.clave)
                }
                const cant = this.props.location.state.mineralesCantidad.find((mc) => mc.fk_metal === c.fk_metal_2 && mc.fk_no_metal === c.fk_no_metal_2).cantidad
                const total = aliMin.costo * cant * c.cantidad                
                this.postDetCompraActual(c.cantidad, total, null, this.state.compraActual.clave, aliMin.clave)
            })
        })
        .then(() => {
            if (this.state.componentesFaltan.length === 0) {
                history.push('/proyectos/nuevo')
            } else {
                history.push({
                    pathname: '/ventas/solicitud',
                    state: {
                        mineralesCantidad: this.state.mineralesCantidadFaltan,
                        componentesFaltan: this.state.componentesFaltan
                    }
                })
            }
        })
    }

    registrar_boton = () => {
        this.postCompraActual()
    } 
    
    render(){
        return(
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Solicitud de Compra</h1>

                <div className="form-nuevo-emp">
                    <div className='caja-dosColumns'>
                        <div className='emp-nombre'>
                            <p className='lugar-label'>Aliado:</p>
                            <Select
                                name="cliente-tipo"
                                placeholder='Selecciona aliado'
                                options={this.state.aliadoList}
                                getOptionLabel={(option) => option.nombre}
                                getOptionValue={(option) => option.nombre}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay aliados con ese nombre"}
                                value={this.state.aliadoSelect}
                                onChange={this.aliadoNuevo}
                            />
                        </div>
                    </div>
                    
                    <div className='solicitud-texto'>
                        <p>Estimado {this.state.aliadoSelect.nombre}, le hacemos la siguiente solicitud del siguiente mineral para una nueva.</p>
                        <p>{this.state.mineralesMostrar}</p>
                        <p>Gracias de antemano, nos encontramos a la orden para cualquier tipo de ayuda que necesite. Esperamos su pronta respuesta con el monto a pagar.</p>
                        <p className='miner'>MinerUCAB</p>
                        <div className='fecha-solicitud-caja'><p className='fecha-solicitud'>Caracas, {moment().format('DD/MM/YYYY')}</p></div>
                    </div>

                    
                </div>     

                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.registrar_boton} className='botones-nuevo'>Enviar</Button>  
                </div>

            </div>      
        )
    }

    atras_boton = () => {
        history.goBack()
    }

}

const mapStateToProps = (state) => ({
    solicitud: state.solicitud
})

export default connect(mapStateToProps)(EmpleadoNuevo)