import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { connect } from 'react-redux'
import Select from 'react-select'
import { postInsertClienteJud } from '../utils/api'
import { postInsertClienteNat } from '../utils/api'
import {getLugares} from '../utils/api'

class ClienteNuevo extends React.Component {
    state = {
        nombre: '',
        apellido: '',
        cedula: null,
        rif: null,
        fk_lugar: '',
        telefono: '',
        estados: '',
        municipios: '',
        parroquias: '',
        disableMunicipios: true,
        disableParroquias: true,
        optionsTipoCliente: [{label: 'Natural', value: 1}, {label: 'Jurídico', value: 2}],
        tipoClienteValue: '',
        lugaresList: ''
    }
    tipoCliente = (e) => {
        const tipoClienteValue = e
        this.setState({ tipoClienteValue })
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

    modificarRIF = (e) => {
        const rif = e.target.value
        this.setState(() => ({ rif }))
    }

    modificarTelefono = (e) => {
        const telefono = e.target.value
        this.setState(() => ({ telefono }))
    }

    modificarFK_Lugar = (e) => {
        const fk_lugar = e.clave
        this.setState(() => ({ fk_lugar }))
    }
    getLugaresList = () => {
        getLugares()
        .then((res) => {
            console.log('LUGARES RECIBIDOS:',res);
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

    componentWillMount() {
        this.getLugaresList();
    }

    postClienteList = () => {
        console.log('LA FK LUGAR Y NOMBRE',this.state.fk_lugar,this.state.nombre)  
        if (this.state.tipoClienteValue.label == 'Jurídico')
        {
            postInsertClienteJud(this.state.nombre,this.state.telefono,this.state.rif,this.state.fk_lugar)
            .then((res) => {

            })
            .catch((err) => console.log(err))
            history.push('/clientes');
        }
        else if(this.state.tipoClienteValue.label == 'Natural')
        {
            postInsertClienteNat(this.state.nombre,this.state.apellido,this.state.telefono,this.state.cedula,this.state.fk_lugar)
            .then((res) => {

            })
            .catch((err) => console.log(err))
            history.push('/clientes');
        }
    }

    render() {
        return (
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Registrar Cliente</h1>

                <div className="form-nuevo-emp">
                    <div className='caja-dosColumns'>
                        <div className='emp-nombre'>
                            <p className='lugar-label'>Tipo:</p>
                            <Select
                                name="cliente-tipo"
                                placeholder='Selecciona el tipo de cliente'
                                options={this.state.optionsTipoCliente}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay clientes con ese nombre"}
                                value={this.state.tipoClienteValue}
                                onChange={this.tipoCliente}
                            />
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
                        </div>}
                    </div>

                    <div className="caja-dosColumns">
                        {this.state.tipoClienteValue.label === 'Natural' &&
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
                        }
                        {this.state.tipoClienteValue.label === 'Jurídico' &&
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
                                                onChange={this.modificarRIF}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                        }
                        {this.state.tipoClienteValue === '' &&
                            <div className='emp-nombre'></div>
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
                </div>

                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.postClienteList} className='botones-nuevo'>Registrar</Button>
                </div>

            </div>
        )
    }

    atras_boton = () => {
        history.goBack()
    }

    registrar_boton = () => {
        history.push('/clientes')
    }

}

const mapStateToProps = (state) => ({
    lugares: state.lugares,
})

export default connect(mapStateToProps)(ClienteNuevo)