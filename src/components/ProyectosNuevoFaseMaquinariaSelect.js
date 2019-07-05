import {connect} from 'react-redux'
import React from 'react'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { guardarDatosMaquinaria } from '../actions/guardarDatos'
import { getMaquinasTipo} from '../utils/api'

class ProyectosNuevoFaseMaquinariaSelect extends React.Component {
    state = {
        showFases: false,
        maquinariaList: [],
        maquinariaSelect: [],
        costo: ''
    }
    maquinariaNuevo = (e) => {
        const maquinariaSelect = e
        this.setState({ maquinariaSelect })
    }
    nuevoCosto = (e) => {
        const costo = e
        this.setState({ costo })
    }
    getMaquinasList = () => {
        getMaquinasTipo(this.props.cargo)
            .then((res) => {
                const empleadosLmaquinariaListist = res.data
                this.setState({ maquinariaList })
            })
            .then(() => {
                console.log(this.state.maquinariaList)
            })
    }
    render() {
        return (
            <div>
                <div className='etapa-caja-proy' onClick={this.etapa_fase}>
                    <p>{this.props.nombre}</p>
                    <div className='minimo-proy'>
                        <p>Costo Mínimo: {this.props.costo}</p>
                        <p>Cantidad Mínima: {this.props.cantidad}</p>
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
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.siguiente} className='botones-nuevo'>Guardar</Button>
                </div>
            </div>
        )
    }
    etapa_fase = () => {
        this.setState(({ showFases }) => ({ showFases: !showFases }))
    }
    siguiente = () => {
        const datos = {
            mineralesSelect: this.state.empleadosSelect,
            costo: this.state.costo
        }
        this.props.guardarDatosMaquinaria(datos)
    }
}

const mapDispatchToProps = (dispatch) => ({
    guardarDatosMaquinaria: (datos) => dispatch(guardarDatosMaquinaria(datos))
})

export default connect(undefined, mapDispatchToProps)(ProyectosNuevoFaseMaquinariaSelect)