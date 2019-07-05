import React from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { getEmpleadosCargo, getHorario } from '../utils/api'
import { guardarDatosEmpleados } from '../actions/guardarDatos'

class ProyectosNuevoFaseEmpleadosSelect extends React.Component {
    state = {
        showFases: false,
        empleadosList: [],
        empleadosSelect: [],
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
        horario: [],
        horas: [{ nombre: '7:00' }, { nombre: '8:00' }, { nombre: '9:00' }, { nombre: '10:00' }, { nombre: '11:00' }, { nombre: '12:00' }, { nombre: '13:00' }, { nombre: '14:00' }, { nombre: '15:00' }, { nombre: '16:00' }, { nombre: '17:00' }, { nombre: '18:00' }, { nombre: '19:00' }]
    }

    getEmpleadosList = () => {
        getEmpleadosCargo(this.props.cargo)
            .then((res) => {
                const empleadosList = res.data
                this.setState({ empleadosList })
            })
            .then(() => {
                console.log(this.state.empleadosList)
            })
    }

    getHorarioList = () => {
        getHorario()
            .then((res) => {
                const horario = res.data
                this.setState({horario})
            })
    }

    componentWillMount = () => {
        this.getEmpleadosList()
    }

    empleadoNuevo = (e) => {
        const empleadosSelect = e
        this.setState({ empleadosSelect })
    }
    nuevoCosto = (e) => {
        const costo = e
        this.setState({ costo })
    }
    nuevaHoraLunesInicio = (e) => {
        const h = e
        this.setState({ lunesInicio: h })
    }
    nuevaHoraLunesFin = (e) => {
        const h = e
        this.setState({ lunesFin: h })
    }
    nuevaHoraMartesInicio = (e) => {
        const h = e
        this.setState({ martesInicio: h })
    }
    nuevaHoraMartesFin = (e) => {
        const h = e
        this.setState({ martesFin: h })
    }
    nuevaHoraMiercolesInicio = (e) => {
        const h = e
        this.setState({ miercolesInicio: h })
    }
    nuevaHoraMiercolesFin = (e) => {
        const h = e
        this.setState({ miercolesFin: h })
    }
    nuevaHoraJuevesInicio = (e) => {
        const h = e
        this.setState({ juevesInicio: h })
    }
    nuevaHoraJuevesFin = (e) => {
        const h = e
        this.setState({ juevesFin: h })
    }
    nuevaHoraViernesInicio = (e) => {
        const h = e
        this.setState({ viernesInicio: h })
    }
    nuevaHoraViernesFin = (e) => {
        const h = e
        this.setState({ viernesFin: h })
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
                                            placeholder='Costo del cargo'
                                            value={this.state.costo}
                                            onChange={this.nuevoCosto}
                                        />
                                    </Col>
                                    <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className='caja-multi-select'>
                            <p className='select-label'>Empleados:</p>
                            <Select
                                isMulti
                                name="empleados"
                                options={this.state.empleadosList}
                                value={this.state.empleadosSelect}
                                getOptionLabel={(option) => option.nombre}
                                getOptionValue={(option) => option.nombre}
                                className="multi-select-proy"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay empleados con ese nombre"}
                                placeholder="Selecciona Empleados"
                                onChange={this.empleadoNuevo}
                            />
                        </div>
                        {(this.state.empleadosSelect && this.state.empleadosSelect.length > 0) &&
                            <div className='caja-horario-empleados'>
                                <div className='titulo-horarios'>
                                    <h2>Horarios</h2>
                                </div>
                                {this.state.empleadosSelect.map((empleado, index) => {
                                    return (
                                        <div className='horario-empleados'>
                                            <div className='hor-emp'>
                                                {empleado.nombre}                                            
                                            </div>
                                            <div className='horario-dia'>
                                                <p>Lunes</p>
                                                <Select
                                                    name="empleados"
                                                    options={this.state.horas}
                                                    value={this.state.lunesInicio}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    className="multi-select-proy"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay horas con ese nombre"}
                                                    placeholder="Selecciona Hora"
                                                    onChange={this.nuevaHoraLunesInicio}
                                                />
                                                <Select
                                                    name="empleados"
                                                    options={this.state.horas}
                                                    value={this.state.lunesFin}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    className="multi-select-proy"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay horas con ese nombre"}
                                                    placeholder="Selecciona Hora"
                                                    onChange={this.nuevaHoraLunesFin}
                                                />
                                            </div>
                                            <div className='horario-dia'>
                                                <p>Martes</p>
                                                <Select
                                                    name="empleados"
                                                    options={this.state.horas}
                                                    value={this.state.martesInicio}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    className="multi-select-proy"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay horas con ese nombre"}
                                                    placeholder="Selecciona Hora"
                                                    onChange={this.nuevaHoraMartesInicio}
                                                />
                                                <Select
                                                    name="empleados"
                                                    options={this.state.horas}
                                                    value={this.state.martesFin}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    className="multi-select-proy"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay horas con ese nombre"}
                                                    placeholder="Selecciona Hora"
                                                    onChange={this.nuevaHoraMartesFin}
                                                />
                                            </div>
                                            <div className='horario-dia'>
                                                <p>Miércoles</p>
                                                <Select
                                                    name="empleados"
                                                    options={this.state.horas}
                                                    value={this.state.miercolesInicio}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    className="multi-select-proy"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay horas con ese nombre"}
                                                    placeholder="Selecciona hora"
                                                    onChange={this.nuevaHoraMiercolesInicio}
                                                />
                                                <Select
                                                    name="empleados"
                                                    options={this.state.horas}
                                                    value={this.state.miercolesFin}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    className="multi-select-proy"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay horas con ese nombre"}
                                                    placeholder="Selecciona hora"
                                                    onChange={this.nuevaHoraMiercolesFin}
                                                />
                                            </div>
                                            <div className='horario-dia'>
                                                <p>Jueves</p>
                                                <Select
                                                    name="empleados"
                                                    options={this.state.horas}
                                                    value={this.state.juevesInicio}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    className="multi-select-proy"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay horas con ese nombre"}
                                                    placeholder="Selecciona Hora"
                                                    onChange={this.nuevaHoraJuevesInicio}
                                                />
                                                <Select
                                                    name="empleados"
                                                    options={this.state.horas}
                                                    value={this.state.juevesFin}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    className="multi-select-proy"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay horas con ese nombre"}
                                                    placeholder="Selecciona Hora"
                                                    onChange={this.nuevaHoraJuevesFin}
                                                />
                                            </div>
                                            <div className='horario-dia'>
                                                <p>Viernes</p>
                                                <Select
                                                    name="empleados"
                                                    options={this.state.horas}
                                                    value={this.state.viernesInicio}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    className="multi-select-proy"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay horas con ese nombre"}
                                                    placeholder="Selecciona Hora"
                                                    onChange={this.nuevaHoraViernesInicio}
                                                />
                                                <Select
                                                    name="empleados"
                                                    options={this.state.horas}
                                                    value={this.state.viernesFin}
                                                    getOptionLabel={(option) => option.nombre}
                                                    getOptionValue={(option) => option.nombre}
                                                    className="multi-select-proy"
                                                    classNamePrefix="select"
                                                    noOptionsMessage={() => "No hay horas con ese nombre"}
                                                    placeholder="Selecciona Hora"
                                                    onChange={this.nuevaHoraViernesFin}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                }
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.siguiente} className='botones-nuevo'>Guardar</Button>
                </div>
            </div>
        )
    }
    siguiente = () => {
        const datos = {
            empleadosSelect: this.state.empleadosSelect,
            costo: this.state.costo,
            lunesInicio: this.state.lunesInicio,
            lunesFin: this.state.lunesFin,
            martesInicio: this.state.martesInicio,
            martesFin: this.state.martesFin,
            miercolesInicio: this.state.miercolesInicio,
            miercolesFin: this.state.miercolesFin,
            juevesInicio: this.state.juevesInicio,
            juevesFin: this.state.juevesFin,
            viernesInicio: this.state.viernesInicio,
            viernesFin: this.state.viernesFin
        }
        this.props.guardarDatosEmpleados(datos)
    }
    etapa_fase = () => {
        this.setState(({ showFases }) => ({ showFases: !showFases }))
    }
}

const mapDispatchToProps = (dispatch) => ({
    guardarDatosEmpleados: (datos) => dispatch(guardarDatosEmpleados(datos))
})

export default connect(undefined, mapDispatchToProps)(ProyectosNuevoFaseEmpleadosSelect)