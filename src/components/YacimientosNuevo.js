import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import {
    getLugares,
    getNoMetales,
    getMetales } from '../utils/api'

class YacimientosNuevo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mineralList: [],
            metalList: [],
            noMetalList:[],
            nombre: '',
            netapas: '',
            metros: '',
            fk_lugar: '',
            mineralesSelect: [],
            cantidadMineral: [],
            estados: [],
            municipios: [],
            parroquias: [],
            disableMunicipios: true,
            disableParroquias: true,
        };
    }

    getLugaresList = () => {
        getLugares()
            .then((res) => {
                console.log(res);
                const lugaresList = res.data;
                this.setState({ lugaresList })
            })
            .then(() => {
                const estados = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'ESTADO') : []
                const municipios = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO') : []
                const parroquias = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'PARROQUIA') : []
                this.setState({ estados, municipios, parroquias })
            })
            .catch((err) => console.log(err));
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
                this.getLugaresList()
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

    componentWillMount = () => {
        this.getMetalList();
    }

    numeroEtapas = (e) => {
        const netapas = e.target.value
        this.setState(() => ({ netapas }))
    }
    nuevoNombre = (e) => {
        const nombre = e.target.value
        this.setState(() => ({ nombre }))
    }

    nuevoNEtapas = (e) => {
        const netapas = e.target.value
        this.setState(() => ({ netapas }))
    }

    nuevoSuperficie = (e) => {
        const metros = e.target.value
        this.setState(() => ({ metros }))
    }

    nuevoFK_Lugar = (e) => {
        const fk_lugar = e.clave
        this.setState(() => ({ fk_lugar }))
    }

    siguiente_boton = () => {
        const yacimiento = {
            nombre: this.state.nombre,
            metros: this.state.metros,
            fk_lugar: this.state.fk_lugar,
        }

        if (this.state.netapas > 0) {
            history.push({
                pathname: '/yacimientos/etapas/nuevo',
                state: {
                    numeroEtapa: 1,
                    netapas: this.state.netapas,
                    yacimiento: yacimiento,
                    yan_min: this.state.cantidadMineral,
                    etapas: [],
                }
            })
        }
    }

    estado = (e) => {
        const municipios = this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.fk_lugar === e.clave)
        this.setState(() => ({ municipios, disableMunicipios: false }))
    }
    municipio = (e) => {
        const parroquias = this.state.lugaresList.filter((lugar) => lugar.tipo === 'PARROQUIA' && lugar.fk_lugar === e.clave)
        this.setState(() => ({ parroquias, disableParroquias: false }))
    }

    mineralNuevo = (e) => {
        const mineralesSelect = e
        let cantidadMineral = []
        if (!!mineralesSelect) {
            cantidadMineral = mineralesSelect.map((m) => {
                if (!!m.dureza) {
                    if (this.state.cantidadMineral.length > 0 && !!this.state.cantidadMineral.find((c) => c.fk_metal === m.clave)) {
                        return this.state.cantidadMineral.find((c) => c.fk_metal === m.clave)
                    } else {
                        return ({ fk_metal: m.clave, cantidad: '' })
                    }
                } else {
                    if (this.state.cantidadMineral.length > 0 && !!this.state.cantidadMineral.find((c) => c.fk_nometal === m.clave)) {
                        return this.state.cantidadMineral.find((c) => c.fk_nometal === m.clave)
                    } else {
                        return ({ fk_nometal: m.clave, cantidad: '' })
                    }
                }
            })
        }
        this.setState({ mineralesSelect, cantidadMineral })
    }

    nuevoCantidadMineral = (e, clave) => {
        const cantidad = e.target.value
        const mineral = []
        this.state.cantidadMineral.forEach((c) => {
            if (c.fk_metal === clave) {
                mineral.push({ fk_metal: clave, cantidad })
            } else if (c.fk_nometal === clave) { 
                mineral.push({ fk_nometal: clave, cantidad })
            } else {
                mineral.push(c)
            }
        })
        this.setState(() => ({ cantidadMineral: mineral }))
    }
    render() {
        return (
            <div className="nuevo-yacimiento content-container">

                <h1 className='yac-nuevo-titulo'>Nuevo Yacimiento</h1>

                <div className="form-nuevo-yac">
                    <div className='yac-nombre-nuevo'>
                        <Form className="yacimiento-nuevo-nombre">
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
                                        onChange={this.nuevoNombre}
                                    />
                                </Col>
                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className='caja-multi-select'>
                        <p className='select-label'>Mineral:</p>
                        <Select
                            isMulti
                            name="minerales"
                            options={this.state.mineralList}
                            getOptionLabel={(option) => option.nombre}
                            getOptionValue={(option) => option.clave}
                            className="multi-select"
                            classNamePrefix="select"
                            noOptionsMessage={() => "No hay minerales con ese nombre"}
                            placeholder="Selecciona Mineral(es)"
                            onChange={this.mineralNuevo}
                        />
                    </div>

                    {(this.state.mineralesSelect && this.state.mineralesSelect.length) > 0 &&
                        <div className='cantidad-mineral'>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesSelect.map((mineral, index) => {
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
                                                        value={this.state.cantidadMineral.find((c) => c.fk_metal === mineral.clave || c.fk_nometal === mineral.clave).cantidad}
                                                        onChange={(e) => this.nuevoCantidadMineral(e, mineral.clave)}
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesSelect.map((mineral, index) => {
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
                                                        value={this.state.cantidadMineral.find((c) => c.fk_metal === mineral.clave || c.fk_nometal === mineral.clave).cantidad}
                                                        onChange={(e) => this.nuevoCantidadMineral(e, mineral.clave)}
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesSelect.map((mineral, index) => {
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
                                                        value={this.state.cantidadMineral.find((c) => c.fk_metal === mineral.clave || c.fk_nometal === mineral.clave).cantidad}
                                                        onChange={(e) => this.nuevoCantidadMineral(e, mineral.clave)}
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
                                options={this.state.estados}
                                getOptionLabel={(option) => option.nombre}
                                getOptionValue={(option) => option.clave}
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
                                options={this.state.municipios}
                                getOptionLabel={(option) => option.nombre}
                                getOptionValue={(option) => option.clave}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay municipios con ese nombre"}
                                placeholder="Selecciona Municipio"
                                onChange={this.municipio}
                                isDisabled={this.state.disableMunicipios}
                            />
                        </div>
                        <div className="lugar-nuevo">
                            <p className='lugar-label'>Parroquia:</p>
                            <Select
                                name="lugar-parroquia"
                                options={this.state.parroquias}
                                getOptionLabel={(option) => option.nombre}
                                getOptionValue={(option) => option.clave}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay parroquias con ese nombre"}
                                placeholder="Selecciona Parroquia"
                                isDisabled={this.state.disableParroquias}
                                onChange={this.nuevoFK_Lugar}
                            />
                        </div>
                    </div>


                    <div className="caja-eta-sup-cant">
                        <div className='yac-netapas'>
                            <Form className="yacimiento-netapas">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="5">Número de etapas:</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='N° Etapas'
                                            value={this.state.netapas}
                                            onChange={this.nuevoNEtapas}
                                        />
                                    </Col>
                                    <Form.Control.Feedback className='login-error' type='invalid'>Número de etapas inválido.</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="yac-nuevo-sup">
                            <Form className="yacimiento-nuevo-superficie">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="5">Superficie (m<sup>2</sup>):</Form.Label>
                                    <Col sm='7'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='Superficie'
                                            value={this.state.metros}
                                            onChange={this.nuevoSuperficie}
                                        />
                                    </Col>
                                    <Form.Control.Feedback className='login-error' type='invalid'>Superficie inválida.</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className='caja-botones-nuevo'>
                        <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                        <Button onClick={this.siguiente_boton} className='botones-nuevo'>Siguiente</Button>
                    </div>
                </div>
            </div>
        )
    }

    atras_boton = () => {
        history.goBack()
    }
}

const mapStateToProps = (state) => ({
    minerales: state.minerales,
    lugares: state.lugares
})

export default connect(mapStateToProps)(YacimientosNuevo)