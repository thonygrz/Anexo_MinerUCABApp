import React from 'react'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import { Form, Row, Col, Button } from 'react-bootstrap'

class ProyectosModificarFaseMaquinariaSelect extends React.Component {
    state = {
        showFases: false,
        maquinariaList: [],
        maquinariaSelect: [],
        costo: '',
        estatus: [],
        estatusEmpleado: '',
    }
    maquinariaNuevo = (e) => {
        const maquinariaSelect = e
        this.setState({ maquinariaSelect })
    }
    nuevoCosto = (e) => {
        const costo = e
        this.setState({ costo })
    }
    nuevoEstatus = (e) => {
        const estatusEmpleado = e
        this.setState({ estatusEmpleado })
    }
    render() {
        return (
            <div>
                <div className='etapa-caja-proy' onClick={this.etapa_fase}>
                    <p>{this.props.nombre}</p>
                    <div className='minimo-proy'>
                        <p>Costo Mínimo: {}</p>
                        <p>Cantidad Mínima: {}</p>
                    </div>
                    <div className='minimo-proy'>
                        <p>Estatus: {}</p>
                        <Select
                            name="empleados"
                            options={this.state.estatus}
                            value={this.state.estatusEmpleado}
                            getOptionLabel={(option) => option.nombre}
                            getOptionValue={(option) => option.nombre}
                            className="multi-select-proy"
                            classNamePrefix="select"
                            noOptionsMessage={() => "No hay horas con ese nombre"}
                            placeholder="Selecciona Hora"
                            onChange={this.nuevoEstatus}
                        />
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
                                            onChange={this.nuevoCosto}
                                        />
                                    </Col>
                                    <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className='caja-multi-select'>
                            <p className='select-label'>Maquinarias:</p>
                            <Select
                                isMulti
                                name="empleados"
                                options={this.state.maquinariaList}
                                value={this.state.maquinariaSelect}
                                getOptionLabel={(option) => option.nombre}
                                getOptionValue={(option) => option.nombre}
                                className="multi-select-proy"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay maquinarias con ese nombre"}
                                placeholder="Selecciona Maquinarias"
                                onChange={this.maquinariaNuevo}
                            />
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

export default ProyectosModificarFaseMaquinariaSelect