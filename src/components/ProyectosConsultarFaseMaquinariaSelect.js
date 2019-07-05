import React from 'react'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import { Form, Row, Col, Button } from 'react-bootstrap'

class ProyectosConsultarFaseMaquinariaSelect extends React.Component {
    state = {
        showFases: false,
        maquinariaList: [],
        maquinariaSelect: [],
        costo: ''
    }
    render() {
        return (
            <div>
                <div className='etapa-caja-proy' onClick={this.etapa_fase}>
                    <p>{this.props.nombre}</p>
                    <div className='minimo-proy'>
                        <p>Estatus: {}</p>
                    </div> 
                </div>
                {this.state.showFases &&
                    <div className='proy-det'>
                        <div className='proy-costo'>
                            <Form className="proy-costo-form">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="4">Costo (c/u):</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='Costo del tipo'
                                            value={this.state.costo}
                                            readOnly
                                        />
                                    </Col>
                                    <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className='proy-costo'>
                            <Form className="proy-costo-form">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="4">Maquinarias:</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='Maquinarias'
                                            value={this.state.maquinariaSelect}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                }
            </div>
        )
    }
    etapa_fase = () => {
        this.setState(({ showFases }) => ({ showFases: !showFases }))
    }
}

export default ProyectosConsultarFaseMaquinariaSelect