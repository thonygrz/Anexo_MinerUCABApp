import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { connect } from 'react-redux'
import Select from 'react-select'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { postAliado } from '../utils/api'
import { postAliadoPrueba } from '../utils/api'
import moment from 'moment'
import {getMinerales} from '../utils/api'
import {getMetales} from '../utils/api'
import {getNoMetales} from '../utils/api'
import {getLugares} from '../utils/api'
import {getAliadosClaves} from '../utils/api'
import {getLugar} from '../utils/api'
import { postMetal } from '../utils/api'
import { postNoMetal } from '../utils/api'
import Axios from "axios";



class AliadosNuevo extends React.Component {
   // _isMounted = false;

    state = {
        estados: [],
        municipios: [],
        parroquias: [],
        disableMunicipios: true,
        disableParroquias: true,
        lugaresList: [],
        metalList: [],
        noMetalList: [],
        mineralList: [],
        mineralesSelect: [],
        costoMineral: [],
        claves: [],
        focused: false,
        date: null,
        fk_lugar:'',
        clave_ali: '',
        nombre: '',
        
        estado: '',
        municipio: '',
        parroquia: '',
    }

    // setLugares = () =>{
    //     var estados = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'ESTADO') : []
    //     var municipios = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO') : []
    //     var parroquias = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'PARROQUIA') : []
    //     this.setState({estados})
    //     this.setState({municipios})
    //     this.setState({parroquias})
    //     console.log('estados',estados)
    //     console.log('municipios',municipios)
    //     console.log('parroquias',parroquias)
    // }

    getLugaresList = () => {
        getLugares()
        .then((res) => {
            //if(this._isMounted){
                console.log(res);
                var lugaresList = res.data;
                this.setState({lugaresList})             
           // }
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

    postAli_Min = () => {
        getAliadosClaves()
        .then((res) => {
            console.log('CLAVES: ',res.data)
            var claves = res.data
            console.log(claves[claves.length-1])
            var c = claves[claves.length-1]

            console.log('COSTO MINERAL',this.state.costoMineral)
            console.log('CLAVE ALIADO',c)
            this.state.costoMineral.forEach((cosmin) => {
                if(cosmin.fk_no_metal) {                
                    console.log('No Metal')
                    postNoMetal(cosmin.fk_no_metal,c.clave,cosmin.costo)
                    .then((req) => {
                    console.log('postNoMetal')
                    })
                    .catch((err) => console.log(err))
                }           
                else {
                    console.log('Metal')
                    
                    postMetal(cosmin.fk_metal,c.clave,cosmin.costo)
                    .then((req) => {
                    console.log('postMetal')
                    })
                    .catch((err) => console.log(err));
                }
            })
        })
        .catch((err) => console.log(err))
    }

    postAliadoList = () => {
        console.log('LA FK LUGAR Y NOMBRE',this.state.fk_lugar,this.state.nombre)
        postAliado(this.state.nombre,this.state.date,this.state.fk_lugar)
        .then((res) => {
            console.log('PUNTO THEN')
            console.log('COSTO MINERAL',this.state.costoMineral)
            this.postAli_Min();
        })
        .catch((err) => console.log(err))
        history.push('/aliados');
    }

    mineralNuevo = (e) => {
        const mineralesSelect = e
        let costoMineral = []
        if (!!mineralesSelect) {
            costoMineral = mineralesSelect.map((m) => {
                if (this.state.costoMineral.length > 0 && !!this.state.costoMineral.find((c) => ((c.fk_metal === m.clave)||(c.fk_nometal === m.clave)))) {
                    return this.state.costoMineral.find((c) => ((c.fk_metal === m.clave)||(c.fk_nometal === m.clave)))
                } else if (m.dureza && m.dureza !== '') {
                    return ({ fk_metal: m.clave, fk_no_metal: null, costo: '' })
                } else {
                    return ({ fk_no_metal: m.clave, fk_metal: null, costo: '' })
                }
            })
        }
        this.setState({ mineralesSelect, costoMineral })
    }

    nuevoCostoMineral = (e, clave) => {
        const costo = e.target.value
        const mineral = []
        this.state.costoMineral.forEach((c) => {
            if (c.fk_metal === clave) {
                mineral.push({ fk_metal: clave, fk_no_metal: null, costo })
            } else if (c.fk_no_metal === clave) {
                mineral.push({ fk_no_metal: clave, fk_metal: null, costo })
            } else {
                mineral.push(c)
            }
        })
        this.setState(() => ({ costoMineral: mineral }))
    }

    nuevoNombre = (e) => {
        const nombre = e.target.value
        this.setState(() => ({ nombre }))
    }

    nuevaDate = (e) => {
        const date = e.format('YYYY-MM-DD')
        this.setState(() => ({ date }))
        console.log(date)
    }

    nuevaFk_lugar = (e) => {
        console.log('PARROQUIA SELECCIONADA ',e.nombre)
        this.setState({fk_lugar : e.clave})
        // getLugar(e.nombre)
        // .then((res) => {
        //     console.log('recibido',res);          
        //     const fk_lugar = res.data.clave
        //     this.setState(() => ({ fk_lugar }))
        // })
        // .catch((err) => console.log(err));
    }

    getMineralList = () => {
        getMinerales()
        .then((res) => {
           // if(this._isMounted){
                console.log(res);
                var mineralList = res.data;
                this.setState({ mineralList });
          //  }
        })
        .catch((err) => console.log(err));
    }

    getMetalList = () => {
        getMetales()
        .then((res) => {
            //if(this._isMounted){
                console.log(res);
                var metalList = res.data;
                this.setState({ metalList });
            //}
        })
        .then(() => {
            this.setState((prevState) => ({ mineralList: prevState.metalList }))
        })
        .catch((err) => console.log(err));
    }

    getNoMetalList = () => {
        getNoMetales()
        .then((res) => {
           // if(this._isMounted){
                console.log(res);
                var noMetalList = res.data;
                this.setState({ noMetalList });
           // }
        })
        .then(() => {
            this.setState((prevState) => ({ mineralList: prevState.mineralList.concat(prevState.noMetalList) }))
        })
        .catch((err) => console.log(err));

    }

    componentDidMount() {
        //this._isMounted = true;

        //this.getMineralList();
        this.getMetalList();
        this.getNoMetalList();
        this.getLugaresList();
    }

    // componentWillUnmount = () => {
    //     this._isMounted = false;
    // } 

    estado = (e) => {
        const municipios = this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.fk_lugar === e.clave)
        this.setState(() => ({ municipios, disableMunicipios: false }))
    }
    municipio = (e) => {
        const parroquias = this.state.lugaresList.filter((lugar) => lugar.tipo === 'PARROQUIA' && lugar.fk_lugar === e.clave)
        this.setState(() => ({ parroquias, disableParroquias: false }))
    }
    render() {
        return (
            <div className="nuevo-aliado content-container">
                <h1 className='ali-nuevo-titulo'>Nuevo Aliado</h1>

                <div className="form-nuevo-ali">
                    <div className="ali-nombre-nuevo">
                        <Form className="aliado-nombre-nuevo">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="3">Nombre:</Form.Label>
                                <Col sm='9'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Nombre'
                                        value={this.state.nombre}
                                        onChange={this.nuevoNombre}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
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
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option.clave}
                                isDisabled={this.state.disableMunicipios}
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
                                getOptionLabel={option => option.nombre}
                                getOptionValue={option => option}
                                defaultValue={this.state.parroquia}
                                onChange={this.nuevaFk_lugar}
                                isDisabled={this.state.disableParroquias}
                                //isDisabled={this.state.disableParroquias}
                            />
                        </div>
                    </div>
                    
                    <div className='caja-fecha-aliado'>
                        <p className='fecha-aliado-label'>Fecha de creación:</p>
                        <SingleDatePicker
                            date={this.state.date ? moment(this.state.date) : this.state.date}  
                            onDateChange={this.nuevaDate}
                            focused={this.state.focused}
                            onFocusChange={({ focused }) => this.setState({ focused })}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            displayFormat='DD/MM/YYYY'
                            placeholder='Fecha'
                            //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
                            //monthFormat
                        />
                    </div>

                    <div className='caja-multi-select'>
                        <p className='select-label'>Mineral:</p>
                        <Select
                            isMulti
                            name="minerales"
                            options={this.state.mineralList}
                            getOptionLabel={(option) => option.nombre}
                            getOptionValue={(option) => option.nombre}
                            className="multi-select"
                            classNamePrefix="select"
                            noOptionsMessage={() => "No hay minerales con ese nombre"}
                            placeholder="Selecciona Mineral(es)"
                            onChange={this.mineralNuevo}
                        />
                    </div>

                    {(this.state.mineralesSelect && this.state.mineralesSelect.length) > 0 &&
                        <div className='cantidad-mineral'>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesSelect.map((mineral, index) => {
                                    return (
                                        index % 3 === 0 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Costo de {mineral.nombre} (Bs):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Costo'
                                                        value={this.state.costoMineral.find((c) => c.fk_metal === mineral.clave || c.fk_no_metal === mineral.clave).costo}
                                                        onChange={(e) => this.nuevoCostoMineral(e, mineral.clave)}
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesSelect.map((mineral, index) => {
                                    return (
                                        index % 3 === 1 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Costo de {mineral.nombre} (Bs):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Costo'
                                                        value={this.state.costoMineral.find((c) => c.fk_metal === mineral.clave || c.fk_no_metal === mineral.clave).costo}
                                                        onChange={(e) => this.nuevoCostoMineral(e, mineral.clave)}
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesSelect.map((mineral, index) => {
                                    return (
                                        index % 3 === 2 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Costo de {mineral.nombre} (Bs):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Cantidad'
                                                        value={this.state.costoMineral.find((c) => c.fk_metal === mineral.clave || c.fk_no_metal === mineral.clave).costo}
                                                        onChange={(e) => this.nuevoCostoMineral(e, mineral.clave)}
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.postAliadoList} className='botones-nuevo'>Registrar</Button>
                </div>

            </div>
        )
    }
    atras_boton = () => {
        history.goBack()
    }
}

const mapStateToProps = (state) => ({
    lugares: state.lugares
})

export default connect(mapStateToProps)(AliadosNuevo)