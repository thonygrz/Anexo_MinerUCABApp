import React from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import Tabla from './Tabla'
import { guardarCargos } from '../actions/cargos' 
import { guardarMaquinas } from '../actions/maquinas' 
import {
    getTipoMaquinaria,
    getCargos,
    postYacimiento,
    postYanMin,
    postExplotacion,
    postEtapa,
    postFase,
    postFaseCargo,
    postFaseTipoMaquinaria, } from '../utils/api'

class FaseNueva extends React.Component {
    state ={
        columnsCargos: [{
            title: 'ID',
            data: 'clave'
        }, {
            title: 'Cargo',
            width: 500,
            data: 'nombre'
        }, {
            title: 'Cantidad',
            width: 500,
            defaultContent: '<input type="text" id="cant" name="cantidad" placeholder="Escribe la cantidad">'
        }, {
            title: 'Precio x Unidad (Bs)',
            width: 500,
            defaultContent: '<input type="text" id="cost" name="costo" placeholder="Escribe el costo">'
        }],
        columnsMaquinas: [{
            title: 'ID',
            data: 'clave'
        }, {
            title: 'Máquina',
            width: 500,
            data: 'nombre'
        }, {
            title: 'Cantidad',
            width: 500,
            defaultContent: '<input type="text" id="cant" name="cantidad" placeholder="Escribe la cantidad">'
        }, {
            title: 'Precio x Unidad (Bs)',
            width: 500,
            defaultContent: '<input type="text" id="cost" name="costo" placeholder="Escribe el costo">'
        }],
        nombre: '',
        duracion: '',
        cargos: [],
        tipoMaquinaria: [],
        daleYanMin: true,
        daleEtapa: true,
        daleFase: true,
        daleCargo: true,
        daleMaquina: true,
    }

    getTipoMaquinariaList = () => {
        getTipoMaquinaria()
            .then((res) => {
                const tipoMaquinaria = res.data
                this.setState({tipoMaquinaria})
            })
            .then(() => {
                this.props.guardarMaquinas(this.state.tipoMaquinaria)
            })
    }

    getCargosList = () => {
        getCargos()
            .then((res) => {
                const cargos = res.data
                this.setState({ cargos })
            })
            .then(() => {
                this.props.guardarCargos(this.state.cargos)
            })
            .then(() => {
                this.getTipoMaquinariaList()
            })
    }

    componentWillMount = () => {
        this.getCargosList()
    }

    nuevoNombre = (e) => {
        const nombre = e.target.value
        this.setState({ nombre })
    }

    nuevaDuracion = (e) => {
        const duracion = e.target.value
        this.setState({ duracion })
    }

    atras_boton = () => {
        history.goBack()
    }

    siguiente_boton = () => {
        console.log(this.props.location.state.nfases)
        console.log(this.props.location.state.etapas)
        console.log(this.props.location.state.yacimiento)
        console.log(this.props.location.state.fases)
        console.log(this.props.location.state.etapa)

        if (this.props.location.state.nfases > 1) {
            const fase = {
                numero: this.props.location.state.numeroFase + 1,
                nombre: this.state.nombre,
                duracion: this.state.duracion,
                cargos: this.props.cargos,
                maquinas: this.props.maquinas
            }
            history.push({
                pathname: '/yacimientos/fases/nuevo',
                state: {
                    netapas: this.props.location.state.netapas,
                    nfases: this.props.location.state.nfases - 1,
                    numeroEtapa: this.props.location.state.numeroEtapa,
                    numeroFase: this.props.location.state.numeroFase + 1,
                    yacimiento: this.props.location.state.yacimiento,
                    yan_min: this.props.location.state.yan_min,
                    etapas: this.props.location.state.etapas,
                    etapa: this.props.location.state.etapa,
                    fases: this.props.location.state.fases.concat(fase)
                }
            })
        } else if (this.props.location.state.netapas > 1) {
            const fase = {
                numero: this.props.location.state.numeroFase,
                nombre: this.state.nombre,
                duracion: this.state.duracion,
                cargos: this.props.cargos,
                maquinas: this.props.maquinas
            }
            console.log(this.props.location.state.fases)
            const fases = this.props.location.state.fases.concat(fase)
            const etapas = {
                ...this.props.location.state.etapa,
                fases: fases
            }
            history.push({
                pathname: '/yacimientos/etapas/nuevo',
                state: {
                    netapas: this.props.location.state.netapas - 1,
                    numeroEtapa: this.props.location.state.numeroEtapa + 1,
                    numeroFase: 1,
                    yacimiento: this.props.location.state.yacimiento,
                    yan_min: this.props.location.state.yan_min,
                    etapas: this.props.location.state.etapas.concat(etapas),
                }
            })
        } else {
            const fase = {
                numero: this.props.location.state.numeroFase,
                nombre: this.state.nombre,
                duracion: this.state.duracion,
                cargos: this.props.cargos,
                maquinas: this.props.maquinas
            }
            const etapas = {
                ...this.props.location.state.etapa,
                fases: this.props.location.state.fases.concat(fase)
            }
            const etapasSelect = this.props.location.state.etapas.concat(etapas)
            this.setState({ etapasSelect })
            console.log(this.props.location.state.yacimiento)
            console.log(etapasSelect)
            console.log(this.props.location.state.etapas.concat(etapas))

            this.postYacimientoActual(etapasSelect)
        }
    } 
    postCargosActuales = (costo, cantidad, claveFase, claveCargo) => {
        postFaseCargo(costo, cantidad, claveFase, claveCargo)
    }

    postMaquinasActuales = (costo, cantidad, claveFase, claveMaquina) => {
        postFaseTipoMaquinaria(costo, cantidad, claveFase, claveMaquina)
    }

    postFaseActual = (claveEtapa, nombre, numero, duracion, cargos, maquinas) => {
        postFase(nombre, numero, duracion, null, 1, claveEtapa)
            .then((res) => {
                const claveFase = res.data
                cargos.forEach((c) => {
                    if (c.cantidad && c.cantidad > 0 && c.costo && c.costo > 0) {
                        this.postCargosActuales(c.costo, c.cantidad, claveFase[0].clave, c.clave)
                    }
                })
                maquinas.forEach((c) => {
                    if (c.cantidad && c.cantidad > 0 && c.costo && c.costo > 0) {
                        this.postMaquinasActuales(c.costo, c.cantidad, claveFase[0].clave, c.clave)
                    }
                })
            })
            .then(() => {
                history.push('/yacimientos')
            })
    }

    postEtapaActual = (nombre, numero, duracion, fases, claveExplotacion) => {
        postEtapa(nombre, numero, duracion, null, claveExplotacion, 1)
            .then((res) => {
                const claveEtapa = res.data
                fases.forEach((f) => {
                    this.postFaseActual(claveEtapa[0].clave, f.nombre, f.numero, f.duracion, f.cargos, f.maquinas)
                })
            }) 
    }

    postExplotacionActual = (etapasSelect, claveYanMin) => {
        postExplotacion(0, null, null, claveYanMin, 1, null, null, null)
            .then((res) => {
                const claveExplotacion = res.data
                etapasSelect.forEach((e) => {
                    let duracion = 0
                    e.fases.forEach((f) => {
                        duracion += parseInt(f.duracion, 10)
                    })
                    this.postEtapaActual(e.nombre, e.numero, duracion, e.fases, claveExplotacion[0].clave)
                })
            })
    }

    postYanMinActual = (etapasSelect, claveYacimiento, cantidad, fk_nometal, fk_metal) => {
        postYanMin(cantidad, fk_nometal, fk_metal, claveYacimiento)
            .then((res) => {
                const claveYanMin = res.data
                console.log(claveYanMin)
                this.postExplotacionActual(etapasSelect, claveYanMin[0].clave)
            })
    }

    postYacimientoActual = (etapasSelect) => {
        postYacimiento(this.props.location.state.yacimiento.nombre, this.props.location.state.yacimiento.metros, this.props.location.state.yacimiento.fk_lugar)
            .then((res) => {
                const claveYacimiento = res.data
                this.props.location.state.yan_min.forEach((y) => {
                    this.postYanMinActual(etapasSelect, claveYacimiento[0].clave, y.cantidad, y.fk_nometal, y.fk_metal)
                })
            }) 
    }

    render(){
        return(
            <div className="nueva-fase content-container">
                <h1 className='fase-titulo'>Etapa {this.props.location.state.numeroEtapa} - Fase {this.props.location.state.numeroFase}</h1>
                <div className="caja-fase">
                    <div className="fase-nombre">
                        <Form className="fase-nueva-nombre"> 
                            <Form.Group as={Row} controlId='formPlaintextText'>
                            <Form.Label className="label-nombre" column sm="5">Nombre de la Fase:</Form.Label>
                            <Col sm='7'>
                                <Form.Control  
                                    required
                                    size='lg'
                                    type='text'
                                    className='yac-inputs'
                                    placeholder='Nombre Fase' 
                                    onChange={this.nuevoNombre}
                                />
                            </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="fase-duracion">
                        <Form className="fase-nueva-duracion"> 
                            <Form.Group as={Row} controlId='formPlaintextText'>
                            <Form.Label className="label-nombre" column sm="4">Duración (Meses):</Form.Label>
                            <Col sm='8'>
                                <Form.Control  
                                    required
                                    size='lg'
                                    type='text'
                                    className='yac-inputs'
                                    placeholder='Duración' 
                                    onChange={this.nuevaDuracion}
                                />
                            </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                {((this.state.cargos && this.state.cargos.length > 0) && (this.state.tipoMaquinaria && this.state.tipoMaquinaria.length > 0)) && 
                    <div>
                        <h1 className='subtitulo'>Cargos</h1>
                        <Tabla data={this.state.cargos} columns={this.state.columnsCargos} elemento='cargos' tipo='crear' />
                        <h1 className='subtitulo'>Maquinaria</h1>
                        <Tabla data={this.state.tipoMaquinaria} columns={this.state.columnsMaquinas} elemento='maquinaria' tipo='crear' />
                    </div>
                }
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.siguiente_boton} className='botones-nuevo'>Siguiente</Button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    cargos: state.cargos,
    maquinas: state.maquinas
})

const mapDispatchToProps = (dispatch) => ({
    guardarCargos: (cargo) => dispatch(guardarCargos(cargo)),
    guardarMaquinas: (maquinas) => dispatch(guardarMaquinas(maquinas))
})

export default connect(mapStateToProps, mapDispatchToProps)(FaseNueva)