import React from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import { Button, Form, Col, Row } from 'react-bootstrap'
import Select from 'react-select'
import { getMetales, getNoMetales, getPresentacion, getMinPre } from '../utils/api'
import { guardarVenta } from '../actions/venta'


class VentasPage extends React.Component{
    state = {
        mineralList: [],
        metalList: [],
        noMetalList: [],
        mineralesSelect: [],
        cantidadMineral: [],
        minPreList: [],
        presentacionList: [],
        presentacionSelect: [],
        cantidadMineral: [],
        arrayPresentacionList: [],
        presentaciones: [],
    }

    getMinPreList = () => {
        getMinPre()
            .then((res) => {
                const minPreList = res.data
                this.setState({ minPreList })
            })
            .catch((err) => console.log(err)) 
    }

    getPresentacionList = () => {
        getPresentacion()
            .then((res) => {
                const presentacionList = res.data
                this.setState({ presentacionList })
            })
            .then(() => {
                this.getMinPreList()
            })
            .catch((err) => console.log(err))      
    }

    getNoMetalList = () => {
        getNoMetales()
            .then((res) => {
                console.log(res)
                const noMetalList = res.data
                this.setState({ noMetalList })
            })
            .then(() => {
                this.setState((prevState) => ({ mineralList: prevState.mineralList.concat(prevState.noMetalList) }))
            })
            .then(() => {
                this.getPresentacionList()
            })
            .catch((err) => console.log(err))
    }

    getMetalList = () => {
        getMetales()
            .then((res) => {
                console.log(res)
                const metalList = res.data
                this.setState({ metalList })
            })
            .then(() => {
                this.setState((prevState) => ({ mineralList: prevState.metalList }))
            })
            .then(() => {
                this.getNoMetalList()
            })
            .catch((err) => console.log(err))
    }

    componentWillMount() {
        this.getMetalList()
    }

    mineral = (e) => {
        const mineralesSelect = e
        const arrayPresentacionList = []
        let presentacionSelect = this.state.presentacionSelect
        let presentMin = ''
        if (mineralesSelect) {
            mineralesSelect.forEach((ms) => {
                const minPreList = this.state.minPreList.filter((m) => m.fk_metal === ms.clave || m.fk_no_metal === ms.clave)
                const presentacionListMin = []
                minPreList.forEach((mp) => {
                    presentacionListMin.push(this.state.presentacionList.find((p) => p.clave === mp.fk_presentacion))
                })
                if (!!ms.dureza) {
                    arrayPresentacionList.push({
                        fk_metal: ms.clave,
                        presentaciones: presentacionListMin
                    })
                } else {
                    arrayPresentacionList.push({
                        fk_no_metal: ms.clave,
                        presentaciones: presentacionListMin
                    })
                }
                if (presentacionSelect && presentacionSelect.length > 0) {
                    presentMin = presentacionSelect.find((ps) => ps.fk_metal === ms.clave || ps.fk_no_metal === ms.clave)
                    if (presentMin === undefined) {
                        if (!!ms.dureza) {
                            presentacionSelect.push({ fk_metal: ms.clave, presentaciones: [] })
                        } else {
                            presentacionSelect.push({ fk_no_metal: ms.clave, presentaciones: [] })
                        }
                    }
                } else {
                    if (presentMin === undefined) {
                        if (!!ms.dureza) {
                            presentacionSelect.push({ fk_metal: ms.clave, presentaciones: [] })
                        } else {
                            presentacionSelect.push({ fk_no_metal: ms.clave, presentaciones: [] })
                        }
                    }
                }
            })
        }
        let cantidadMineral = this.state.cantidadMineral
        if (!mineralesSelect) {
            cantidadMineral = []
        }

        if (cantidadMineral && cantidadMineral.length > 0) {
            this.state.mineralList.forEach((m) => {
                const min = mineralesSelect.find((s) => s.clave === m.clave)
                console.log(min)

                if (min === undefined) {
                    cantidadMineral = cantidadMineral.filter((cm) => cm.fk_metal !== m.clave && cm.fk_no_metal !== m.clave)
                    console.log('cantidadMineral u', cantidadMineral)

                } 
            })
        }
        if (!mineralesSelect) {
            presentacionSelect = []
        }
        if (presentacionSelect && presentacionSelect.length > 0) {
            this.state.mineralList.forEach((m) => {
                const min = mineralesSelect.find((s) => s.clave === m.clave)
                if (min === undefined) {
                    presentacionSelect = presentacionSelect.filter((cm) => cm.fk_metal !== m.clave && cm.fk_no_metal !== m.clave)
                }
            })
        }
        console.log('presentacionSelect', presentacionSelect)
        console.log('mineralesSelect', mineralesSelect)

        this.setState({ mineralesSelect, arrayPresentacionList, presentacionSelect, cantidadMineral })
    }

    presentacion = (e, minClave, dureza) => {
        let presentacionesList = []
        if (this.state.presentacionSelect && this.state.presentacionSelect.length > 0) {
            presentacionesList = this.state.presentacionSelect.map((ps) => {
                if (ps.fk_metal === minClave) {
                    if (e) {
                        return ({ fk_metal: minClave, presentaciones: e })
                    } else {
                        return ({ fk_metal: minClave, presentaciones: [] })
                    }
                } else if (ps.fk_no_metal === minClave) {
                    if (e) {
                        return ({ fk_no_metal: minClave, presentaciones: e })
                    } else {
                        return ({ fk_no_metal: minClave, presentaciones: [] })
                    }
                }else {
                    return ps
                }
            })
        } else if (!!dureza) {
            presentacionesList = [{ fk_metal: minClave, presentaciones: e }]
        } else {
            presentacionesList = [{ fk_no_metal: minClave, presentaciones: e }]
        }

        const presentacionSelect = presentacionesList
        //let presentacionesList = []
        let cantidadMineral = []
        if (!!presentacionSelect) {
            presentacionSelect.forEach((p) => {
                if (p.presentaciones) {
                    p.presentaciones.forEach((ps) => {
                        const minPreList = this.state.minPreList.find((m) => (m.fk_metal === minClave || m.fk_no_metal === minClave) && m.fk_presentacion === ps.clave)
                        if (minPreList) {
                            if (this.state.cantidadMineral.length > 0 && !!this.state.cantidadMineral.find((c) => (c.fk_metal === minClave || c.fk_no_metal === minClave) && c.fk_presentacion === ps.clave)) {
                                cantidadMineral.push(this.state.cantidadMineral.find((c) => (c.fk_metal === minClave || c.fk_no_metal === minClave) && c.fk_presentacion === ps.clave))
                            } else if (!!dureza) {
                                cantidadMineral.push({ fk_metal: minClave, fk_presentacion: ps.clave, cantidad: '', costo: 0, costo_unitario: minPreList.costo, fk_minpre: minPreList.clave })
                            } else {
                                cantidadMineral.push({ fk_no_metal: minClave, fk_presentacion: ps.clave, cantidad: '', costo: 0, costo_unitario: minPreList.costo, fk_minpre: minPreList.clave })
                            }
                        } else {
                            cantidadMineral = cantidadMineral.concat(this.state.cantidadMineral.filter((c) => c.fk_presentacion === ps.clave))
                        }


                    })
                }
            })
        }



        console.log('presentacionSelect', presentacionSelect)
        
        console.log('cantidadMineral', cantidadMineral)
        this.setState({ presentacionSelect, cantidadMineral })
    }

    nuevoCantidad = (e, minClave, preClave) => {
        const cantidad = e.target.value
        const min = []
        this.state.cantidadMineral.forEach((c) => {
            if (c.fk_metal === minClave && c.fk_presentacion === preClave) {
                const costo = c.costo_unitario * cantidad
                min.push({ fk_metal: minClave, fk_presentacion: preClave, cantidad, costo, costo_unitario: c.costo_unitario, fk_minpre: c.fk_minpre })
            } else if (c.fk_no_metal === minClave && c.fk_presentacion === preClave) {
                const costo = c.costo_unitario * cantidad
                min.push({ fk_no_metal: minClave, fk_presentacion: preClave, cantidad, costo, costo_unitario: c.costo_unitario, fk_minpre: c.fk_minpre })
            }  else {
                min.push(c)
            }
        })
        this.setState(() => ({ cantidadMineral: min }))
    }

    total = () => {
        let total = 0
        if (this.state.cantidadMineral && this.state.cantidadMineral.length > 0) {
            this.state.cantidadMineral.forEach((c) => {
                total = total + c.cantidad * c.costo_unitario
            })
        }
        this.setState({ total })
    }

    render(){
        return(
            <div className="ventas content-container">

                <div className="caja-botones-nuevo">
                    <Button onClick={this.historial} className='botones-nuevo'>Historial de Ventas</Button>
                </div>

                <div className="form-nuevo-ali">
                    <div className='caja-multi-select min-select-comp'>
                        <p className='select-label'>Mineral:</p>
                        <Select
                            isMulti
                            name="minerales"
                            options={this.state.mineralList}
                            getOptionLabel={(option) => option.nombre}
                            getOptionValue={(option) => option.nombre}
                            className="multi-select"
                            classNamePrefix="select"
                            noOptionsMessage={() => "No hay minerales con ese nombre"}
                            placeholder="Selecciona Mineral(es)"
                            onChange={this.mineral}
                        />
                    </div>

                    {(this.state.mineralesSelect && this.state.mineralesSelect.length) > 0 &&
                        <div className='cantidad-mineral-ventas'>
                            <div className='cantidad-mineral-ventas'>
                                {this.state.mineralesSelect.map((mineral, index) => {
                                    return (
                                        <div key={mineral.clave + index}>
                                            <div className="caja-multi-select min-select-comp" >
                                                <p className='lugar-label'>Presentación de {mineral.nombre}:</p>
                                                <Select
                                                    isMulti
                                                    name="presentacion"
                                                    options={this.state.arrayPresentacionList.find((a) => (a.fk_metal === mineral.clave || a.fk_no_metal === mineral.clave)).presentaciones}
                                                    className="single-select-v"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay presentaciones con ese nombre"}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    placeholder="Selecciona Presentación"
                                                    onChange={(e) => this.presentacion(e, mineral.clave, mineral.dureza)}
                                                />
                                            </div>
                                            {(this.state.presentacionSelect && this.state.presentacionSelect.length) > 0 &&

                                                <div className='cantidad-mineral-ventas'>
                                                    <div className='cantidad-mineral-ventas'>
                                                        {this.state.presentacionSelect.find((p) => (p.fk_metal === mineral.clave || p.fk_no_metal === mineral.clave)).presentaciones.map((presentacion, index) => {
                                                            return (
                                                                <div key={mineral.clave + presentacion.clave + index}>
                                                                    <Form className="yacimiento-nuevo-nombre">
                                                                        <Form.Group as={Row} controlId='formPlaintextText'>
                                                                            <Form.Label column sm="9">Cantidad de {mineral.nombre} en {presentacion.nombre} (kg):</Form.Label>
                                                                            <Col sm='3'>
                                                                                <Form.Control
                                                                                    required
                                                                                    size='lg'
                                                                                    type='text'
                                                                                    value={this.state.cantidadMineral.find((c) => (c.fk_metal === mineral.clave || c.fk_no_metal === mineral.clave) && c.fk_presentacion === presentacion.clave) && this.state.cantidadMineral.find((c) => (c.fk_metal === mineral.clave || c.fk_no_metal === mineral.clave) && c.fk_presentacion === presentacion.clave).cantidad}
                                                                                    className='yac-inputs'
                                                                                    placeholder='Cantidad'
                                                                                    onChange={(e) => this.nuevoCantidad(e, mineral.clave, presentacion.clave)}
                                                                                />
                                                                            </Col>
                                                                            <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                                                        </Form.Group>
                                                                    </Form>
                                                                    <Form className="yacimiento-nuevo-nombre">
                                                                        <Form.Group as={Row} controlId='formPlaintextText'>
                                                                            <Form.Label column sm="9">Costo de {mineral.nombre} en {presentacion.nombre} (Bs):</Form.Label>
                                                                            <Col sm='3'>
                                                                                <Form.Control
                                                                                    required
                                                                                    size='lg'
                                                                                    type='text'
                                                                                    value={this.state.cantidadMineral.find((c) => (c.fk_metal === mineral.clave || c.fk_no_metal === mineral.clave) && c.fk_presentacion === presentacion.clave) && this.state.cantidadMineral.find((c) => (c.fk_metal === mineral.clave || c.fk_no_metal === mineral.clave) && c.fk_presentacion === presentacion.clave).costo}
                                                                                    className='yac-inputs'
                                                                                    placeholder='Costo'
                                                                                    readOnly
                                                                                />
                                                                            </Col>
                                                                            <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                                                        </Form.Group>
                                                                    </Form>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>

                <div className="caja-facturar">
                    <Button className='botones-nuevo' onClick={this.total}>Calcular Total</Button>
                    <div className="emp-nombre">
                        <Form className="empleado-nombre">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="2">Factura:</Form.Label>
                                <Col sm='10'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Monto'
                                        readOnly
                                        value={this.state.total}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>

                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Cancelar</Button>
                    <Button onClick={this.cliente} className='botones-nuevo'>Facturar</Button>
                </div>

            </div>
        )
    }

    atras_boton = () => {
        history.goBack()
    }

    cliente = () => {
        this.total()
        this.props.guardarVentaActual(this.state.cantidadMineral)
        history.push({
            pathname: '/ventas/cliente',
            state: {
                total: this.state.total
            }
        })
    }

    historial = () => {
        history.push('/ventas/historial')
    }
}

const mapDispatchToProps = (dispatch) => ({
    guardarVentaActual: (venta) => dispatch(guardarVenta(venta))
})

export default connect(undefined, mapDispatchToProps)(VentasPage)