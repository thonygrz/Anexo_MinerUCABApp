// import React from 'react'
// import { Form, Dropdown, ButtonToolbar, DropdownButton, Row, Col, Button } from 'react-bootstrap'
// import { history } from '../routers/AppRouter'
// import { connect } from 'react-redux'
// import { SingleDatePicker } from 'react-dates'
// import 'react-dates/initialize'
// import 'react-dates/lib/css/_datepicker.css'
// import moment from 'moment'
// import {getLugar} from '../utils/api'
// import {getLugares} from '../utils/api'
// import {getCargos} from '../utils/api'

// class EmpleadoConsultar extends React.Component {
//     state = {
//         cargoDefault: '',
//         rolDefault: '',
//         estadoDefault: '',
//         municipioDefault: '',
//         parroquiaDefault: '',
//         usuarioOp: false,

//         cargosList: [],
//         lugaresList: [],
//     }

//     estado = (e) => {
//         const municipios = this.props.lugares.filter((lugar) => lugar.tipo === 'Municipio' && lugar.fk_lugar === e.clave)
//         this.setState(() => ({ municipios }))
//     }
//     municipio = (e) => {
//         const parroquias = this.props.lugares.filter((lugar) => lugar.tipo === 'Parroquia' && lugar.fk_lugar === e.clave)
//         this.setState(() => ({ parroquias }))
//     }

//     getLugaresList = () => {
//         console.log('Entra en getLugaresList y pide todos los lugares')
//         getLugares()
//         .then((res) => {
//             //if(this._isMounted){
//                 var lugaresList = res.data;
//                 console.log('LUGARESLIST: ',lugaresList);
//                 this.setState({lugaresList})             
//            // }
//         })
//         .then(() => {
//             console.log('Entra en .then y asigna arrays: estados, municipios y parroquias')
//             var estados = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'ESTADO') : []
//             var municipios = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO') : []
//             var parroquias = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'PARROQUIA') : []
//             this.setState({estados})
//             this.setState({municipios})
//             this.setState({parroquias})
//             console.log('LUGARESLIST: ',this.state.lugaresList);
//             //this.estadoBegin();
//         })
//         .catch((err) => console.log(err));
//     }

//     getEsta = (fk) =>{
//         console.log('Entra en getEsta y busca el estado por fk')
//         getLugar(fk)
//         .then((res) =>{
//             var estado = res.data[0].nombre
//             console.log('NOMBRE ESTADO: ',res.data[0].nombre)
//             this.setState({estado})
//         })
//         .then(()=>{
//             this.getLugaresList()
//         })
//         .catch((err) => console.log(err))
//     }

//     getMuni = (fk) =>{
//         console.log('Entra en getMuni y busca el municipio por fk')
//         getLugar(fk)
//         .then((res) =>{
//             var municipio = res.data[0].nombre
//             console.log('NOMBRE MUNICIPIO: ',res.data[0].nombre)
//             this.setState({municipio})
//             this.getEsta(res.data[0].fk_lugar)            
//         })
//         .catch((err) => console.log(err))
//     }

//     lugarCascade2 = () =>{
//         console.log('Entra en lugar cascade y busca la parroquia por fk')
//         getLugar(this.props.location.state.fk_lugar)
//         .then((res) =>{
//             console.log('RESPUESTA EN FRONT: ',res.data)
//             var parroquia = res.data[0].nombre
//             console.log('NOMBRE PARROQUIA: ',res.data[0].nombre)
//             this.setState({parroquia}) 
//             this.getMuni(res.data[0].fk_lugar)         
//         })
//         .catch((err) => console.log(err))
//     }

//     getCargosList = () =>{
//         getCargos()
//         .then((res) => {
//             console.log('CARGOS RECIBIDOS:', res.data)
//             let cargosList = res.data
//             this.setState({cargosList})
//         })
//         .catch((err) => console.log(err))
//     }

//     componentWillMount = () => {
//         this.lugarCascade2();
//         this.getCargosList();

//         const usuarioOp = (this.props.empleado.usuario) ? true : false;
//         const cargoDefault = this.state.cargosList.find((cargo) => cargo.clave === this.state.location.cargo)
//         const parroquiaDefault = this.props.lugares.find((lugar) => lugar.tipo === 'PARROQUIA' && lugar.clave === this.props.location.state.fk_lugar)
//         const municipioDefault = this.props.lugares.find((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.clave === parroquiaDefault.fk_lugar)
//         const estadoDefault = this.props.lugares.find((lugar) => lugar.tipo === 'ESTADO' && lugar.clave === municipioDefault.fk_lugar)
//         this.setState(() => ({ tipoClienteValue, cargoDefault, parroquiaDefault, municipioDefault, estadoDefault }))
//         this.estado(estadoDefault)
//         this.municipio(municipioDefault)
//     }
//     render(){
//         return(
//             <div className="nuevo-empleado">

//                 <h1 className='emp-nuevo-titulo'>Consultar Empleado</h1>

//                 <div className="form-nuevo-emp">
//                     <div className="caja-dosColumns">
//                         <div className="emp-nombre">
//                             <Form className="empleado-nombre">
//                                 <Form.Group as={Row} controlId='formPlaintextText'>
//                                     <Form.Label className="label-nombre" column sm="3">Nombre:</Form.Label>
//                                     <Col sm='9'>
//                                         <Form.Control
//                                             required
//                                             size='lg'
//                                             type='text'
//                                             className='emp-inputs'
//                                             placeholder='Nombre'
//                                             value={this.props.location.state.nombre}
//                                             readOnly
//                                         />
//                                     </Col>
//                                 </Form.Group>
//                             </Form>
//                         </div>
//                         <div className="emp-nombre">
//                             <Form className="empleado-nombre">
//                                 <Form.Group as={Row} controlId='formPlaintextText'>
//                                     <Form.Label className="label-nombre" column sm="3">Apellido:</Form.Label>
//                                     <Col sm='9'>
//                                         <Form.Control
//                                             required
//                                             size='lg'
//                                             type='text'
//                                             className='emp-inputs'
//                                             placeholder='Apellido'
//                                             value={this.props.location.state.apellido}
//                                             readOnly
//                                         />
//                                     </Col>
//                                 </Form.Group>
//                             </Form>
//                         </div>
//                     </div>

//                     <div className="caja-dosColumns">
//                         <div className='emp-nombre'>
//                             <Form className="empleado-nombre">
//                                 <Form.Group as={Row} controlId='formPlaintextText'>
//                                     <Form.Label className="label-nombre" column sm="3">Cédula:</Form.Label>
//                                     <Col sm='9'>
//                                         <Form.Control
//                                             required
//                                             size='lg'
//                                             type='text'
//                                             className='emp-inputs'
//                                             placeholder='Cédula'
//                                             value={this.props.location.state.cedula}
//                                             readOnly
//                                         />
//                                     </Col>
//                                 </Form.Group>
//                             </Form>
//                         </div>
//                         <div className="emp-nombre">
//                             <Form className="empleado-nombre">
//                                 <Form.Group as={Row} controlId='formPlaintextText'>
//                                     <Form.Label className="label-nombre" column sm="3">Género:</Form.Label>
//                                     <Col sm='9'>
//                                         <Form.Control
//                                             required
//                                             size='lg'
//                                             type='text'
//                                             className='emp-inputs'
//                                             placeholder='Teléfono'
//                                             value={(this.props.location.state.sexo === 0  && 'Femenino') || (this.props.location.state.sexo ===   && 'Masculino')}
//                                             readOnly
//                                         />
//                                     </Col>
//                                 </Form.Group>
//                             </Form>
//                         </div>
//                     </div>

//                     <div className="caja-dosColumns">
//                         <div className="emp-nombre">
//                             <Form className="empleado-nombre">
//                                 <Form.Group as={Row} controlId='formPlaintextText'>
//                                     <Form.Label className="label-nombre" column sm="3">Teléfono:</Form.Label>
//                                     <Col sm='9'>
//                                         <Form.Control
//                                             required
//                                             size='lg'
//                                             type='text'
//                                             className='emp-inputs'
//                                             placeholder='Teléfono'
//                                             value={this.props.location.state.telefono}
//                                             readOnly
//                                         />
//                                     </Col>
//                                 </Form.Group>
//                             </Form>
//                         </div>
//                         <div className="emp-nombre">
//                             <Form className="empleado-nombre">
//                                 <Form.Group as={Row} controlId='formPlaintextText'>
//                                     <Form.Label className="label-nombre" column sm="3">Cargo:</Form.Label>
//                                     <Col sm='9'>
//                                         <Form.Control
//                                             required
//                                             size='lg'
//                                             type='text'
//                                             className='emp-inputs'
//                                             placeholder='Teléfono'
//                                             value={this.state.cargoDefault.nombre}
//                                             readOnly
//                                         />
//                                     </Col>
//                                 </Form.Group>
//                             </Form>
//                         </div>
//                     </div>

//                     <div className="caja-lugar">
//                         <div className="lugar-nuevo">
//                             <Form className="yacimiento-modif-nombre">
//                                 <Form.Group as={Row} controlId='formPlaintextText'>
//                                     <Form.Label className="label-nombre" column sm="4">Estado:</Form.Label>
//                                     <Col sm='8'>
//                                         <Form.Control
//                                             required
//                                             size='lg'
//                                             type='text'
//                                             className='yac-inputs'
//                                             placeholder='Estado'
//                                             value={this.state.estadoDefault.nombre}
//                                             readOnly
//                                         />
//                                     </Col>
//                                 </Form.Group>
//                             </Form>
//                         </div>
//                         <div className="lugar-nuevo">
//                             <Form className="yacimiento-modif-nombre">
//                                 <Form.Group as={Row} controlId='formPlaintextText'>
//                                     <Form.Label className="label-nombre" column sm="4">Municipio:</Form.Label>
//                                     <Col sm='8'>
//                                         <Form.Control
//                                             required
//                                             size='lg'
//                                             type='text'
//                                             className='yac-inputs'
//                                             placeholder='Municipio'
//                                             value={this.state.municipioDefault.nombre}
//                                             readOnly
//                                         />
//                                     </Col>
//                                 </Form.Group>
//                             </Form>
//                         </div>
//                         <div className="lugar-nuevo">
//                             <Form className="yacimiento-modif-nombre">
//                                 <Form.Group as={Row} controlId='formPlaintextText'>
//                                     <Form.Label className="label-nombre" column sm="4">Parroquia:</Form.Label>
//                                     <Col sm='8'>
//                                         <Form.Control
//                                             required
//                                             size='lg'
//                                             type='text'
//                                             className='yac-inputs'
//                                             placeholder='Parroquia'
//                                             value={this.state.parroquiaDefault.nombre}
//                                             readOnly
//                                         />
//                                     </Col>
//                                 </Form.Group>
//                             </Form>
//                         </div>
//                     </div>

//                     <div className="caja-dosColumns">
//                         <div className='emp-fecha'>
//                             <p className='fecha-aliado-label'>Fecha de nacimiento:</p>
//                             <SingleDatePicker
//                                 date={moment(this.props.empleado.fechaNac)}
//                                 onDateChange={dateNac => this.setState({ dateNac })}
//                                 focused={this.state.focusedNac}
//                                 onFocusChange={({ focused }) => this.setState({ focusedNac: focused })}
//                                 displayFormat='DD/MM/YYYY'
//                                 disabled={true}
//                             //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
//                             //monthFormat
//                             />
//                         </div>
//                         <div className='emp-fecha'>
//                             <p className='fecha-aliado-label'>Fecha de ingreso:</p>
//                             <SingleDatePicker
//                                 date={moment(this.props.empleado.fechaIng)}
//                                 onDateChange={dateIng => this.setState({ dateIng })}
//                                 focused={this.state.focusedIng}
//                                 onFocusChange={({ focused }) => this.setState({ focusedIng: focused })}
//                                 displayFormat='DD/MM/YYYY'
//                                 disabled={true}
//                             //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
//                             //monthFormat
//                             />
//                         </div>
//                     </div>

//                     {this.state.usuarioOp &&
//                         <div className='usuarioOp'>
//                             <div className="caja-dosColumns">
//                                 <div className="emp-nombre">
//                                     <Form className="empleado-nombre">
//                                         <Form.Group as={Row} controlId='formPlaintextText'>
//                                             <Form.Label className="label-nombre" column sm="3">Usuario:</Form.Label>
//                                             <Col sm='9'>
//                                                 <Form.Control
//                                                     required
//                                                     size='lg'
//                                                     type='text'
//                                                     className='emp-inputs'
//                                                     placeholder='Usuario'
//                                                     value={this.props.empleado.usuario}
//                                                     readOnly
//                                                 />
//                                             </Col>
//                                         </Form.Group>
//                                     </Form>
//                                 </div>
//                                 <div className='emp-nombre'>
//                                     <Form className="empleado-nombre">
//                                         <Form.Group as={Row} controlId='formPlaintextText'>
//                                             <Form.Label className="label-nombre" column sm="3">Contraseña:</Form.Label>
//                                             <Col sm='9'>
//                                                 <Form.Control
//                                                     required
//                                                     size='lg'
//                                                     type='text'
//                                                     className='emp-inputs'
//                                                     placeholder='Contraseña'
//                                                     value={this.props.empleado.contraseña}
//                                                     readOnly
//                                                 />
//                                             </Col>
//                                         </Form.Group>
//                                     </Form>
//                                 </div>
//                             </div>
//                             <div className='emp-nombre'>
//                                 <Form className="empleado-nombre">
//                                     <Form.Group as={Row} controlId='formPlaintextText'>
//                                         <Form.Label className="label-nombre" column sm="3">Rol:</Form.Label>
//                                         <Col sm='9'>
//                                             <Form.Control
//                                                 required
//                                                 size='lg'
//                                                 type='text'
//                                                 className='emp-inputs'
//                                                 placeholder='Contraseña'
//                                                 value={this.props.empleado.rol}
//                                                 readOnly
//                                             />
//                                         </Col>
//                                     </Form.Group>
//                                 </Form>
//                             </div>
//                         </div>
//                     }
//                 </div>     

//                 <div className='caja-botones-nuevo'>
//                     <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Volver</Button>  
//                 </div>

//             </div>      
//         )
//     }

//     atras_boton = () => {
//         history.goBack()
//     }

// }

// const mapStateToProps = (state, props) => ({
//     empleado: state.empleados.find((empleado) => empleado.id === props.match.params.id),
//     lugares: state.lugares,
//     cargos: state.cargos
// })


// export default connect(mapStateToProps)(EmpleadoConsultar)


import React from 'react'
import { Form, Dropdown, ButtonToolbar, DropdownButton, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { connect } from 'react-redux'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import { getLugar } from '../utils/api'
import {getUsuario} from '../utils/api'
import {getCargo} from '../utils/api'
import {getRol} from '../utils/api';

class EmpleadoConsultar extends React.Component {
    state = {
        cargoDefault: '',
        rolDefault: '',
        estadoDefault: '',
        municipioDefault: '',
        parroquiaDefault: '',
        usuarioOp: false,
        usuariolist: [],
        cargolist: '',
        rolList: '',
        estado: '',
        municipio: '',      
        parroquia: '',
    }

    estado = (e) => {
        const municipios = this.props.lugares.filter((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.fk_lugar === e.clave)
        this.setState(() => ({ municipios }))
    }
    municipio = (e) => {
        const parroquias = this.props.lugares.filter((lugar) => lugar.tipo === 'PARROQUIA' && lugar.fk_lugar === e.clave)
        this.setState(() => ({ parroquias }))
    }

    getusuariolist = () => {
        console.log('CLAVE DEL EMPLEADO: ',this.props.location.state.clave)
        getUsuario(this.props.location.state.clave)
        .then((res) => {
            console.log('ya llegaron los usuarios',res);
            var usuariolist = res.data ;
            let  usuarioOp = false;
            if (usuariolist && usuariolist.length){
                usuarioOp = true
            }
            this.setState({ usuariolist, usuarioOp });
            
        })
        .then(() => {
            this.getRollist();
        })
        .catch((err) => console.log(err));
    }

    getcargolist = () => {
        console.log('FK CARGO EN GETCARGOLIST: ',this.props.location.state.fk_cargo)
        getCargo(parseInt(this.props.location.state.fk_cargo,10))
        .then((res) => {
            console.log('ya llegaron los cargos',res.data);
            var cargolist = res.data[0].nombre ;
            this.setState({ cargolist });
        })
        .catch((err) => console.log(err));
    }

    getRollist = () => {
        getRol(this.state.usuariolist[0].fk_rol)
        .then((res) => {
            console.log('ya llegaron los rol',res.data);
            var rolList = res.data[0].nombre ;
            this.setState({ rolList });
        })
        .catch((err) => console.log(err));
    }

    getEsta = (fk) =>{
        console.log('tercer lugar',parseInt(this.props.location.state.fk_lugar,10))
        getLugar(fk)
        .then((res) =>{
            var estado = res.data[0].nombre
            console.log('NOMBRE ESTADO: ',res.data[0].nombre)
            this.setState({estado})
        })
        .catch((err) => console.log(err))
    }

    getMuni = (fk) =>{
        console.log('segundo lugar',parseInt(this.props.location.state.fk_lugar,10))
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
        console.log('primer lugar',parseInt(this.props.location.state.fk_lugar,10))
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
        this.getusuariolist() ;
        this.getcargolist() ;
    }
    render(){
        return(
            <div className="nuevo-empleado">

                <h1 className='emp-nuevo-titulo'>Consultar Empleado</h1>

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
                                            value={this.props.location.state.nombre}
                                            readOnly
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
                                            value={this.props.location.state.apellido}
                                            readOnly
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
                                            value={this.props.location.state.cedula}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="emp-nombre">
                            <Form className="empleado-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="3">Género:</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='emp-inputs'
                                            placeholder='Teléfono'
                                            value={this.props.location.state.sexo === 0  ? 'Femenino' : 'Masculino'}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
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
                                            value={this.props.location.state.telefono}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="emp-nombre">
                            <Form className="empleado-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="3">Cargo:</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='emp-inputs'
                                            placeholder='cargo'
                                            value={this.state.cargolist}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className="caja-lugar">
                        <div className="lugar-nuevo">
                            <Form className="yacimiento-modif-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="4">Estado:</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='Estado'
                                            value={this.state.estado}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="lugar-nuevo">
                            <Form className="yacimiento-modif-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="4">Municipio:</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='Municipio'
                                            value={this.state.municipio}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="lugar-nuevo">
                            <Form className="yacimiento-modif-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="4">Parroquia:</Form.Label>
                                    <Col sm='8'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='yac-inputs'
                                            placeholder='Parroquia'
                                            value={this.state.parroquia}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className="caja-dosColumns">
                        <div className='emp-fecha'>
                            <p className='fecha-aliado-label'>Fecha de nacimiento:</p>
                            <SingleDatePicker
                                date={moment(this.props.location.state.fecha_nac)}
                                onDateChange={dateNac => this.setState({ dateNac })}
                                focused={this.state.focusedNac}
                                onFocusChange={({ focused }) => this.setState({ focusedNac: focused })}
                                displayFormat='DD/MM/YYYY'
                                disabled={true}
                            //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
                            //monthFormat
                            />
                        </div>
                        <div className='emp-fecha'>
                            <p className='fecha-aliado-label'>Fecha de ingreso:</p>
                            <SingleDatePicker
                                date={moment(this.props.location.state.fecha_contratado)}
                                onDateChange={dateIng => this.setState({ dateIng })}
                                focused={this.state.focusedIng}
                                onFocusChange={({ focused }) => this.setState({ focusedIng: focused })}
                                displayFormat='DD/MM/YYYY'
                                disabled={true}
                            //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
                            //monthFormat
                            />
                        </div>
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
                                                    value={this.state.usuariolist[0].nombre}
                                                    readOnly
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
                                                    value={this.state.usuariolist[0].contraseña}
                                                    readOnly
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                            <div className='emp-nombre'>
                                <Form className="empleado-nombre">
                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                        <Form.Label className="label-nombre" column sm="3">Rol:</Form.Label>
                                        <Col sm='9'>
                                            <Form.Control
                                                required
                                                size='lg'
                                                type='text'
                                                className='emp-inputs'
                                                placeholder='Contraseña'
                                                value={this.state.rolList}
                                                readOnly
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    }
                </div>     

                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Volver</Button>  
                </div>

            </div>      
        )
    }

    atras_boton = () => {
        history.goBack()
    }

}

const mapStateToProps = (state, props) => ({
    empleado: state.empleados.find((empleado) => empleado.id === props.match.params.id),
    lugares: state.lugares,
    cargos: state.cargos
})

export default connect(mapStateToProps)(EmpleadoConsultar)