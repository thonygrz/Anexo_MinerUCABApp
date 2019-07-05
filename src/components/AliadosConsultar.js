import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { connect } from 'react-redux'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import { getMinerales } from '../utils/api'
import { getMetales } from '../utils/api'
import { getNoMetales } from '../utils/api'
import { getAliadoClave } from '../utils/api'
import { getAli_Min_fk_ali } from '../utils/api'
import { getLugar } from '../utils/api'
import { get } from 'https';

const pruebaMineral = [{
    fk_mineral: '3',
    costo: 4
}]

class AliadosConsultar extends React.Component{
    state = {
        mineralesDefault: [],
        mineralesDefArray: [],
        estadoDefault: '',
        municipioDefault: '',
        parroquiaDefault: '',
        minerales: '',
        mineralList: [],
        metalList: [],
        noMetalList: [],

        estado: '',
        municipio: '',      
        parroquia: '',
    }

    estado = (e) => {
        const municipios = this.props.lugares.filter((lugar) => lugar.tipo === 'Municipio' && lugar.fk_lugar === e.id)
        this.setState(() => ({ municipios }))
    }
    municipio = (e) => {
        const parroquias = this.props.lugares.filter((lugar) => lugar.tipo === 'Parroquia' && lugar.fk_lugar === e.id)
        this.setState(() => ({ parroquias }))
    }

    // getAliadoInd = () =>{
    //     getAliadoClave(this.aliado.clave)
    //     .then((res) => {

    //     })
    //     .catch((err) => console.log(err))
    // }

    getEsta = (fk) =>{
        getLugar(fk)
        .then((res) =>{
            var estado = res.data[0].nombre
            console.log('NOMBRE ESTADO: ',res.data[0].nombre)
            this.setState({estado})
        })
        .catch((err) => console.log(err))
    }

    getMuni = (fk) =>{
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

    getMetalList = () => {
        getMetales()
        .then((res) => {
            console.log(res);
            var metalList = res.data;
            this.setState({ metalList });
        })
        .then(() => {
            this.setState((prevState) => ({ mineralList: prevState.metalList }))
        })
        .then(()=>{
            this.getNoMetalList();
        })
        .catch((err) => console.log(err));
    }

    getNoMetalList = () => {
        getNoMetales()
        .then((res) => {
            console.log(res);
            var noMetalList = res.data;
            this.setState({ noMetalList }); 
        })
        .then(() => {
            this.setState((prevState) => ({ mineralList: prevState.mineralList.concat(prevState.noMetalList) }))
        })
        .then(() => {
            console.log('FK_aliado: ',this.props.location.state.clave)
            getAli_Min_fk_ali(this.props.location.state.clave)
            .then((res) => {
                console.log('ALIMIN:',res.data)
                console.log('MINERALLIST:',this.state.mineralList)
                const mineralesDefArray = []
                const minerales = res.data
                minerales.forEach(min => {
                    if(min.fk_metal){
                        const m_m = this.state.metalList.find((mineral) => (mineral.clave === min.fk_metal) || (mineral.clave === min.fk_nometal))
                        console.log('M:',m_m)
                        if (m_m) {
                            mineralesDefArray.push(m_m)
                        }
                        console.log('MINERALESDEFARRAY:',mineralesDefArray)
                    }
                    else if(min.fk_nometal){
                        const m_nm = this.state.noMetalList.find((mineral) => (mineral.clave === min.fk_metal) || (mineral.clave === min.fk_nometal))
                        console.log('M:',m_nm)
                        if (m_nm) {
                            mineralesDefArray.push(m_nm)
                        }
                        console.log('MINERALESDEFARRAY:',mineralesDefArray)
                    }                    
                })
                let mineralesDefault = ''
                mineralesDefArray.forEach((m, i) => {
                    if (i === 0) {
                        mineralesDefault = m.nombre
                    } else if (i < mineralesDefArray.length) {
                        mineralesDefault = mineralesDefault + ' | ' + m.nombre
                    } else {
                        mineralesDefault = mineralesDefault + ' ' + m.nombre
                    }
                })
                this.setState({minerales, mineralesDefault, mineralesDefArray})
                // const parroquiaDefault = this.props.lugares.find((lugar) => lugar.tipo === 'Parroquia' && lugar.id === this.props.aliado.fk_lugar).nombre
                // const municipioDefault = this.props.lugares.find((lugar) => lugar.tipo === 'Municipio' && lugar.id === parroquiaDefault.fk_lugar).nombre
                // const estadoDefault = this.props.lugares.find((lugar) => lugar.tipo === 'Estado' && lugar.id === municipioDefault.fk_lugar).nombre
                // this.setState(() => ({ minerales, mineralesDefault, mineralesDefArray, parroquiaDefault, municipioDefault, estadoDefault }))
                // this.estado(estadoDefault)
                // this.municipio(municipioDefault)
            })
        })        
        .catch((err) => console.log(err));

    }

    // getMineralList = () => {
    //     console.log('NOMBRE:',this.props.location.state.nombre)
    //     getMinerales()
    //         .then((res) => {
    //             console.log('MINERALES:',res);
    //             var mineralList = res.data;
    //             this.setState({ mineralList });
    //         })
    //         .then(() => {
    //             getAli_Min(this.props.location.state.clave)
    //             .then((res) => {
    //                 console.log('ALIMIN:',res.data)
    //                 const mineralesDefArray = []
    //                 const minerales = res.data
    //                 minerales.forEach(min => {
    //                     const m = this.state.mineralList.find((mineral) => mineral.clave === min.fk_metal || min.fk_nometal)
    //                     if (m) {
    //                         mineralesDefArray.push(m)
    //                     }
    //                 })
    //                 let mineralesDefault = ''
    //                 mineralesDefArray.forEach((m, i) => {
    //                     if (i === 0) {
    //                         mineralesDefault = m.nombre
    //                     } else if (i < mineralesDefArray.length) {
    //                         mineralesDefault = mineralesDefault + ' | ' + m.nombre
    //                     } else {
    //                         mineralesDefault = mineralesDefault + ' ' + m.nombre
    //                     }
    //                 })
    //                 // const parroquiaDefault = this.props.lugares.find((lugar) => lugar.tipo === 'Parroquia' && lugar.id === this.props.aliado.fk_lugar).nombre
    //                 // const municipioDefault = this.props.lugares.find((lugar) => lugar.tipo === 'Municipio' && lugar.id === parroquiaDefault.fk_lugar).nombre
    //                 // const estadoDefault = this.props.lugares.find((lugar) => lugar.tipo === 'Estado' && lugar.id === municipioDefault.fk_lugar).nombre
    //                 // this.setState(() => ({ minerales, mineralesDefault, mineralesDefArray, parroquiaDefault, municipioDefault, estadoDefault }))
    //                 // this.estado(estadoDefault)
    //                 // this.municipio(municipioDefault)
    //             })
    //             .catch((err) => console.log(err))
                
    //         })
    //         .catch((err) => console.log(err));
    // }

    componentWillMount = () => {
        this.lugarCascade2();
        this.getMetalList();
        //this.getMineralList()
    }
    render(){
        return(
            <div className="nuevo-aliado content-container">

                <h1 className='ali-nuevo-titulo'>{this.props.location.state.nombre}</h1>    {/*nombre que es*/}
                
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
                                        value={this.props.location.state.nombre}    
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
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

                    <div className='caja-fecha-aliado'>
                        <p className='fecha-aliado-label'>Fecha de creación:</p>
                        <SingleDatePicker
                            date={moment(this.props.location.state.fecha_c)}
                            onDateChange={date => { this.setState({ fecha: date })}}
                            focused={this.state.focused}
                            onFocusChange={({ focused }) => this.setState({ focused })}
                            displayFormat='DD/MM/YYYY'
                            placeholder='Fecha'
                            disabled={true}
                            //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
                            //monthFormat
                        />
                    </div>

                    <div className="yac-minerales">
                        <Form className="yacimiento-modif-minerales">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="2">Mineral(es):</Form.Label>
                                <Col sm='10'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Minerales'
                                        value={this.state.mineralesDefault}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>

                    {(this.state.mineralesDefArray && this.state.mineralesDefArray.length) > 0 &&
                        <div className='cantidad-mineral'>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesDefArray.map((mineral, index) => {
                                    return (
                                        index % 3 === 0 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="7">Costo de {mineral.nombre} (Bs):</Form.Label>
                                                <Col sm='5'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Costo'
                                                        value={this.state.minerales.find((m) => ((m.fk_metal  === mineral.clave) || (m.fk_nometal  === mineral.clave))).costo}
                                                        readOnly
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesDefArray.map((mineral, index) => {
                                    return (
                                        index % 3 === 1 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="7">Costo de {mineral.nombre} (Bs):</Form.Label>
                                                <Col sm='5'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Costo'
                                                        value={this.state.minerales.find((m) => ((m.fk_metal  === mineral.clave) || (m.fk_nometal  === mineral.clave))).costo}
                                                        readOnly
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                            </div>
                            <div className='cantidad-mineral-column'>
                                {this.state.mineralesDefArray.map((mineral, index) => {
                                    return (
                                        index % 3 === 2 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="7">Costo de {mineral.nombre} (Bs):</Form.Label>
                                                <Col sm='5'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Costo'
                                                        value={this.state.minerales.find((m) => ((m.fk_metal  === mineral.clave) || (m.fk_nometal  === mineral.clave))).costo}
                                                        readOnly
                                                    />
                                                </Col>
                                                <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form>
                                    )
                                })}
                                {console.log()}
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
    aliado: state.aliados.find((aliado) => aliado.clave === props.match.params.id),
    lugares: state.lugares,
    minerales: state.minerales
})


export default connect(mapStateToProps)(AliadosConsultar)