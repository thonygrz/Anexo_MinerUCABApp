import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import YacimientosEtapas from './YacimientosEtapas'
import { Form, Dropdown, ButtonToolbar, DropdownButton, Row, Col, Button, CustomToggle, CustomMenu } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import {
    getLugar,
    getNoMetales,
    getMetales,
    getOneYacimiento,
    getYanMin,
    getEtapasY, } from '../utils/api'

const pruebaMineral = [{
    clave: '1',
    fk_yacimiento: '1',
    fk_mineral: '3',
    cantidad: 4
}]

class YacimientosConsultar extends React.Component {
    state = {
        etapas: [],
        estadoDefault: '',
        municipioDefault: '',
        parroquiaDefault: '',
        yacimiento: '',
        noMetalList: [],
        mineralList: [],
        metalList: [],
        minerales: [],
        mineralesDefault: [],
        mineralesDefArray: [],
        parroquiaFKLugar: '',
        municipioFKLugar: '',
    }

    getEsta = (fk) => {
        getLugar(fk)
            .then((res) => {
                const estado = res.data[0].nombre
                this.setState({ estadoDefault: estado })
            })
            .catch((err) => console.log(err))
    }

    getMuni = (fk) => {
        getLugar(fk)
            .then((res) => {
                const municipio = res.data[0]
                this.setState({ municipioDefault: municipio.nombre, municipioFKLugar: municipio.fk_lugar })
            })
            .then(() => {
                this.getEsta(this.state.municipioFKLugar)
            })
            .catch((err) => console.log(err))
    }

    lugarCascade = () => {
        getLugar(this.state.yacimiento.fk_lugar)
            .then((res) => {
                const parroquia = res.data[0]
                this.setState({ parroquiaDefault: parroquia.nombre, parroquiaFKLugar: parroquia.fk_lugar })
            })
            .then(() => {
                this.getMuni(this.state.parroquiaFKLugar)
            })
            .catch((err) => console.log(err))
    }

    getNoMetalList = () => {
        getNoMetales()
            .then((res) => {
                const noMetalList = res.data
                this.setState({ noMetalList })
            })
            .then(() => {
                this.setState((prevState) => ({ mineralList: prevState.mineralList.concat(prevState.noMetalList) }))
            })
            .then(() => {
                const mineralesDefArray = []
                const minerales = this.state.yanMinList
                minerales.forEach(min => {
                    let m
                    if (min.fk_metal) {
                        m = this.state.metalList.find((mineral) => mineral.clave === min.fk_metal && min.fk_yacimiento === parseInt(this.props.match.params.id, 10))
                    } else {
                        m = this.state.noMetalList.find((mineral) => mineral.clave === min.fk_nometal && min.fk_yacimiento === parseInt(this.props.match.params.id, 10))
                    }
                    
                    if (m) {
                        mineralesDefArray.push(m)
                    }
                })
                let mineralesDefault = ''
                mineralesDefArray.forEach((m, i) => {
                    if (i === 0) {
                        mineralesDefault = m.nombre
                    } else if (i < mineralesDefArray.length) {
                        mineralesDefault = mineralesDefault + ' | ' + m.nombre
                    } else {
                        mineralesDefault = mineralesDefault + ' ' + m.nombre
                    }
                })
                this.setState(() => ({
                    minerales,
                    mineralesDefault,
                    mineralesDefArray
                }))
            })
            .then(() => {
                this.lugarCascade()
            })
            .catch((err) => console.log(err))
    }

    getMetalList = () => {
        getMetales()
            .then((res) => {
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

    getYacimiento = () => {
        getOneYacimiento(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                const yacimiento = res.data
                this.setState({ yacimiento: yacimiento[0] })
            })
            .then(() => {
                this.getMetalList()
            })
    }

    getYanMinList = () => {
        getYanMin(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                const yanMinList = res.data
                this.setState({ yanMinList })
            })
            .then(() => {
                this.getYacimiento()
            })
    }

    getEtapasList = () => {
        getEtapasY(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                const etapas = res.data
                const fk_explotacion = res.data[0].fk_explotacion
                const etapasDef = etapas.filter((e) => e.fk_explotacion === fk_explotacion)

                this.setState({etapas: etapasDef})
            })
            .then(() => {
                this.getYanMinList()
            })
    } 

    componentWillMount = () => {
        this.getEtapasList()
    }

    etapaNueva = () => {
        history.push('/yacimientos/etapas/nuevo')
    }

    botonAtras = () => {
        history.goBack()
    }

    render() {
        return (
            <div className='modificar-yacimiento content-container'>

                <h1 className='yac-modif-titulo'>Consultar Yacimiento</h1>

                <div className='form-modif-yac'>

                    <div className="yac-nombre">
                        <Form className="yacimiento-modif-nombre">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="2">Nombre:</Form.Label>
                                <Col sm='10'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Nombre del yacimiento'
                                        value={this.state.yacimiento.nombre}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="yac-minerales">
                        <Form className="yacimiento-modif-minerales">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="2">Mineral(es):</Form.Label>
                                <Col sm='10'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Minerales'
                                        value={this.state.mineralesDefault}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>

                    {(this.state.mineralesDefArray && this.state.mineralesDefArray.length) > 0 &&
                        <div className='cantidad-mineral'>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesDefArray.map((mineral, index) => {
                                    return (
                                        index % 3 === 0 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Cantidad de {mineral.nombre} (Kg):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Cantidad'
                                                        value={this.state.minerales.find((m) => (m.fk_metal === mineral.clave || m.fk_nometal === mineral.clave)).cantidad}
                                                        readOnly
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesDefArray.map((mineral, index) => {
                                    return (
                                        index % 3 === 1 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Cantidad de {mineral.nombre} (Kg):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Cantidad'
                                                        value={this.state.minerales.find((m) => (m.fk_metal === mineral.clave || m.fk_nometal === mineral.clave)).cantidad}
                                                        readOnly
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesDefArray.map((mineral, index) => {
                                    return (
                                        index % 3 === 2 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Cantidad de {mineral.nombre} (Kg):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Cantidad'
                                                        value={this.state.minerales.find((m) => (m.fk_metal === mineral.clave || m.fk_nometal === mineral.clave)).cantidad}
                                                        readOnly
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                        </div>
                    }

                    <div className="caja-lugar">
                        <div className="lugar-nuevo">
                            <Form className="yacimiento-modif-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="4">Estado:</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='Estado'
                                            value={this.state.estadoDefault}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="lugar-nuevo">
                            <Form className="yacimiento-modif-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="4">Municipio:</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='Municipio'
                                            value={this.state.municipioDefault}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="lugar-nuevo">
                            <Form className="yacimiento-modif-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="4">Parroquia:</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='Parroquia'
                                            value={this.state.parroquiaDefault}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className='yac-sup'>
                        <Form className="yacimiento-superficie">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="5">Superficie (m<sup>2</sup>):</Form.Label>
                                <Col sm='7'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Superficie'
                                        value={this.state.yacimiento.metros}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>

                <h1 className='etapas-lista-titulo'>Etapas</h1>

                <div className='etapas-columnas'>
                    <div className='left etapas-lista'>
                        {this.state.etapas.map((etapa, index) => {
                            return index % 3 === 0 && <YacimientosEtapas key={index} clave_y={parseInt(this.props.match.params.id, 10)} clave_e={etapa.clave} nombre={etapa.nombre} etapa={etapa} yacimiento={this.state.yacimiento} tipo='consultar' />
                        })}
                    </div>

                    <div className='center etapas-lista'>
                        {this.state.etapas.map((etapa, index) => {
                            return index % 3 === 1 && <YacimientosEtapas key={index} clave_y={parseInt(this.props.match.params.id, 10)} clave_e={etapa.clave} nombre={etapa.nombre} etapa={etapa} yacimiento={this.state.yacimiento} tipo='consultar' />
                        })}
                    </div>

                    <div className='right etapas-lista'>
                        {this.state.etapas.map((etapa, index) => {
                            return index % 3 === 2 && <YacimientosEtapas key={index} clave_y={parseInt(this.props.match.params.id, 10)} clave_e={etapa.clave} nombre={etapa.nombre} etapa={etapa} yacimiento={this.state.yacimiento} tipo='consultar' />
                        })}
                    </div>
                </div>
                <div className='caja-boton-yac-modif'>
                    <Button onClick={this.botonAtras} variant="secondary" className='boton-yac-modif'>Atrás</Button>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, props) => ({
    yacimiento: state.yacimientos.find((yacimiento) => yacimiento.id === props.match.params.id),
    lugares: state.lugares,
    minerales: state.minerales
})

export default connect(mapStateToProps)(YacimientosConsultar)