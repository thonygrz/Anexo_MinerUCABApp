import React from 'react'
import ProyectosNuevoEtapa from './ProyectosNuevoEtapa'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import { getEtapasY, getYacimientos, getNoMetales, getMetales, getYanMin } from '../utils/api'

class ProyectosNuevo extends React.Component{
    botonAtras = () => {
        history.goBack()
    }
    state = {
        etapas: [],
        yacimientosList: [],
        yacimientoSelect: '',
        yanMinList: [],
        yanMinSelect: '',
        mineralesDefArray: [],
    }

    yanMinNuevo = (e) => {
        const yanMinSelect = e
        this.setState({ yanMinSelect })
    }

    getFasesList = () => {
        getFasesE(this.state.etapa.clave, this.state.yacimiento.clave)
            .then((res) => {
                const fases = res.data
                this.setState({ fases })
            })
    }

    getNoMetalList = () => {
        getNoMetales()
            .then((res) => {
                const noMetalList = res.data
                this.setState({ noMetalList })
            })
            .then(() => {
                this.setState((prevState) => ({ mineralList: prevState.mineralList.concat(prevState.noMetalList) }))
            })
            .then(() => {
                const mineralesDefArray = []
                const minerales = this.state.yanMinList
                minerales.forEach(min => {
                    let m
                    if (min.fk_metal) {
                        m = this.state.metalList.find((mineral) => mineral.clave === min.fk_metal)
                    } else {
                        m = this.state.noMetalList.find((mineral) => mineral.clave === min.fk_nometal)
                    }

                    if (m) {
                        mineralesDefArray.push({
                            ...m,
                            cantidad: min.cantidad
                        })
                    }
                })
                this.setState(() => ({ mineralesDefArray }))
            })
            .catch((err) => console.log(err))
    }

    getMetalList = () => {
        getMetales()
            .then((res) => {
                const metalList = res.data
                this.setState({ metalList })
            })
            .then(() => {
                this.setState((prevState) => ({ mineralList: prevState.metalList }))
            })
            .then(() => {
                this.getNoMetalList()
            })
            .catch((err) => console.log(err))
    }

    getYanMinList = (clave) => {
        getYanMin(clave)
            .then((res) => {
                const yanMinList = res.data
                this.setState({ yanMinList })
            })
            .then(() => {
                this.getMetalList()
            })
    }

    getEtapasList = (clave) => {
        getEtapasY(clave)
            .then((res) => {
                const etapas = res.data
                const fk_explotacion = res.data[0].fk_explotacion
                const etapasDef = etapas.filter((e) => e.fk_explotacion === fk_explotacion)

                this.setState({ etapas: etapasDef })
            })
            .then(() => {
                this.getYanMinList(clave)
            })
    } 

    yacimientoNuevo = (e) => {
        const yacimientoSelect = e
        const yanMinSelect = ''
        this.setState({ yacimientoSelect, yanMinSelect })
        this.getEtapasList(yacimientoSelect.clave)
    }

    getYacimientosList = () => {
        getYacimientos()
            .then((res) => {
                const yacimientosList = res.data
                this.setState({ yacimientosList })
            })
    }

    componentWillMount = () => {
        this.getYacimientosList()
    }
    render(){
        return(
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Proyecto Nuevo</h1>

                <div className="form-nuevo-emp">
                    <div className='caja-dosColumns'>
                        <div className='emp-nombre'>
                            <p className='lugar-label'>Yacimiento:</p>
                            <Select
                                name="cliente-tipo"
                                placeholder='Selecciona yacimiento'
                                options={this.state.yacimientosList}
                                getOptionLabel={(option) => option.nombre}
                                getOptionValue={(option) => option.clave}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay yacimientos con ese nombre"}
                                value={this.state.yacimientoSelect}
                                onChange={this.yacimientoNuevo}
                            />
                        </div>
                    </div>
                    
                    {this.state.yacimientoSelect &&
                        <div className="form-nuevo-emp">
                            <div className='caja-dosColumns'>
                                <div className='emp-nombre'>
                                    <p className='lugar-label'>Mineral:</p>
                                    <Select
                                        name="cliente-tipo"
                                        placeholder='Selecciona mineral'
                                        options={this.state.mineralesDefArray}
                                        getOptionLabel={(option) => option.nombre}
                                        getOptionValue={(option) => option.clave}
                                        className="single-select"
                                        classNamePrefix="select"
                                        noOptionsMessage={() => "No hay minerales con ese nombre"}
                                        value={this.state.yanMinSelect}
                                        onChange={this.yanMinNuevo}
                                    />
                                </div>
                            </div>
                            {this.state.yanMinSelect && 
                                <div className="yac-nombre">
                                    <Form className="yacimiento-modif-nombre">
                                        <Form.Group as={Row} controlId='formPlaintextText'>
                                            <Form.Label className="label-nombre" column sm="2">Cantidad:</Form.Label>
                                            <Col sm='10'>
                                                <Form.Control
                                                    required
                                                    size='lg'
                                                    type='text'
                                                    className='yac-inputs'
                                                    placeholder='Nombre del yacimiento'
                                                    value={this.state.yanMinSelect.cantidad}
                                                    readOnly
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </div>
                            }
                            <h1 className='Seleccion-estapas'>Etapas</h1>   
                            <div className='etapas-proyecto'>
                                    <div className='etapas-lista-proyecto'>
                                        {this.state.etapas.map((etapa, index) => {
                                            return <ProyectosNuevoEtapa key={etapa.clave} yacimiento={this.state.yacimientoSelect.clave} etapa={etapa.clave} yanMinSelect={this.state.yanMinSelect} nombre={etapa.nombre} />
                                        })}
                                    </div>
                            </div> 
                        </div> 
                    }
                     
                </div> 
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.registrar_boton} className='botones-nuevo'>Enviar</Button>
                </div>                
            </div>
        )
    }
}

export default ProyectosNuevo