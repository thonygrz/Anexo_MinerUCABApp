import React from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import Tabla from './Tabla'

class FaseNueva extends React.Component {
    state = {
        columnsCargos: [{
            title: 'ID',
            data: 'id'
        }, {
            title: 'Cargo',
            width: 500,
            data: 'nombre'
        }, {
            title: 'Cantidad',
            width: 500,
            defaultContent: '<input type="text" value=0 id="cant" name="cantidad" placeholder="Escribe la cantidad">'
        }, {
            title: 'Total (Bs)',
            width: 500,
            data: 'costo'
        }],
        columnsMaquinas: [{
            title: 'ID',
            data: 'id'
        }, {
            title: 'Máquina',
            width: 500,
            data: 'nombre'
        }, {
            title: 'Cantidad',
            width: 500,
            defaultContent: '<input type="text" value=0 id="cant" name="cantidad" placeholder="Escribe la cantidad">'
        }, {
            title: 'Precio x Unidad (Bs)',
            width: 500,
            data: 'costo'
        }]
    }

    atras_boton = () => {
        history.goBack()
    }

    siguiente_boton = () => {
        history.push('/yacimientos/etapas/nuevo')
    }

    render() {
        return (
            <div className="nueva-fase content-container">
                <h1 className='fase-titulo'>Etapa 1-Fase 1</h1>
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
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="fase-duracion">
                        <Form className="fase-nueva-duracion">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="4">Duración (Días):</Form.Label>
                                <Col sm='8'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Duración'
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <h1 className='subtitulo'>Cargos</h1>
                <Tabla data={this.props.cargos} columns={this.state.columnsCargos} elemento='cargos' tipo='modificar' />
                <h1 className='subtitulo'>Maquinaria</h1>
                <Tabla data={this.props.maquinas} columns={this.state.columnsMaquinas} elemento='maquinaria' tipo='modificar' />
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