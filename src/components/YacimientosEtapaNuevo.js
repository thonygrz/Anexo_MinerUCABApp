import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'


class EtapaNuevo extends React.Component {
    state = {
        nfases: 0,
        nombre: ''
    }
    numeroFases = (e) => {
        const nfases = e.target.value
        this.setState(() => ({ nfases }))
    }
    nuevoNombre = (e) => {
        const nombre = e.target.value
        this.setState({nombre})
    }
    render() {
        return (
            <div className="nuevo-yacimiento content-container">
                <h1 className='yac-nuevo-titulo'>Etapa {this.props.location.state.numeroEtapa}</h1>
                <div className="form-nuevo-yac-etapa">
                    <div className='yacimiento-etapa-nueva'>
                        <Form className="yacimiento-nuevo">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="4">Nombre:</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Nombre'
                                        onChange={this.nuevoNombre}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='yacimiento-etapa-nueva'>
                        <Form className="yacimiento-nuevo">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="4">Número de fases:</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='number'
                                        className='yac-inputs'
                                        placeholder='Número de fases'
                                        onChange={this.numeroFases}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>

                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.siguiente_boton} className='botones-nuevo'>Siguiente</Button>
                </div>
            </div>
        )
    }

    atras_boton = () => {
        history.goBack()
    }

    siguiente_boton = () => {
        if (this.state.nfases > 0) {
            const etapa = {
                numero: this.props.location.state.numeroEtapa,
                nombre: this.state.nombre
            }
            console.log(this.props.location.state.netapas)
            console.log(this.props.location.state.yacimiento)
            console.log(this.props.location.state.yan_min)
            console.log(this.props.location.state.etapas)

            history.push({
                pathname: '/yacimientos/fases/nuevo',
                state: {
                    netapas: this.props.location.state.netapas,
                    nfases: this.state.nfases,
                    numeroEtapa: this.props.location.state.numeroEtapa,
                    numeroFase: 1,
                    yacimiento: this.props.location.state.yacimiento,
                    yan_min: this.props.location.state.yan_min,
                    etapas: this.props.location.state.etapas,
                    etapa: etapa,
                    fases: [],
                }
            })
        }
    }

}


export default EtapaNuevo