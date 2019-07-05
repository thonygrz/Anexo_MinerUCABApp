import React from 'react'
import { Form, Dropdown, ButtonToolbar, DropdownButton, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import {getLugar} from '../utils/api'
import {getLugares} from '../utils/api'
import {getCargos} from '../utils/api'
import {getCargo} from '../utils/api'
import {getUsuario} from '../utils/api'
import {getRoles} from '../utils/api'
import {getRol} from '../utils/api'
import {updateEmpleado} from '../utils/api'
import {updateUsuario} from '../utils/api'


class EmpleadoModificar extends React.Component {
    state = {
        clave: this.props.location.state.clave,
        nombre: this.props.location.state.nombre ? this.props.location.state.nombre : '',
        apellido: this.props.location.state.apellido  ? this.props.location.state.apellido : '',
        cedula: this.props.location.state.cedula ? this.props.location.state.cedula : '',
        fk_lugar: this.props.location.state.fk_lugar ? this.props.location.state.fk_lugar : '',
        fk_estatus: this.props.location.state.fk_estatus ? this.props.location.state.fk_estatus : '',
        sexo: this.props.location.state.sexo ? this.props.location.state.sexo : '',
        telefono: this.props.location.state.telefono ? this.props.location.state.telefono : '',
        fk_cargo: this.props.location.state.fk_cargo ? this.props.location.state.fk_cargo : '',
        cargo: '',
        usuario: this.props.location.state.usuario ? this.props.location.state.usuario : '',
        clave_usuario: '',
        contraseña: this.props.location.state.contraseña ? this.props.location.state.contraseña : '',
        rol: this.props.location.state.rol ? this.props.location.state.rol : '',
        dateNac: this.props.location.state.fecha_nac ? moment(this.props.location.state.fecha_nac) : null,
        dateIng: this.props.location.state.fecha_cont ? moment(this.props.location.state.fecha_cont) : null,
        focusedNac: false,
        focusedIng: false,
        
        lugaresList: [],
        estados: [],
        municipios: [],
        parroquias: [],
        cargosList: [],
        usuarioList: [],
        rolesList: [],
        estado: '',
        municipio: '',      
        parroquia: '',

        disableMunicipios: true,
        disableParroquias: true,
        cargoDefault: '',
        sexoDefault: '',
        rolDefault: '',
        estadoDefault: '',
        municipioDefault: '',
        parroquiaDefault: '',
        sexos: [{label: 'Femenino', value: 1}, {label: 'Masculino', value: 2}],
        usuarioOp: false,
        roles: [{ label: 'Administrador', value: 1 }, { label: 'Común', value: 2 }],
    }

    updateUsuarioList = () => {
        console.log('COMIENZA UPDATEUSUARIOLIST')
        updateUsuario(this.state.clave_usuario,this.state.usuario,this.state.contraseña,this.state.rol)
        .then((res) => {
            console.log('USUARIO ACTUALIZADO: ',res.data)
        })
        .catch((err) => console.log(err))
    }

    updateEmpleadoList = () => {
        console.log('COMIENZA UPDATEEMPLEADOLIST')
        console.log('CLAVE, NOMBRE, APELLIDO, CEDULA, SEXO, TELEFONO,FECHA_NACIMIENTO, FECHA_CONTRATADO,FK_CARGO,FK_ESTATUS,FK_LUGAR',this.props.location.state.clave,this.state.nombre,this.state.apellido,this.state.cedula,this.state.sexo,this.state.telefono,this.state.dateNac,this.state.dateIng,this.state.fk_cargo,this.state.fk_estatus,this.state.fk_lugar)  
        
        updateEmpleado(this.props.location.state.clave,this.state.nombre,this.state.apellido,this.state.cedula,this.state.sexo,this.state.telefono,this.state.dateNac,this.state.dateIng,this.state.fk_cargo,this.state.fk_estatus,this.state.fk_lugar)
        .then((res) => {
            console.log('CLAVE EMPLEADO ACTUALIZADO: ',res.data)
        })
        .then(() => {
            this.updateUsuarioList()
        })
        .catch((err) => console.log(err))
        history.push('/empleados');
    }

    estado = (e) => {
        const municipios = this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.fk_lugar === e.clave)
        console.log('MUNICIPIOS:',municipios)
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
        const sexo = e.label
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
        const rol = e.clave
        this.setState(() => ({ rol }))
    }

    modificarFK_Lugar = (e) => {
        console.log('Entró en cambiar fk_lugar')
        console.log('PARROQUIA SELECCIONADA ',e.nombre)
        this.setState({fk_lugar : e.clave})
    }

    getRollist = () => {
        getRol(this.state.usuarioList[0].fk_rol)
        .then((res) => {
            console.log('ya llegaron los rol',res.data);
            var rol = res.data[0].nombre ;
            this.setState({ rol });
        })
        .catch((err) => console.log(err));
    }

    getusuariolist = () => {
        console.log('CLAVE DEL EMPLEADO: ',this.props.location.state.clave)
        getUsuario(this.props.location.state.clave)
        .then((res) => {
            console.log('ya llegaron los usuarios',res);
            var usuarioList = res.data ;
            let usuario = usuarioList[0].nombre;
            let clave_usuario = usuarioList[0].clave;
            let contraseña = usuarioList[0].contraseña;
            let  usuarioOp = false;
            if (usuarioList && usuarioList.length){
                usuarioOp = true
            }
            this.setState({ usuarioList, usuarioOp });
            this.setState({usuario,contraseña, clave_usuario});
            
        })
        .then(() => {
            this.getRollist();
        })
        .catch((err) => console.log(err));
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

    getcargolist = () => {
        console.log('FK CARGO EN GETCARGOLIST: ',this.props.location.state.fk_cargo)
        getCargo(parseInt(this.props.location.state.fk_cargo,10))
        .then((res) => {
            console.log('ya llegaron los cargos',res.data);
            var cargo = res.data[0].nombre ;
            this.setState({ cargo });
        })
        .catch((err) => console.log(err));
    }

    getLugaresList = () => {
        console.log('Entra en getLugaresList y pide todos los lugares')
        getLugares()
        .then((res) => {
            //if(this._isMounted){
                var lugaresList = res.data;
                console.log('LUGARESLIST: ',lugaresList);
                this.setState({lugaresList})             
           // }
        })
        .then(() => {
            console.log('Entra en .then y asigna arrays: estados, municipios y parroquias')
            var estados = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'ESTADO') : []
            var municipios = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO') : []
            var parroquias = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'PARROQUIA') : []
            this.setState({estados})
            this.setState({municipios})
            this.setState({parroquias})
            console.log('LUGARESLIST: ',this.state.lugaresList);
            //this.estadoBegin();
        })
        .catch((err) => console.log(err));
    }

    getEsta = (fk) =>{
        console.log('Entra en getEsta y busca el estado por fk')
        getLugar(fk)
        .then((res) =>{
            var estado = res.data[0].nombre
            console.log('NOMBRE ESTADO: ',res.data[0].nombre)
            this.setState({estado})
        })
        .then(()=>{
            this.getLugaresList()
        })
        .catch((err) => console.log(err))
    }

    getMuni = (fk) =>{
        console.log('Entra en getMuni y busca el municipio por fk')
        getLugar(fk)
        .then((res) =>{
            var municipio = res.data[0].nombre
            console.log('NOMBRE MUNICIPIO: ',res.data[0].nombre)
            this.setState({municipio})
            this.getEsta(res.data[0].fk_lugar)            
        })
        .catch((err) => console.log(err))
    }

    lugarCascade2 = () =>{
        console.log('Entra en lugar cascade y busca la parroquia por fk')
        getLugar(this.props.location.state.fk_lugar)
        .then((res) =>{
            console.log('RESPUESTA EN FRONT: ',res.data)
            var parroquia = res.data[0].nombre
            console.log('NOMBRE PARROQUIA: ',res.data[0].nombre)
            this.setState({parroquia}) 
            this.getMuni(res.data[0].fk_lugar)         
        })
        .catch((err) => console.log(err))
    }
    
    componentWillMount = () => {
        this.lugarCascade2();
        this.getcargolist();
        this.getCargosList();
        this.getusuariolist();
        this.getRolesList();      

        const usuarioOp = (this.state.usuario !== '' && this.state.contraseña !== '') ? true : false;   //mosca
        //const cargoDefault = this.props.cargos.find((cargo) => cargo.id === this.cargosList.cargo)
        const parroquiaDefault = this.props.lugares.find((lugar) => lugar.tipo === 'PARROQUIA' && lugar.id === this.props.location.state.fk_lugar)
        const municipioDefault = this.props.lugares.find((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.id === parroquiaDefault.fk_lugar)
        const estadoDefault = this.props.lugares.find((lugar) => lugar.tipo === 'ESTADO' && lugar.id === municipioDefault.fk_lugar)
        const sexoDefault = this.state.sexos.find((sexo) => sexo.label === this.state.sexo)
        const rolDefault = this.state.roles.find((rol) => rol.label === this.state.rol)        
        this.setState(() => ({sexoDefault, rolDefault, parroquiaDefault, municipioDefault, estadoDefault, usuarioOp }))
        this.estado(estadoDefault)
        this.municipio(municipioDefault)
    }

    render(){
        return(
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Modificar Empleado</h1>

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
                                //value={this.state.sexoDefault}
                                options={this.state.sexos}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay géneros con ese nombre"}
                                placeholder={this.props.location.state.sexo === 0  ? 'Femenino' : 'Masculino'}
                                // getOptionLabel={option => option.nombre}
                                // getOptionValue={option => option.clave}
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
                                //value={this.state.cargoDefault}
                                options={this.state.cargosList}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay cargos con ese nombre"}
                                placeholder={this.state.cargo}
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option}
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
                                //value={this.state.estadoDefault}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay estados con ese nombre"}
                                placeholder={this.state.estado}
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option.clave}
                                onChange={this.estado}
                            />
                        </div>
                        <div className="lugar-nuevo">
                            <p className='lugar-label'>Municipio:</p>
                            <Select
                                name="lugar-municipio"
                                options={this.state.municipios}
                               // value={this.state.municipioDefault}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay municipios con ese nombre"}
                                placeholder={this.state.municipio}
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option.clave}
                                onChange={this.municipio}
                            />
                        </div>
                        <div className="lugar-nuevo">
                            <p className='lugar-label'>Parroquia:</p>
                            <Select
                                name="lugar-parroquia"
                                options={this.state.parroquias}
                               // value={this.state.parroquiaDefault}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay parroquias con ese nombre"}
                                placeholder={this.state.parroquia}
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option.clave}
                                onChange={this.modificarFK_Lugar}
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
                                placeholder={moment(this.props.location.state.fecha_nac).format('DD/MM/YYYY')}
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
                                placeholder={moment(this.props.location.state.fecha_cont).format('DD/MM/YYYY')}
                            //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
                            //monthFormat
                            />
                        </div>
                    </div>

                    <div className='caja-botones-nuevo-usuarioOp'>
                        <Button onClick={this.usuario_boton} className='botones-nuevo'>Asignar/Quitar Usuario</Button>
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
                                    //value={this.state.rolDefault}
                                    className="single-select"
                                    classNamePrefix="select"
                                    noOptionsMessage={() => "No hay roles con ese nombre"}
                                    placeholder={this.state.rol}
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
                    <Button onClick={this.updateEmpleadoList} className='botones-nuevo'>Guardar</Button>
                </div>

            </div>      
        )
    }

    usuario_boton = () => {
        this.setState(({ usuarioOp }) => ({ usuarioOp: !usuarioOp }))
    }

    registrar_boton = () =>{
        history.push('/empleados')
    } 

}

const mapStateToProps = (state, props) => ({
    empleado: state.empleados.find((empleado) => empleado.id === props.match.params.id),
    lugares: state.lugares,
    cargos: state.cargos
})

export default connect(mapStateToProps)(EmpleadoModificar)