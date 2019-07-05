import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { getNoMetales } from '../utils/api'
import { getMetales } from '../utils/api'
import { getMinPre } from '../utils/api'
import { getPresentacion } from '../utils/api'
import { getMetMet } from '../utils/api'
import { getNoMetNoMet } from '../utils/api'

class MineralConsultar extends React.Component{
    state = {metal: true,
        nombre: '',
        descripcion: '',
        dureza: '',
        maleabilidad: '',
        tipo: '',
        mineralMetal: [],
        minPreList: [],
        mineralNoMetal: [],
        presentacionList: [],
        mineralesMetalSelect: [],
        mineralesNoMetalSelect: [],
        metMetList: [],
        noMetNoMetList: [],
        compuestoMetal: [],
        compuestoNoMetal: [],
        mineralesMetalDefault: '',
        mineralesMoMetalDefault: '',
        presentacionSelect: [],
        presentacionDefault: '',
        costoPresentacion: []
    }

    compuestoMetales = (mineralMetal) => {
        const compuestoMetal = this.state.metMetList
        console.log('comp', compuestoMetal)

        let mineralesMetalSelect = []
        if (!!compuestoMetal) {
            mineralesMetalSelect = compuestoMetal.map((c) => mineralMetal.find((m) => c.fk_metal_1 === m.clave && c.fk_metal_2 === parseInt(this.props.match.params.id, 10)))
        }
        console.log('ms', mineralesMetalSelect)

        if (mineralesMetalSelect.length > 0 && mineralesMetalSelect[0] === undefined) {
            mineralesMetalSelect = []
        }
        let mineralesMetalDefault = ''
        mineralesMetalSelect.forEach((m, i) => {
            if (i === 0) {
                mineralesMetalDefault = m.nombre
            } else if (i < mineralesMetalSelect.length) {
                mineralesMetalDefault = mineralesMetalDefault + ' | ' + m.nombre
            } else {
                mineralesMetalDefault = mineralesMetalDefault + ' ' + m.nombre
            }
        })
        this.setState({ mineralesMetalSelect, mineralesMetalDefault, compuestoMetal })
    }

    compuestoNoMetales = (mineralNoMetal) => {
        const compuestoNoMetal = this.state.noMetNoMetList
        console.log('comp', compuestoNoMetal)
        let mineralesNoMetalSelect = []
        if (!!compuestoNoMetal) {
            mineralesNoMetalSelect = compuestoNoMetal.map((c) => mineralNoMetal.find((m) => c.fk_nometal_1 === m.clave && c.fk_nometal_2 === parseInt(this.props.match.params.id, 10)))
        }
        console.log('ms', mineralesNoMetalSelect)

        if (mineralesNoMetalSelect.length > 0 && mineralesNoMetalSelect[0] === undefined) {
            mineralesNoMetalSelect = []
        }
        let mineralesMoMetalDefault = ''
        mineralesNoMetalSelect.forEach((m, i) => {
            if (i === 0) {
                mineralesMoMetalDefault = m.nombre
            } else if (i < mineralesNoMetalSelect.length) {
                mineralesMoMetalDefault = mineralesMoMetalDefault + ' | ' + m.nombre
            } else {
                mineralesMoMetalDefault = mineralesMoMetalDefault + ' ' + m.nombre
            }
        })
        this.setState({ mineralesNoMetalSelect, mineralesMoMetalDefault, compuestoNoMetal })
    }

    getNoMetalList = () => {
        getNoMetales()
            .then((res) => {
                console.log(res)
                const noMetalList = res.data
                this.setState({ noMetalList })
            })
            .then(() => {
                this.setState((prevState) => ({ mineralList: prevState.mineralList.concat(prevState.noMetalList) }))
            })
            .then(() => {
                let mineral = ''
                let dureza = ''
                let maleabilidad = ''
                let metal = false
                if (this.props.location.state.tipo === 'metal') {
                    mineral = this.state.metalList.find((m, index) => m.clave === parseInt(this.props.match.params.id, 10))
                    console.log(mineral)
                    dureza = mineral.dureza
                    maleabilidad = mineral.maleabilidad
                    metal = true
                } else {
                    mineral = this.state.noMetalList.find((m, index) => m.clave === parseInt(this.props.match.params.id, 10))
                } 
                const tipo = metal ? 'Metal' : 'No Metal'
                metal ? this.compuestoMetales(this.state.metalList) : this.compuestoNoMetales(this.state.noMetalList)

                const presentacionList = this.state.presentacionList
                const minPre = this.state.minPreList
                let presentacionSelect = []
                if (!!minPre) {
                    console.log('hola')
                    presentacionSelect = minPre.map((c) => presentacionList.find((m) => c.fk_presentacion === m.clave && (c.fk_metal === parseInt(this.props.match.params.id, 10) || c.fk_nometal === parseInt(this.props.match.params.id, 10))))
                }
                if (presentacionSelect.length > 0 && presentacionSelect[0] === undefined) {
                    presentacionSelect = []
                }
                console.log('PRESENTACIONSELECT: ',presentacionSelect)
                console.log('PRESENTACIONLIST: ',presentacionList)
                console.log('MINPRE: ',minPre)

                let presentacionDefault = ''
                presentacionSelect.forEach((m, i) => {
                    if (i === 0) {
                        presentacionDefault = m.nombre
                    } else if (i < presentacionSelect.length) {
                        presentacionDefault = presentacionDefault + ' | ' + m.nombre
                    } else {
                        presentacionDefault = presentacionDefault + ' ' + m.nombre
                    }
                })

                this.setState({
                    nombre: mineral.nombre,
                    descripcion: mineral.descripcion,
                    dureza,
                    maleabilidad,
                    metal,
                    tipo,
                    presentacionSelect,
                    presentacionDefault, 
                    costoPresentacion: minPre
                })
            })
            .catch((err) => console.log(err))
    }

    getMetalList = () => {
        getMetales()
            .then((res) => {
                console.log(res)
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

    getMinPreList = () => {
        getMinPre()
            .then((res) => {
                const minPreList = res.data
                this.setState({ minPreList })
            })
            .then(() => {
                this.getMetalList()
            })
            .catch((err) => console.log(err)) 
    }

    getPresentacionList = () => {
        getPresentacion()
            .then((res) => {
                const presentacionList = res.data
                this.setState({ presentacionList })
            })
            .then(() => {
                this.getMinPreList()
            })
            .catch((err) => console.log(err))
    }

    getNoMetNoMetList = () => {
        getNoMetNoMet(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                const noMetNoMetList = res.data
                this.setState({ noMetNoMetList })
            })
            .then(() => {
                this.getPresentacionList()
            })
            .catch((err) => console.log(err))
    }

    getMetMetList = () => {
        console.log(parseInt(this.props.match.params.id, 10))
        getMetMet(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                const metMetList = res.data
                this.setState({ metMetList})
            })
            .then(() => {
                this.getNoMetNoMetList()
            })
            .catch((err) => console.log(err))
    }

    componentWillMount() {
        this.getMetMetList();
    }

    render(){
        return(
            <div className='nuevo-aliado content-container'>
                <h1 className='ali-nuevo-titulo'>Consultar Mineral</h1>
                <div className='form-modif-min'>

                    <div className="emp-nombre min-nombre">
                        <Form className="empleado-nombre">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="3">Nombre:</Form.Label>
                                <Col sm='9'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Nombre del mineral'
                                        value={this.state.nombre}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='emp-nombre min-nombre'>
                        <Form className="empleado-nombre">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="3">Descripción:</Form.Label>
                                <Col sm='9'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        as='textarea'
                                        className='yac-inputs textarea'
                                        placeholder='Descripcion del mineral'
                                        value={this.state.descripcion}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className='emp-nombre min-nombre'>
                        <Form className="empleado-nombre">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="3">Presentación:</Form.Label>
                                <Col sm='9'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Presentación del mineral'
                                        value={this.state.presentacionDefault}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div> 

                    {(this.state.presentacionSelect && this.state.presentacionSelect.length) > 0 &&
                        <div className='cantidad-mineral'>
                            <div className='cantidad-mineral-column'>
                                {this.state.presentacionSelect.map((presentacion, index) => {
                                    return (
                                        index % 3 === 0 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Costo de {presentacion.nombre} (Bs):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        value={this.state.costoPresentacion.find((c) => c.fk_presentacion === presentacion.clave).costo}
                                                        className='yac-inputs'
                                                        placeholder='Costo'
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
                                {this.state.presentacionSelect.map((presentacion, index) => {
                                    return (
                                        index % 3 === 1 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Costo de {presentacion.nombre} (Bs):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        value={this.state.costoPresentacion.find((c) => c.fk_presentacion === presentacion.clave).costo}
                                                        className='yac-inputs'
                                                        placeholder='Costo'
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
                                {this.state.presentacionSelect.map((presentacion, index) => {
                                    return (
                                        index % 3 === 2 &&
                                        <Form className="yacimiento-nuevo-nombre" key={index}>
                                            <Form.Group as={Row} controlId='formPlaintextText'>
                                                <Form.Label column sm="9">Costo de {presentacion.nombre} (Bs):</Form.Label>
                                                <Col sm='3'>
                                                    <Form.Control
                                                        required
                                                        size='lg'
                                                        type='text'
                                                        className='yac-inputs'
                                                        value={this.state.costoPresentacion.find((c) => c.fk_presentacion === presentacion.clave).costo}
                                                        placeholder='Costo'
                                                        readOnly
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

                    <div className="emp-nombre min-nombre">
                        <Form className="empleado-nombre">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="3">Mineral:</Form.Label>
                                <Col sm='9'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='yac-inputs'
                                        placeholder='Tipo del mineral'
                                        value={this.state.tipo}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    {this.state.metal ?
                        <div className="metal-container">
                            <div className='emp-nombre min-nombre'>
                                <Form className="empleado-nombre">
                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                        <Form.Label className="label-nombre" column sm="3">Dureza:</Form.Label>
                                        <Col sm='9'>
                                            <Form.Control
                                                required
                                                size='lg'
                                                type='text'
                                                className='yac-inputs'
                                                placeholder='Dureza del mineral'
                                                value={this.state.dureza}
                                                readOnly
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className='emp-nombre min-nombre'>
                                <Form className="empleado-nombre">
                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                        <Form.Label className="label-nombre" column sm="3">Maleabilidad:</Form.Label>
                                        <Col sm='9'>
                                            <Form.Control
                                                required
                                                size='lg'
                                                type='text'
                                                className='yac-inputs'
                                                placeholder='Maleabilidad del mineral'
                                                value={this.state.maleabilidad}
                                                readOnly
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div> 
                            <div className='emp-nombre min-nombre'>
                                <Form className="empleado-nombre">
                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                        <Form.Label className="label-nombre" column sm="3">Compuesto:</Form.Label>
                                        <Col sm='9'>
                                            <Form.Control
                                                required
                                                size='lg'
                                                type='text'
                                                className='yac-inputs'
                                                placeholder='Compuesto del mineral'
                                                value={this.state.mineralesMetalDefault}
                                                readOnly
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div> 
                            {(this.state.mineralesMetalSelect && this.state.mineralesMetalSelect.length) > 0 &&
                                <div className='cantidad-mineral'>
                                    <div className='cantidad-mineral-column'>
                                        {this.state.mineralesMetalSelect.map((mineral, index) => {
                                            return (
                                                index % 3 === 0 &&
                                                <Form className="yacimiento-nuevo-nombre" key={index}>
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (kg):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                value={this.state.compuestoMetal.find((c) => c.fk_metal_1 === mineral.clave).cantidad}
                                                                className='yac-inputs'
                                                                placeholder='Cantidad'
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
                                        {this.state.mineralesMetalSelect.map((mineral, index) => {
                                            return (
                                                index % 3 === 1 &&
                                                <Form className="yacimiento-nuevo-nombre" key={index}>
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (kg):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                value={this.state.compuestoMetal.find((c) => c.fk_metal_1 === mineral.clave).cantidad}
                                                                className='yac-inputs'
                                                                readOnly
                                                                placeholder='Cantidad'
                                                            />
                                                        </Col>
                                                        <Form.Control.Feedback className='login-error' type='invalid'>Nombre inválido.</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Form>
                                            )
                                        })}
                                    </div>
                                    <div className='cantidad-mineral-column'>
                                        {this.state.mineralesMetalSelect.map((mineral, index) => {
                                            return (
                                                index % 3 === 2 &&
                                                <Form className="yacimiento-nuevo-nombre" key={index}>
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (kg):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='yac-inputs'
                                                                value={this.state.compuestoMetal.find((c) => c.fk_metal_1 === mineral.clave).cantidad}
                                                                readOnly
                                                                placeholder='Cantidad'
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
                        </div> : 
                        <div className="metal-container">
                            <div className='emp-nombre min-nombre'>
                                <Form className="empleado-nombre">
                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                        <Form.Label className="label-nombre" column sm="3">Compuesto:</Form.Label>
                                        <Col sm='9'>
                                            <Form.Control
                                                required
                                                size='lg'
                                                type='text'
                                                className='yac-inputs'
                                                placeholder='Compuesto del mineral'
                                                value={this.state.mineralesMoMetalDefault}
                                                readOnly
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div> 
                            {(this.state.mineralesNoMetalSelect && this.state.mineralesNoMetalSelect.length) > 0 &&
                                <div className='cantidad-mineral'>
                                    <div className='cantidad-mineral-column'>
                                        {this.state.mineralesNoMetalSelect.map((mineral, index) => {
                                            return (
                                                index % 3 === 0 &&
                                                <Form className="yacimiento-nuevo-nombre" key={index}>
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (kg):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='yac-inputs'
                                                                value={this.state.compuestoNoMetal.find((c) => c.fk_nometal_1 === mineral.clave).cantidad}
                                                                placeholder='Cantidad'
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
                                        {this.state.mineralesNoMetalSelect.map((mineral, index) => {
                                            return (
                                                index % 3 === 1 &&
                                                <Form className="yacimiento-nuevo-nombre" key={index}>
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (kg):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='yac-inputs'
                                                                value={this.state.compuestoNoMetal.find((c) => c.fk_nometal_1 === mineral.clave).cantidad}
                                                                placeholder='Cantidad'
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
                                        {this.state.mineralesNoMetalSelect.map((mineral, index) => {
                                            return (
                                                index % 3 === 2 &&
                                                <Form className="yacimiento-nuevo-nombre" key={index}>
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (kg):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='yac-inputs'
                                                                value={this.state.compuestoNoMetal.find((c) => c.fk_nometal_1 === mineral.clave).cantidad}
                                                                placeholder='Cantidad'
                                                                readOnly
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
                    }

                </div>
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                </div>
            </div>

        )
        
    }
    atras_boton = () => {
        history.goBack()
    }
}

export default MineralConsultar