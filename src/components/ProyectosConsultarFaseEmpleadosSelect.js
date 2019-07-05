import React from 'react'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import { Form, Row, Col, Button } from 'react-bootstrap'

class ProyectosConsultarFaseEmpleadosSelect extends React.Component {
    state = {
        showFases: false,
        empleadosList: [],
        empleadosSelect: [{nombre: 'Pedro Pérez'}],
        costo: '',
        lunesInicio: '',
        lunesFin: '',
        martesInicio: '',
        martesFin: '',
        miercolesInicio: '',
        miercolesFin: '',
        juevesInicio: '',
        juevesFin: '',
        viernesInicio: '',
        viernesFin: '',
        horas: [{ nombre: '7:00' }, { nombre: '8:00' }, { nombre: '9:00' }, { nombre: '10:00' }, { nombre: '11:00' }, { nombre: '12:00' }, { nombre: '13:00' }, { nombre: '14:00' }, { nombre: '15:00' }, { nombre: '16:00' }, { nombre: '17:00' }, { nombre: '18:00' }, { nombre: '19:00' }]
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
                                            placeholder='Costo del cargo'
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
                                    <Form.Label className="label-nombre" column sm="4">Empleados:</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='Costo del cargo'
                                            value={this.state.empleadosSelect}
                                            readOnly
                                        />
                                    </Col>
                                    <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </div>
                        {(this.state.empleadosSelect && this.state.empleadosSelect.length > 0) &&
                            <div className='caja-horario-empleados'>
                                <div className='titulo-horarios'>
                                    <h2>Horarios y Estatus</h2>
                                </div>
                                {this.state.empleadosSelect.map((empleado, index) => {
                                    return (
                                        <div className='horario-empleados'>
                                            <div className='hor-emp'>
                                                {empleado.nombre}
                                                <div></div>         
                                                Estatus: {}                                   
                                            </div>
                                            <div className='horario-dia-consultar'>
                                                <p>Lunes</p>
                                                <Form className="horario-dia-indiv">
                                                    <Form.Group controlId='formPlaintextText'>
                                                        <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='yac-inputs'
                                                                placeholder='Lunes Inicio'
                                                                value={this.state.lunesInicio}
                                                                readOnly
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId='formPlaintextText'>
                                                        <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='yac-inputs'
                                                                placeholder='Lunes Fin'
                                                                value={this.state.lunesFin}
                                                                readOnly
                                                        />
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className='horario-dia-consultar'>
                                                <p>Martes</p>
                                                <Form className="horario-dia-indiv">
                                                    <Form.Group controlId='formPlaintextText'>
                                                        <Form.Control
                                                            required
                                                            size='lg'
                                                            type='text'
                                                            className='yac-inputs'
                                                            placeholder='Martes Inicio'
                                                            value={this.state.martesInicio}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId='formPlaintextText'>
                                                        <Form.Control
                                                            required
                                                            size='lg'
                                                            type='text'
                                                            className='yac-inputs'
                                                            placeholder='Martes Fin'
                                                            value={this.state.martesFin}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className='horario-dia-consultar'>
                                                <p>Miércoles</p>
                                                <Form className="horario-dia-indiv">
                                                    <Form.Group controlId='formPlaintextText'>
                                                        <Form.Control
                                                            required
                                                            size='lg'
                                                            type='text'
                                                            className='yac-inputs'
                                                            placeholder='Miércoles Inicio'
                                                            value={this.state.miercolesInicio}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId='formPlaintextText'>
                                                        <Form.Control
                                                            required
                                                            size='lg'
                                                            type='text'
                                                            className='yac-inputs'
                                                            placeholder='Miércoles Fin'
                                                            value={this.state.miercolesFin}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className='horario-dia-consultar'>
                                                <p>Jueves</p>
                                                <Form className="horario-dia-indiv">
                                                    <Form.Group controlId='formPlaintextText'>
                                                        <Form.Control
                                                            required
                                                            size='lg'
                                                            type='text'
                                                            className='yac-inputs'
                                                            placeholder='Jueves Inicio'
                                                            value={this.state.juevesInicio}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId='formPlaintextText'>
                                                        <Form.Control
                                                            required
                                                            size='lg'
                                                            type='text'
                                                            className='yac-inputs'
                                                            placeholder='Jueves Fin'
                                                            value={this.state.juevesFin}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className='horario-dia-consultar'>
                                                <p>Viernes</p>
                                                <Form className="horario-dia-indiv">
                                                    <Form.Group controlId='formPlaintextText'>
                                                        <Form.Control
                                                            required
                                                            size='lg'
                                                            type='text'
                                                            className='yac-inputs'
                                                            placeholder='Viernes Inicio'
                                                            value={this.state.viernesInicio}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                    <Form.Group controlId='formPlaintextText'>
                                                        <Form.Control
                                                            required
                                                            size='lg'
                                                            type='text'
                                                            className='yac-inputs'
                                                            placeholder='Viernes Fin'
                                                            value={this.state.viernesFin}
                                                            readOnly
                                                        />
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
    etapa_fase = () => {
        this.setState(({ showFases }) => ({ showFases: !showFases }))
    }
}

export default ProyectosConsultarFaseEmpleadosSelect