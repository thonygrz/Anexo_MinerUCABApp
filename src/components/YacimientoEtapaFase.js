import React from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import Tabla from './Tabla'
import { getCargoF, getTipoMaquinariaF } from '../utils/api'

class FaseNueva extends React.Component {
    state = {
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
            data: 'cantidad'
        }, {
            title: 'Total (Bs)',
            width: 500,
            data: 'costo'
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
            data: 'cantidad'
        }, {
            title: 'Precio x Unidad (Bs)',
            width: 500,
            data: 'costo'
        }],
        fase: {},
        cargos: [],
        tipoMaquinaria: [],
    }

    getTMaquinariaFase = (fclave) => {
        getTipoMaquinariaF(fclave, this.props.location.state.etapa.clave, this.props.location.state.yacimiento.clave)
            .then((res) => {
                const tipoMaquinaria = res.data
                this.setState({ tipoMaquinaria })
            })
            .then(() => {
                console.log('tipoMaquinaria', this.state.tipoMaquinaria)
            })
    }

    getCargosFase = (fclave) => {
        getCargoF(fclave, this.props.location.state.etapa.clave, this.props.location.state.yacimiento.clave)
            .then((res) => {
                const cargos = res.data
                this.setState({ cargos })
            })
            .then(() => {
                console.log('cargos', this.state.cargos)
                this.getTMaquinariaFase(fclave)
            })
    }

    componentWillMount = () => {
        console.log('HOLAAAA')
        const fase = this.props.location.state.fases.find((f) => f.clave === parseInt(this.props.match.params.id, 10))
        this.setState({ fase })
        console.log(fase)
        console.log(this.props.location.state.etapa.clave)
        console.log(this.props.location.state.yacimiento.clave)

        this.getCargosFase(fase.clave)
    }

    atras_boton = () => {
        history.goBack()
    }

    siguiente_boton = () => {
        console.log(this.props.location.state.nfases)
        console.log(this.props.location.state.fases)
        console.log(this.props.location.state.fases.length)
        console.log(this.props.location.state.fases.length - this.props.location.state.nfases + 1)

        if (this.props.location.state.nfases > 1) {
            history.push({
                pathname: `/yacimientos/etapas/fases/${this.props.location.state.fases[this.props.location.state.fases.length - this.props.location.state.nfases + 1].clave}`,
                state: {
                    yacimiento: this.props.location.state.yacimiento,
                    nfases: this.props.location.state.nfases - 1,
                    fases: this.props.location.state.fases,
                    etapa: this.props.location.state.etapa
                }
            })
        } else {
            history.push(`/yacimientos/consultar/${this.props.location.state.yacimiento.clave}`)
        }
    }

    render() {
        return (
            <div className="nueva-fase content-container">
                <h1 className='fase-titulo'>Etapa {this.props.location.state.etapa.numero}-Fase {this.props.location.state.fases[this.props.location.state.fases.length - this.props.location.state.nfases].numero}</h1>
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
                                        value={this.state.fase.nombre}
                                        readOnly
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
                                        value={this.state.fase.duracion}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                {((this.state.cargos && this.state.cargos.length > 0) && (this.state.tipoMaquinaria && this.state.tipoMaquinaria.length > 0)) && 
                    <div>
                        <h1 className='subtitulo'>Cargos</h1>
                        <Tabla data={this.state.cargos} columns={this.state.columnsCargos} elemento='cargos' tipo='consultar' />
                        <h1 className='subtitulo'>Maquinaria</h1>
                        <Tabla data={this.state.tipoMaquinaria} columns={this.state.columnsMaquinas} elemento='maquinaria' tipo='consultar' />
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

export default connect(mapStateToProps)(FaseNueva)