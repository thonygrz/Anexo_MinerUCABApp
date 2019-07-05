import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import YacimientosEtapas from './YacimientosEtapas'
import { Form, Dropdown, ButtonToolbar, DropdownButton, Row, Col, Button, CustomToggle, CustomMenu } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { modificarYacimientos } from '../actions/yacimientos'
import { getMinerales } from '../utils/api'

const pruebaMineral = [{
    clave: '1',
    fk_yacimiento: '1',
    fk_mineral: '3',
    cantidad: 4
}]

class YacimientosModificar extends React.Component {
    state = {
        etapas: [{
            nombre: 'Etapa 1'
        }, {
            nombre: 'Etapa 2'
        }, {
            nombre: 'Etapa 3'
        }, {
            nombre: 'Etapa 4'
        }],
        mineralList: '',
        nombre: this.props.yacimiento.nombre ? this.props.yacimiento.nombre : '',
        superficie: this.props.yacimiento.superficie ? this.props.yacimiento.superficie : 0,
        fk_lugar: this.props.yacimiento.fk_lugar ? this.props.yacimiento.fk_lugar : '',
        //minerales: this.props.yacimiento.minerales ? this.props.yacimiento.minerales : [],
        minerales: '',
        estados: this.props.lugares ? this.props.lugares.filter((lugar) => lugar.tipo === 'Estado') : '',
        municipios: this.props.lugares ? this.props.lugares.filter((lugar) => lugar.tipo === 'Municipio') : '',
        parroquias: this.props.lugares ? this.props.lugares.filter((lugar) => lugar.tipo === 'Parroquia') : '',
        disableMunicipios: true,
        disableParroquias: true,
        mineralesDefault: [],
        estadoDefault: '',
        municipioDefault: '',
        parroquiaDefault: ''
    }

    getMineralList = () => {
        console.log('hola')
        getMinerales()
            .then((res) => {
                console.log(res);
                var mineralList = res.data;
                this.setState({ mineralList });
            })
            .then(() => {
                const mineralesDefault = []
                const minerales = pruebaMineral
                minerales.forEach(min => {
                    const m = this.state.mineralList.find((mineral) => mineral.clave === min.fk_mineral && min.fk_yacimiento === this.props.match.params.id)
                    if (m) {
                        mineralesDefault.push(m)
                    }
                })
                const parroquiaDefault = this.props.lugares.find((lugar) => lugar.tipo === 'Parroquia' && lugar.id === this.props.yacimiento.fk_lugar)
                const municipioDefault = this.props.lugares.find((lugar) => lugar.tipo === 'Municipio' && lugar.id === parroquiaDefault.fk_lugar)
                const estadoDefault = this.props.lugares.find((lugar) => lugar.tipo === 'Estado' && lugar.id === municipioDefault.fk_lugar)
                this.setState(() => ({ minerales, mineralesDefault, parroquiaDefault, municipioDefault, estadoDefault }))
                this.estado(estadoDefault)
                this.municipio(municipioDefault)
            })
            .catch((err) => console.log(err));
    }

    componentWillMount = () => {
        this.getMineralList()
    }

    modificarNombre = (e) => {
        const nombre = e.target.value
        this.setState(() => ({ nombre }))
    }

    modificarSuperficie = (e) => {
        const superficie = e.target.value
        this.setState(() => ({ superficie }))
    }

    estado = (e) => {
        const municipios = this.props.lugares.filter((lugar) => lugar.tipo === 'Municipio' && lugar.fk_lugar === e.id)
        this.setState(() => ({ municipios, disableMunicipios: false }))
    }
    municipio = (e) => {
        const parroquias = this.props.lugares.filter((lugar) => lugar.tipo === 'Parroquia' && lugar.fk_lugar === e.id)
        this.setState(() => ({ parroquias, disableParroquias: false }))
    }
    modificarFK_Lugar = (e) => {
        const fk_lugar = e.clave 
        this.setState({fk_lugar})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const yacimiento = {
            nombre: this.state.nombre,
            superficie: this.state.superficie,
            cantidad: this.state.cantidad
        }
        this.props.modificarYacimiento(this.props.yacimiento.id, yacimiento)
    }

    etapaNueva = () => {
        history.push('/yacimientos/etapas/nuevo')
    }

    botonAtras = () => {
        history.goBack()
    }

    modificarMineral = (e) => {
        const mineralesDefault = e
        let minerales = []
        if (!!mineralesDefault) {
            minerales = mineralesDefault.map((m) => {
                if (this.state.minerales.length > 0 && !!this.state.minerales.find((c) => c.fk_mineral === m.clave)) {
                    return this.state.minerales.find((c) => c.fk_mineral === m.clave)
                } else {
                    return ({ fk_yacimiento: this.props.match.params.id, fk_mineral: m.clave, cantidad: '' })
                }
            })
        }
        console.log(mineralesDefault)
        console.log(minerales)
        this.setState({ minerales, mineralesDefault })
    }

    modificarCantidad = (e, clave) => {
        const cantidad = e.target.value
        const minerales = []
        this.state.minerales.forEach((m) => {
            if (m.fk_mineral === clave) {
                minerales.push({ fk_yacimiento: this.props.match.params.id, fk_mineral: clave, cantidad })
            } else {
                minerales.push(m)
            }
        })
        this.setState(() => ({ minerales }))
    }

    render() {
        return (
            <div className='modificar-yacimiento content-container'>

                <h1 className='yac-modif-titulo'>Modificar Yacimiento</h1>

                <div className='form-modif-yac' onSubmit={this.onSubmit}>

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
                                        value={this.state.nombre}
                                        onChange={this.modificarNombre}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className='caja-multi-select'>
                        <p className='select-label'>Mineral:</p>
                        <Select
                            isMulti
                            name="minerales"
                            value={this.state.mineralesDefault}
                            options={this.state.mineralList}
                            getOptionLabel={(option) => option.nombre}
                            getOptionValue={(option) => option.nombre}
                            className="multi-select"
                            classNamePrefix="select"
                            noOptionsMessage={() => "No hay minerales con ese nombre"}
                            placeholder="Selecciona Mineral(es)"
                            onChange={this.modificarMineral}
                        />
                    </div>

                    {(this.state.mineralesDefault && this.state.mineralesDefault.length) > 0 &&
                        <div className='cantidad-mineral'>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesDefault.map((mineral, index) => {
                                    return (
                                        index % 3 === 0 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Cantidad de {mineral.nombre} (Kg):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        value={this.state.minerales.find((m) => m.fk_mineral === mineral.clave).cantidad}
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Cantidad'
                                                        onChange={(e) => this.modificarCantidad(e, mineral.clave)}
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesDefault.map((mineral, index) => {
                                    return (
                                        index % 3 === 1 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Cantidad de {mineral.nombre} (Kg):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        value={this.state.minerales.find((m) => m.fk_mineral === mineral.clave).cantidad}
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Cantidad'
                                                        onChange={(e) => this.modificarCantidad(e, mineral.clave)}
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesDefault.map((mineral, index) => {
                                    return (
                                        index % 3 === 2 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Cantidad de {mineral.nombre} (Kg):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        value={this.state.minerales.find((m) => m.fk_mineral === mineral.clave).cantidad}
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Cantidad'
                                                        onChange={(e) => this.modificarCantidad(e, mineral.clave)}
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
                            <p className='lugar-label'>Estado:</p>
                            <Select
                                name="lugar-estado"
                                value={this.state.estadoDefault}
                                options={this.state.estados}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay estados con ese nombre"}
                                placeholder="Selecciona Estado"
                                onChange={this.estado}
                            />
                        </div>
                        <div className="lugar-nuevo">
                            <p className='lugar-label'>Municipio:</p>
                            <Select
                                name="lugar-municipio"
                                value={this.state.municipioDefault}
                                options={this.state.municipios}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay municipios con ese nombre"}
                                placeholder="Selecciona Municipio"
                                onChange={this.municipio}
                            />
                        </div>
                        <div className="lugar-nuevo">
                            <p className='lugar-label'>Parroquia:</p>
                            <Select
                                name="lugar-parroquia"
                                value={this.state.parroquiaDefault}
                                options={this.state.parroquias}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay parroquias con ese nombre"}
                                placeholder="Selecciona Parroquia"
                                onChange={this.modificarFK_Lugar}
                            />
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
                                        value={this.state.superficie}
                                        onChange={this.modificarSuperficie}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>

                <Button variant="primary" onClick={this.onSubmit} className="guardar-cambios-yac">
                    Guardar Cambios
                </Button>

                <h1 className='etapas-lista-titulo'>Etapas</h1>

                <div className='etapas-columnas'>
                    <div className='left etapas-lista'>
                        {this.state.etapas.map((etapa, index) => {
                            return index % 3 === 0 && <YacimientosEtapas key={index} nombre={etapa.nombre} tipo='modificar' />
                        })}
                    </div>

                    <div className='center etapas-lista'>
                        {this.state.etapas.map((etapa, index) => {
                            return index % 3 === 1 && <YacimientosEtapas key={index} nombre={etapa.nombre} tipo='modificar' />
                        })}
                    </div>

                    <div className='right etapas-lista'>
                        {this.state.etapas.map((etapa, index) => {
                            return index % 3 === 2 && <YacimientosEtapas key={index} nombre={etapa.nombre} tipo='modificar' />
                        })}
                    </div>
                </div>
                <div className='caja-boton-yac-modif'>
                    <Button onClick={this.etapaNueva} className='boton-yac-modif'>Nueva Etapa</Button>
                </div>
                <div className='caja-boton-yac-modif modif-bottom'>
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

const mapDispatchToProps = (dispatch) => ({
    modificarYacimiento: (id, updates) => dispatch(modificarYacimientos(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(YacimientosModificar)