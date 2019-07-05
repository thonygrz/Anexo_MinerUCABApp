import React from 'react'
import { Form, Dropdown, ButtonToolbar, DropdownButton, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { connect } from 'react-redux'
import Select from 'react-select'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {getLugares} from '../utils/api'
import {getCargos} from '../utils/api'
import {getRoles} from '../utils/api'
import {postInsertEmpleado} from '../utils/api'
import {postInsertUsuario} from '../utils/api'

class EmpleadoNuevo extends React.Component {
    state = {
        nombre: '',
        apellido: '',
        cedula: '',
        fk_lugar: '',
        sexo: '',
        telefono: '',
        fk_cargo: '',
        cargosList: [],
        usuario: '',
        contraseña: '',
        rol: '',
        rolesList: [],
        fk_status: 1,

        lugaresList: [],
        estados: '',
        municipios: '',
        parroquias: '',

        disableMunicipios: true,
        disableParroquias: true,
        focusedNac: false,
        focusedIng: false,
        dateNac: null,
        dateIng: null,
        sexos: [{label: 'Femenino', value: 1}, {label: 'Masculino', value: 2}],
        usuarioOp: false,
        roles: [{ label: 'Administrador', value: 1 }, { label: 'Común', value: 2 }],
    }

    estado = (e) => {
        const municipios = this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.fk_lugar === e.clave)
        this.setState(() => ({ municipios, disableMunicipios: false }))
    }
    municipio = (e) => {
        const parroquias = this.state.lugaresList.filter((lugar) => lugar.tipo === 'PARROQUIA' && lugar.fk_lugar === e.clave)
        this.setState(() => ({ parroquias, disableParroquias: false }))
    }

    modificarNombre = (e) => {
        const nombre = e.target.value
        this.setState(() => ({ nombre }))
    }

    modificarApellido = (e) => {
        const apellido = e.target.value
        this.setState(() => ({ apellido }))
    }

    modificarCedula = (e) => {
        const cedula = e.target.value
        this.setState(() => ({ cedula }))
    }

    modificarTelefono = (e) => {
        const telefono = e.target.value
        this.setState(() => ({ telefono }))
    }

    modificarSexo = (e) => {
        let sexo
        if(e.label === 'Femenino'){
            sexo = 0
        }
        else if(e.label === 'Masculino'){
            sexo = 1
        }
        this.setState(() => ({ sexo }))
    }

    modificarCargo = (e) => {
        const fk_cargo = e.clave
        this.setState(() => ({ fk_cargo }))
    }

    modificarUsuario = (e) => {
        const usuario = e.target.value
        this.setState(() => ({ usuario }))
    }

    modificarContraseña = (e) => {
        const contraseña = e.target.value
        this.setState(() => ({ contraseña }))
    }

    modificarRol = (e) => {
        console.log('ROL A MODIFICAR:',e)
        const rol = e.clave
        this.setState(() => ({ rol }))
    }

    modificarFK_Lugar = (e) => {
        const fk_lugar = e.clave
        this.setState(() => ({ fk_lugar }))
    }

    getRolesList = () =>{
        getRoles()
        .then((res) => {
            console.log('ROLES RECIBIDOS:', res.data)
            let rolesList = res.data
            this.setState({rolesList})
        })
        .catch((err) => console.log(err))
    }

    getCargosList = () =>{
        getCargos()
        .then((res) => {
            console.log('CARGOS RECIBIDOS:', res.data)
            let cargosList = res.data
            this.setState({cargosList})
        })
        .catch((err) => console.log(err))
    }

    getLugaresList = () => {
        getLugares()
        .then((res) => {            
            console.log(res);
            var lugaresList = res.data;
            this.setState({lugaresList})             
            
        })
        .then(() => {
            var estados = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'ESTADO') : []
            var municipios = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO') : []
            var parroquias = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'PARROQUIA') : []
            this.setState({estados})
            this.setState({municipios})
            this.setState({parroquias})
        })
        .catch((err) => console.log(err));
    }

    postUsuarioList = (clave_emp) => {
        console.log('USUARIO, CONTRASEÑA, FK_ROL,FK_EMPLEADO:',this.state.usuario,this.state.contraseña,this.state.rol,clave_emp)  
        postInsertUsuario(this.state.usuario,this.state.contraseña,this.state.rol,clave_emp)
        .then((res) => {
            console.log('USUARIO INSERTADO:',res.data)
        })
        .catch((err) => console.log(err))
        history.push('/empleados');
    }

    postEmpleadoList = () => {
        console.log('EL NOMBRE, APELLIDO, CEDULA, SEXO, TELEFONO,FECHA_NACIMIENTO, FECHA_CONTRATADO,FK_CARGO,FK_ESTATUS,FK_LUGAR',this.state.nombre,this.state.apellido,this.state.cedula,this.state.sexo,this.state.telefono,this.state.dateNac,this.state.dateIng,this.state.fk_cargo,this.state.fk_status,this.state.fk_lugar)  
        postInsertEmpleado(this.state.nombre,this.state.apellido,this.state.cedula,this.state.sexo,this.state.telefono,this.state.dateNac,this.state.dateIng,this.state.fk_cargo,this.state.fk_status,this.state.fk_lugar)
        .then((res) => {
            console.log('EMPLEADO INSERTADO:',res.data)
            this.postUsuarioList(res.data[0].clave)
        })
        .catch((err) => console.log(err))
    }

    componentWillMount() {
        this.getLugaresList();
        this.getCargosList()
        this.getRolesList()
    }

    render(){
        return(
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Registrar Empleado</h1>

                <div className="form-nuevo-emp">
                    <div className="caja-dosColumns">
                        <div className="emp-nombre">
                            <Form className="empleado-nombre"> 
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="3">Nombre:</Form.Label>
                                <Col sm='9'>
                                    <Form.Control  
                                        required
                                        size='lg'
                                        type='text'
                                        className='emp-inputs'
                                        placeholder='Nombre' 
                                        value={this.state.nombre}
                                        onChange={this.modificarNombre}
                                    />
                                </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="emp-nombre">
                            <Form className="empleado-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="3">Apellido:</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='emp-inputs'
                                            placeholder='Apellido'
                                            value={this.state.apellido}
                                            onChange={this.modificarApellido}
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className="caja-dosColumns">
                        <div className='emp-nombre'>
                            <Form className="empleado-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="3">Cédula:</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='emp-inputs'
                                            placeholder='Cédula'
                                            value={this.state.cedula}
                                            onChange={this.modificarCedula}
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="emp-nombre">
                            <p className='lugar-label'>Género:</p>
                            <Select
                                name="genero"
                                options={this.state.sexos}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay géneros con ese nombre"}
                                placeholder="Selecciona Género"
                                //value={this.state.sexo}
                                onChange={this.modificarSexo}
                            />
                        </div>            
                    </div>   

                    <div className="caja-dosColumns">
                        <div className="emp-nombre">
                            <Form className="empleado-nombre"> 
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="3">Teléfono:</Form.Label>
                                <Col sm='9'>
                                    <Form.Control  
                                        required
                                        size='lg'
                                        type='text'
                                        className='emp-inputs'
                                        placeholder='Teléfono' 
                                        value={this.state.telefono}
                                        onChange={this.modificarTelefono}
                                    />
                                </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="emp-nombre">
                            <p className='lugar-label'>Cargo:</p>
                            <Select
                                name="cargos"
                                options={this.state.cargosList}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay cargosList con ese nombre"}
                                placeholder="Selecciona Cargo"
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option}
                                //value={this.state.cargo}
                                onChange={this.modificarCargo}
                            />
                        </div>             
                    </div>  
                    
                    <div className="caja-lugar">
                        <div className="lugar-nuevo">
                            <p className='lugar-label'>Estado:</p>
                            <Select
                                name="lugar-estado"
                                options={this.state.estados}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay estados con ese nombre"}
                                placeholder="Selecciona Estado"
                                onChange={this.estado}
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option.clave}
                            />
                        </div>
                        <div className="lugar-nuevo">
                            <p className='lugar-label'>Municipio:</p>
                            <Select
                                name="lugar-municipio"
                                options={this.state.municipios}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay municipios con ese nombre"}
                                placeholder="Selecciona Municipio"
                                onChange={this.municipio}
                                isDisabled={this.state.disableMunicipios}
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option.clave}
                            />
                        </div>
                        <div className="lugar-nuevo">
                            <p className='lugar-label'>Parroquia:</p>
                            <Select
                                name="lugar-parroquia"
                                options={this.state.parroquias}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay parroquias con ese nombre"}
                                placeholder="Selecciona Parroquia"
                                isDisabled={this.state.disableParroquias}
                                onChange={this.modificarFK_Lugar}
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option.clave}
                            />
                        </div>
                    </div>
                    <div className="caja-dosColumns">
                        <div className='emp-fecha'>
                            <p className='fecha-aliado-label'>Fecha de nacimiento:</p>
                            <SingleDatePicker
                                date={this.state.dateNac}
                                onDateChange={dateNac => this.setState({ dateNac })}
                                focused={this.state.focusedNac}
                                onFocusChange={({ focused }) => this.setState({ focusedNac: focused })}
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                                displayFormat='DD/MM/YYYY'
                                placeholder='Fecha de nacimiento'
                                //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
                                //monthFormat
                            />
                        </div>
                        <div className='emp-fecha'>
                            <p className='fecha-aliado-label'>Fecha de ingreso:</p>
                            <SingleDatePicker
                                date={this.state.dateIng}
                                onDateChange={dateIng => this.setState({ dateIng })}
                                focused={this.state.focusedIng}
                                onFocusChange={({ focused }) => this.setState({ focusedIng: focused })}
                                numberOfMonths={1}
                                isOutsideRange={() => false}
                                displayFormat='DD/MM/YYYY'
                                placeholder='Fecha de ingreso'
                                //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
                                //monthFormat
                            />
                        </div>
                    </div>   

                    <div className='caja-botones-nuevo-usuarioOp'>
                        <Button onClick={this.usuario_boton} className='botones-nuevo'>Asignar Usuario</Button>
                    </div>

                    {this.state.usuarioOp && 
                        <div className='usuarioOp'>
                            <div className="caja-dosColumns">
                                <div className="emp-nombre">
                                    <Form className="empleado-nombre">
                                        <Form.Group as={Row} controlId='formPlaintextText'>
                                            <Form.Label className="label-nombre" column sm="3">Usuario:</Form.Label>
                                            <Col sm='9'>
                                                <Form.Control
                                                    required
                                                    size='lg'
                                                    type='text'
                                                    className='emp-inputs'
                                                    placeholder='Usuario'
                                                    value={this.state.usuario}
                                                    onChange={this.modificarUsuario}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </div>
                                <div className='emp-nombre'>
                                    <Form className="empleado-nombre">
                                        <Form.Group as={Row} controlId='formPlaintextText'>
                                            <Form.Label className="label-nombre" column sm="3">Contraseña:</Form.Label>
                                            <Col sm='9'>
                                                <Form.Control
                                                    required
                                                    size='lg'
                                                    type='text'
                                                    className='emp-inputs'
                                                    placeholder='Contraseña'
                                                    value={this.state.contraseña}
                                                    onChange={this.modificarContraseña}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>  
                            <div className="emp-nombre">
                                <p className='lugar-label'>Rol:</p>
                                <Select
                                    name="rol"
                                    options={this.state.rolesList}
                                    className="single-select"
                                    classNamePrefix="select"
                                    noOptionsMessage={() => "No hay roles con ese nombre"}
                                    placeholder="Selecciona Rol"
                                    //  value={this.state.rol}
                                    getOptionLabel={option => option.nombre}
                                    getOptionValue={option => option.clave}
                                    onChange={this.modificarRol}
                                />
                            </div> 
                        </div>
                    }
                </div>     

                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.postEmpleadoList} className='botones-nuevo'>Registrar</Button>  
                </div>

            </div>      
        )
    }

    usuario_boton = () => {
        this.setState(({usuarioOp}) => ({ usuarioOp: !usuarioOp }))
    }

    atras_boton = () => {
        history.goBack()
    }

    registrar_boton = () =>{
        history.push('/empleados')
    } 

}

const mapStateToProps = (state) => ({
    lugares: state.lugares,
    cargosList: state.cargosList
})

export default connect(mapStateToProps)(EmpleadoNuevo)