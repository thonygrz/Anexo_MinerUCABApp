import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { connect } from 'react-redux'
import { modificarAliados } from '../actions/aliados'
import Select from 'react-select'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import { getMinerales } from '../utils/api'
import { getLugar } from '../utils/api'
import { getMetales } from '../utils/api'
import { getNoMetales } from '../utils/api'
import { getLugares } from '../utils/api'
import { getAli_Min } from '../utils/api'
import { getAli_Min_fk_ali } from '../utils/api'
import { updateAliado } from '../utils/api'
import { updateMetal } from '../utils/api'
import { updateNoMetal } from '../utils/api'
import { deleteAli_Min } from '../utils/api'
import { postMetal } from '../utils/api'
import { postNoMetal } from '../utils/api'

const pruebaMineral = [{
    fk_mineral: '3',
    costo: 4
}]

class AliadosModificar extends React.Component{

    state = {
        nombre: this.props.location.state.nombre ? this.props.location.state.nombre : '',
        //minerales: this.props.aliado ? this.props.aliado.minerales : [],
        fk_lugar: this.props.location.state.fk_lugar ? this.props.location.state.fk_lugar : '',
        fecha: this.props.location.state.fecha_c ? moment(this.props.location.state.fecha_c) : null,
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
        mineralesSelect: [],
        mineralesBegin: [],
        estadoDefault: '',
        municipioDefault: '',
        parroquiaDefault: '',
        mineralesDelAliado: '',
        mineralList: ''
    }

    deleteAli_MinList = () =>{
        console.log('DELETE ALIMIN')
        console.log('MINERALESDEFAULT EN DELETE ALIMIN:',this.state.mineralesDefault)
        this.state.mineralesBegin.forEach((minBegin) => {
            let boolALiMin = true
            this.state.mineralesDefault.forEach((minDef)=>{
                console.log('MINBEGIN: ',minBegin.clave,minBegin.fk_metal,minBegin.fk_nometal)
                console.log('MINLIST: ',minList.clave)
                if((minDef.clave === minBegin.fk_metal)||(minDef.clave === minBegin.fk_nometal)){
                    console.log('DELETE ALIMIN DENTRO')
                    
                    // deleteAli_Min(minBegin.clave)
                    // .then((res)=>{

                    // })
                    // .catch((err) => console.log(err))
                }
            })
        })
    }

    updateAli_Min = () => {
        let c = this.props.location.state.clave
        console.log('MINERALES DEL ALIADO:',this.state.mineralesDelAliado)
        console.log('CLAVE ALIADO: ',c)
        this.state.mineralesDelAliado.forEach((cosmin) => {
            if(cosmin.fk_no_metal) {                
                console.log('No Metal')
                getAli_Min(cosmin.clave)
                .then((res) =>{
                    if(res.data.length>0){
                        updateNoMetal(cosmin.fk_nometal,c,cosmin.costo)
                        .then((res) => {
                        console.log('updateNoMetal')
                        })
                        // .then(()=>{
                        //     this.deleteAli_MinList();
                        // })
                        .catch((err) => console.log(err));
                    }
                    else{
                        // postNoMetal(cosmin.fk_metal,c,cosmin.costo)
                        // .then((res) => {
                        // console.log('insertMetal')
                        // })
                        // .then(()=>{
                        //     this.deleteAli_MinList();
                        // })
                        // .catch((err) => console.log(err));
                    }

                })  
            }           
            else {
                console.log('Metal')
                getAli_Min(cosmin.clave)
                .then((res) =>{
                    if(res.data.length>0){
                        updateMetal(cosmin.fk_metal,c,cosmin.costo)
                        .then((req) => {
                        console.log('updateMetal')
                        })
                        // .then(()=>{
                        //     this.deleteAli_MinList();
                        // })
                        .catch((err) => console.log(err));
                    }
                    else{
                        // postMetal(cosmin.fk_metal,c,cosmin.costo)
                        // .then((req) => {
                        // console.log('insertMetal')
                        // })
                        // .then(()=>{
                        //     this.deleteAli_MinList();
                        // })
                        // .catch((err) => console.log(err));
                    }

                })
                
            }
        })
    }

    updateAliadoList = () => {
        console.log('COMIENZA UPDATEALIADOLIST')
        console.log('CLAVE, NOMBRE, DATE, FK_LUGAR',this.props.location.state.clave,this.state.nombre,this.state.fecha,this.state.fk_lugar)
        updateAliado(this.props.location.state.clave,this.state.nombre,this.state.fecha,this.state.fk_lugar)
        .then((res) => {
            console.log('CLAVE ALIADO ACTUALIZADO: ',res.data)
            //this.updateAli_Min();
        })
        .catch((err) => console.log(err))
        history.push('/aliados');
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

    onSubmit = (e) => {
        e.preventDefault()
        // const aliado = {
        //     //nombre: this.state.nombre,
        //     //rif: this.state.rif,
        //     //telefono: this.state.telefono,
        //     //zona: this.state.zona,
        //     //mineral: this.state.mineral,
        //     //costo: this.state.costo
        // }
        // this.props.modificarAliado(this.props.aliado.id, aliado)

        updateAliado(this.state.nombre,this.state.fecha)    //falta fk_lugar
        .then((res) => {

        })
        .catch((err) => console.log(err))
    }

    cambiarCosto = (e, clave) => {
        const costo = e.target.value
        const mineralesAliNueva = []    //MOSCA YA NO SE LLAMA MINERALES 
        this.state.mineralesDelAliado.forEach((c) => {
            if (c.fk_metal === clave) {
                mineralesAliNueva.push({ fk_metal: clave, fk_nometal: null, costo })
            } else if (c.fk_no_metal === clave) {
                mineralesAliNueva.push({ fk_nometal: clave, fk_metal: null, costo })
            } else {
                mineralesAliNueva.push(c)
            }
        })
        this.setState(() => ({ mineralesDelAliado: mineralesAliNueva }))
    }

    cambiarMineral = (e) => {
        console.log('Entró en renderizar mineral')
        const mineralesSelect = e
        let mineralesDelAliado = []
        if (!!mineralesSelect) {
            mineralesDelAliado = mineralesSelect.map((m) => {
                if (this.state.mineralesDelAliado.length > 0 && !!this.state.mineralesDelAliado.find((c) => ((c.fk_metal === m.clave)||(c.fk_nometal === m.clave)))) {
                    return this.state.mineralesDelAliado.find((c) => ((c.fk_metal === m.clave)||(c.fk_nometal === m.clave)))
                } else if (m.dureza && m.dureza !== '') {
                    return ({ fk_aliado: this.props.location.state.clave, fk_metal: m.clave, fk_no_metal: null, costo: '' })
                } else {
                    return ({ fk_aliado: this.props.location.state.clave, fk_no_metal: m.clave, fk_metal: null, costo: '' })
                }
            })
        }
        console.log('MINERALES SELECT:',mineralesSelect)
        console.log('MINERALES DEL ALIADO: ',mineralesDelAliado)
        this.setState({ mineralesDelAliado, mineralesSelect })
    }

    cambiarNombre = (e) => {
        // if(e.key === 'Enter'){
            const nombre = e.target.value
            this.setState(() => ({ nombre }))  
        // }
    }

    cambiarDate = (e) => {
        console.log('Entró en cambiar date')
        let fecha = e.format('YYYY-MM-DD')
        fecha = moment(fecha)
        this.setState(() => ({ fecha }))
        console.log('NUEVA FECHA:',fecha)
    }

    cambiarFk_lugar = (e) => {
        console.log('Entró en cambiar fk_lugar')
        console.log('PARROQUIA SELECCIONADA ',e.nombre)
        this.setState({fk_lugar : e.clave})
    }

    municipioBegin = () => {
        console.log('Entra en municipioBegin')
        console.log('LUGARESLIST M BEGIN:',this.state.lugaresList)      
        console.log('MUNICIPIO BEGIN:',this.state.estado)      
        let clave_m = this.state.lugaresList.find((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.nombre === this.state.municipio).clave
      
        console.log('CLAVE MUNICIPIO BEGIN:',clave_m)      
        const parroquias = this.state.lugaresList.filter((lugar) => lugar.tipo === 'PARROQUIA' && lugar.fk_lugar === clave_m)
        console.log('PARROQUIAS BEGIN:',parroquias)     
        this.setState(() => ({ parroquias, disableParroquias: false }))
    }

    estadoBegin = () => {
        console.log('Entra en estadoBegin')
        console.log('LUGARESLIST EN BEGIN:',this.state.lugaresList)      
        console.log('ESTADO BEGIN:',this.state.estado)      
      
        let clave_e = this.state.lugaresList.find((lugar) => lugar.tipo === 'ESTADO' && lugar.nombre === this.state.estado).clave
      
        console.log('CLAVE ESTADO BEGIN:',clave_e)       
        const municipios = this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.fk_lugar === clave_e)
        console.log('MUNICIPIOS BEGIN:',municipios)
        this.setState(() => ({ municipios, disableMunicipios: false }))
        this.municipioBegin()
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
            this.estadoBegin();
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

    getAli_MinList = () => {
        console.log('Entra en getAli_MinList y pide todos los alimin del aliado')
         getAli_Min_fk_ali(this.props.location.state.clave)
            .then((res) => {
                console.log('ALIMINES DEL ALIADO: ',res.data)
                const mineralesSelect = []
                const mineralesDelAliado = res.data
                mineralesDelAliado.forEach(min => {
                    if(min.fk_metal){
                        const m = this.state.metalList.find((mineral) => mineral.clave === min.fk_metal)
                        if (m) {
                            mineralesSelect.push(m)
                        }
                    }
                    else if(min.fk_nometal){
                        const m = this.state.noMetalList.find((mineral) => mineral.clave === min.fk_nometal)
                        if (m) {
                            mineralesSelect.push(m)
                        }
                    }
                })
                this.setState(() => ({ mineralesDelAliado, mineralesSelect}))
            })
            .then(()=>{
                this.setState((prevState) => ({mineralesBegin: prevState.mineralesDelAliado}))
            })
            .catch((err) => console.log(err))
    }

    getNoMetalList = () => {
        console.log('Entra en getMetalList y pide los metales')
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
        .then(() => {
           this.getAli_MinList()
        })
        .catch((err) => console.log(err));

    }

    getMetalList = () => {
        console.log('Entra en getMetalList y pide los metales')
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
        .then(() => {
            this.getNoMetalList();
        })
        .catch((err) => console.log(err));
    }

    getMineralList = () => {
        console.log('hola')
        getMinerales()
            .then((res) => {
                console.log(res);
                var mineralList = res.data;
                this.setState({ mineralList });
            })
            .then(() => {

                const mineralesDefault = []
                const minerales = pruebaMineral
                minerales.forEach(min => {
                    const m = this.state.mineralList.find((mineral) => mineral.clave === min.fk_mineral)
                    if (m) {
                        mineralesDefault.push(m)
                    }
                })
                const parroquiaDefault = this.props.lugares.find((lugar) => lugar.tipo === 'PARROQUIA' && lugar.id === this.props.location.state.fk_lugar)
                const municipioDefault = this.props.lugares.find((lugar) => lugar.tipo === 'MUNICIPIO' && lugar.id === parroquiaDefault.fk_lugar)
                const estadoDefault = this.props.lugares.find((lugar) => lugar.tipo === 'ESTADO' && lugar.id === municipioDefault.fk_lugar)
                this.setState(() => ({ minerales, mineralesDefault, parroquiaDefault, municipioDefault, estadoDefault }))
                this.estado(estadoDefault)
                this.municipio(municipioDefault)
            })
            .catch((err) => console.log(err));
    }

    componentWillMount = () => {
        this.lugarCascade2();
        this.getMetalList();
        
       // this.getLugaresList();
        // this.estadoBegin();
        // this.municipioBegin();
    }

    render(){
        return(
            <div className="nuevo-aliado content-container">

                <h1 className='ali-nuevo-titulo'>{this.state.nombre}</h1>
                
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
                                        // onKeyDown={this.cambiarNombre}
                                        onChange={this.cambiarNombre}
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
                                //value={this.state.estadoDefault}
                                options={this.state.estados}
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
                                //value={this.state.municipioDefault}
                                options={this.state.municipios}
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
                               // value={this.state.parroquiaDefault}
                                options={this.state.parroquias}
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

                    <div className='caja-fecha-aliado'>
                        <p className='fecha-aliado-label'>Fecha de creación:</p>
                        <SingleDatePicker
                            date={this.state.fecha}
                            onDateChange={this.cambiarDate}
                            focused={this.state.focused}
                            onFocusChange={({ focused }) => this.setState({ focused })}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            displayFormat='DD/MM/YYYY'
                            placeholder={this.props.location.state.fecha_c}
                            //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
                            //monthFormat
                        />
                    </div>

                    <div className='caja-multi-select'>
                        <p className='select-label'>Mineral:</p>
                        <Select
                            isMulti
                            name="minerales"
                            value={this.state.mineralesSelect}
                            options={this.state.mineralList}
                            getOptionLabel={(option) => option.nombre}
                            getOptionValue={(option) => option.nombre}
                            className="multi-select"
                            classNamePrefix="select"
                            noOptionsMessage={() => "No hay minerales con ese nombre"}
                            placeholder="Selecciona Mineral(es)"
                            onChange={this.cambiarMineral}
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
                                                <Form.Label column sm="7">Costo de {mineral.nombre} (Bs):</Form.Label>
                                                <Col sm='5'>
                                                    <Form.Control
                                                        required
                                                        value={this.state.mineralesDelAliado.find((m) => ((m.fk_metal === mineral.clave) || (m.fk_nometal === mineral.clave))).costo}
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Costo'
                                                        onChange={(e) => this.cambiarCosto(e, mineral.clave)}
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
                                                <Form.Label column sm="7">Costo de {mineral.nombre} (Bs):</Form.Label>
                                                <Col sm='5'>
                                                    <Form.Control
                                                        required
                                                        value={this.state.mineralesDelAliado.find((m) => ((m.fk_metal === mineral.clave) || (m.fk_nometal === mineral.clave))).costo}
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Costo'
                                                        onChange={(e) => this.cambiarCosto(e, mineral.clave)}
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
                                                <Form.Label column sm="7">Costo de {mineral.nombre} (Bs):</Form.Label>
                                                <Col sm='5'>
                                                    <Form.Control
                                                        required
                                                        value={this.state.mineralesDelAliado.find((m) => ((m.fk_metal === mineral.clave) || (m.fk_nometal === mineral.clave))).costo}
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        placeholder='Costo'
                                                        onChange={(e) => this.cambiarCosto(e, mineral.clave)}
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
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo' variant="secondary" >Cancelar</Button>
                    <Button onClick={this.updateAliadoList} className='botones-nuevo' type="submit" >Guardar</Button>
                </div>

    //         </div>
        )
    }
    atras_boton = () => {
        history.goBack()
    }
}

const mapStateToProps = (state, props) => ({
    aliado: state.aliados.find((aliado) => aliado.id === props.match.params.id),
    lugares: state.lugares,
    minerales: state.minerales
})

const mapDispatchToProps = (dispatch) => ({
    modificarAliado: (id, updates) => dispatch(modificarAliados(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(AliadosModificar)