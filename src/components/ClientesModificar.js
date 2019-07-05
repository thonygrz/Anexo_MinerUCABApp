import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import {getLugar} from '../utils/api'
import {getLugares} from '../utils/api'
import {updateClienteNat} from '../utils/api'
import {updateClienteJud} from '../utils/api'

class ClienteModificar extends React.Component {
    state = {
        nombre: this.props.location.state.nombre ? this.props.location.state.nombre : '',
        apellido: this.props.location.state.apellido  ? this.props.location.state.apellido : '',
        cedula: this.props.location.state.cedula ? this.props.location.state.cedula : '',
        rif: this.props.location.state.rif ? this.props.location.state.rif : '',
        fk_lugar: this.props.location.state.fk_lugar ? this.props.location.state.fk_lugar : '',
        telefono: this.props.location.state.telefono ? this.props.location.state.telefono : '',
        
        // estados: this.props.lugares ? this.props.lugares.filter((lugar) => lugar.tipo === 'Estado') : '',
        // municipios: this.props.lugares ? this.props.lugares.filter((lugar) => lugar.tipo === 'Municipio') : '',
        // parroquias: this.props.lugares ? this.props.lugares.filter((lugar) => lugar.tipo === 'Parroquia') : '',
        
        lugaresList: [],
        estados: [],
        municipios: [],
        parroquias: [],
        estado: '',
        municipio: '',      
        parroquia: '',

        disableMunicipios: true,
        disableParroquias: true,
        estadoDefault: '',
        municipioDefault: '',
        parroquiaDefault: '',
        optionsTipoCliente: [{ label: 'Natural', value: 1 }, { label: 'Jurídico', value: 2 }],
        tipoClienteValue: ''
    }
    tipoCliente = (e) => {
        const tipoClienteValue = e
        this.setState({ tipoClienteValue })
    }

    updateClienteList = () => {
        console.log('COMIENZA UPDATECLIENTELIST')
        console.log('CLAVE, NOMBRE, APELLIDO, CEDULA, RIF, TELEFONO, FK_LUGAR',this.props.location.state.clave,this.state.nombre,this.state.apellido,this.state.cedula,this.state.rif,this.state.telefono,this.state.fk_lugar)
        
        if(this.state.apellido){
            updateClienteNat(this.props.location.state.clave,this.state.nombre,this.state.apellido,this.state.telefono,this.state.cedula,this.state.fk_lugar)
            .then((res) => {
                console.log('CLAVE CLIENTE NAT ACTUALIZADO: ',res.data)
            })
            .catch((err) => console.log(err))
            history.push('/clientes');
        }
        else if(!this.state.apellido){
            updateClienteJud(this.props.location.state.clave,this.state.nombre,this.state.telefono,this.state.rif,this.state.fk_lugar)
            .then((res) => {
                console.log('CLAVE CLIENTE JUD ACTUALIZADO: ',res.data)
            })
            .catch((err) => console.log(err))
            history.push('/clientes');
        }
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

    modificarRif = (e) => {
        const rif = e.target.value
        this.setState(() => ({ rif }))
    }

    modificarTelefono = (e) => {
        const telefono = e.target.value
        this.setState(() => ({ telefono }))
    }

    cambiarFk_lugar = (e) => {
        console.log('Entró en cambiar fk_lugar')
        console.log('PARROQUIA SELECCIONADA ',e.nombre)
        this.setState({fk_lugar : e.clave})
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

        const tipoClienteValue = this.props.location.state.cedula ? this.state.optionsTipoCliente.find((o) => o.label === 'Natural') : this.state.optionsTipoCliente.find((o) => o.label === 'Jurídico')
        const parroquiaDefault = this.props.lugares.find((lugar) => lugar.tipo === 'PARROQUIA' && lugar.id === this.props.location.state.fk_lugar)
        const municipioDefault = this.props.lugares.find((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.id === parroquiaDefault.fk_lugar)
        const estadoDefault = this.props.lugares.find((lugar) => lugar.tipo === 'ESTADO' && lugar.id === municipioDefault.fk_lugar)
        this.setState(() => ({ tipoClienteValue, parroquiaDefault, municipioDefault, estadoDefault }))
        this.estado(estadoDefault)
        this.municipio(municipioDefault)
    }
    render(){
        return(
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Modificar Cliente</h1>

                <div className="form-nuevo-emp">
                    <div className='caja-dosColumns'>
                        <div className='emp-nombre'>
                        <Form className="empleado-nombre">
                                <Form.Group as={Row} controlId='formPlaintextText'>
                                    <Form.Label className="label-nombre" column sm="3">Tipo:</Form.Label>
                                    <Col sm='9'>
                                        <Form.Control
                                            required
                                            size='lg'
                                            type='text'
                                            className='emp-inputs'
                                            placeholder='Tipo'
                                            value={this.state.tipoClienteValue.label}
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
                        {this.state.tipoClienteValue.label === 'Natural' &&
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
                        }
                    </div>

                    <div className="caja-dosColumns">
                        {this.state.tipoClienteValue.label === 'Natural' ?
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
                            </div> :
                            <div className='emp-nombre'>
                                <Form className="empleado-nombre">
                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                        <Form.Label className="label-nombre" column sm="3">RIF:</Form.Label>
                                        <Col sm='9'>
                                            <Form.Control
                                                required
                                                size='lg'
                                                type='text'
                                                className='emp-inputs'
                                                placeholder='RIF'
                                                value={this.state.rif}
                                                onChange={this.modificarRif}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                        }
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
                                //value={this.state.municipioDefault}
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
                                //value={this.state.parroquiaDefault}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay parroquias con ese nombre"}
                                placeholder={this.state.parroquia}
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option.clave}
                                onChange={this.cambiarFk_lugar}
                            />
                        </div>
                    </div>
                </div>

                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.updateClienteList} className='botones-nuevo'>Guardar</Button>
                </div>

            </div>      
        )
    }

    atras_boton = () => {
        history.push('/clientes')
    } 

}

const mapStateToProps = (state, props) => ({
    cliente: state.clientes.find((cliente) => cliente.id === props.match.params.id),
    lugares: state.lugares,
})

export default connect(mapStateToProps)(ClienteModificar)