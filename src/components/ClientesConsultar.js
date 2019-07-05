import React from 'react'
import { Form, Dropdown, ButtonToolbar, DropdownButton, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { connect } from 'react-redux'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import {getLugar} from '../utils/api'
import {getLugares} from '../utils/api'

class ClientesConsultar extends React.Component {
    state = {
        estadoDefault: '',
        municipioDefault: '',
        parroquiaDefault: '',

        lugaresList: [],
        estados: [],
        municipios: [],
        parroquias: [],
        estado: '',
        municipio: '',      
        parroquia: '',

        optionsTipoCliente: [{ label: 'Natural', value: 1 }, { label: 'Jurídico', value: 2 }],
        tipoClienteValue: ''
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

    estado = (e) => {
        const municipios = this.props.lugares.filter((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.fk_lugar === e.clave)
        this.setState(() => ({ municipios }))
    }
    municipio = (e) => {
        const parroquias = this.props.lugares.filter((lugar) => lugar.tipo === 'PARROQUIA' && lugar.fk_lugar === e.clave)
        this.setState(() => ({ parroquias }))
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
            <div className="nuevo-empleado">

                <h1 className='emp-nuevo-titulo'>Consultar Cliente</h1>

                <div className="form-nuevo-emp">
                    <div className="caja-dosColumns">
                        <div className="emp-nombre">
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
                                            value={this.props.location.state.nombre}
                                            readOnly
                                        />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        {this.props.location.state.cedula &&
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
                        }
                    </div>

                    <div className="caja-dosColumns">
                        {this.props.location.state.cedula ?
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
                                                value={this.props.location.state.rif}
                                                readOnly
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
                                            value={this.props.location.state.telefono}
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
    cliente: state.clientes.find((cliente) => cliente.id === props.match.params.id),
    lugares: state.lugares,
})


export default connect(mapStateToProps)(ClientesConsultar)