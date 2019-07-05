import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { getMinerales } from '../utils/api'
import Select from 'react-select'
import {getPresentacion} from '../utils/api'

const pruebaMetal = [{
    clave: '1',
    fk_metal1: '2',
    fk_metal2: '1',
    cantidad: 3
}]

const pruebaNoMetal = [{
    clave: '1',
    fk_no_metal1: '4',
    fk_no_metal2: '3',
    cantidad: 4
}]

const presentacion = [{
    clave: '1',
    nombre: 'Polvo'
}, {
    clave: '2',
    nombre: 'Laminado'
}, {
    clave: '3',
    nombre: 'Piedra'
}]

const minPreList = [{
    clave: '1',
    fk_mineral: '1',
    fk_presentacion: '1',
    costo: 10
}, {
    clave: '2',
    fk_mineral: '1',
    fk_presentacion: '2',
    costo: 20
}]

class MineralModificar extends React.Component{
    state = {
        optionsTipoMineral: [
            { label: "Metal", value: 1 },
            { label: "No Metal", value: 2 }
        ],
        metal: true,
        nombre: this.props.location.state.nombre ? this.props.location.state.nombre : '',      
        descripcion: this.props.location.state.descripcion ? this.props.location.state.descripcion : '',
        dureza: this.props.location.state.dureza ? this.props.location.state.dureza : '',
        maleabilidad: this.props.location.state.maleabilidad ? this.props.location.state.maleabilidad : '',
        tipo: '',

        mineralMetal: [],
        mineralNoMetal: [],
        mineralesMetalSelect: [],
        mineralesNoMetalSelect: [],
        compuestoMetal: [],
        compuestoNoMetal: [],
        presentacionList: [],
        presentacionSelect: [],
        costoPresentacion: [],
    }

    compuestoMetales = (mineralMetal) => {
        const compuestoMetal = pruebaMetal
        let mineralesMetalSelect = []
        if (!!compuestoMetal) {
            mineralesMetalSelect = compuestoMetal.map((c) => mineralMetal.find((m) => c.fk_metal2 === m.clave && c.fk_metal1 === this.props.match.params.id))
        }
        if (mineralesMetalSelect.length > 0 && mineralesMetalSelect[0] === undefined) {
            mineralesMetalSelect = []
        }
        console.log(mineralesMetalSelect)
        console.log(compuestoMetal)
        this.setState({ mineralesMetalSelect, compuestoMetal })
    }

    compuestoNoMetales = (mineralNoMetal) => {
        const compuestoNoMetal = pruebaNoMetal
        let mineralesNoMetalSelect = []
        if (!!compuestoNoMetal) {
            mineralesNoMetalSelect = compuestoNoMetal.map((c) => mineralNoMetal.find((m) => c.fk_no_metal2 === m.clave && c.fk_no_metal1 === this.props.match.params.id))
        }
        if (mineralesNoMetalSelect.length > 0 && mineralesNoMetalSelect[0] === undefined) {
            mineralesNoMetalSelect = []
        }
        this.setState({ mineralesNoMetalSelect, compuestoNoMetal })
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

    getMineralList = () => {
        getMinerales()
            .then((res) => {
                console.log(res);
                var mineralList = res.data;
                this.setState({ mineralList });
            })
            .then(() => {
                const mineral = this.state.mineralList.find((m, index) => m.clave === this.props.match.params.id)
                const metal = !!mineral.dureza
                const tipo = metal ? this.state.optionsTipoMineral.find((o) => o.label === 'Metal') : this.state.optionsTipoMineral.find((o) => o.label === 'No Metal')
                const mineralMetal = this.state.mineralList.filter((mineral, index) => !!mineral.dureza)
                const mineralNoMetal = this.state.mineralList.filter((mineral, index) => !!!mineral.dureza)
                metal ? this.compuestoMetales(mineralMetal) : this.compuestoNoMetales(mineralNoMetal)

                const presentacionList = presentacion
                const minPre = minPreList
                let presentacionSelect = []
                if (!!minPre) {
                    presentacionSelect = minPre.map((c) => presentacionList.find((m) => c.fk_presentacion === m.clave && c.fk_mineral === this.props.match.params.id))
                }
                if (presentacionSelect.length > 0 && presentacionSelect[0] === undefined) {
                    presentacionSelect = []
                }

                this.setState({ 
                    nombre: mineral.nombre, 
                    descripcion: mineral.descripcion,
                    dureza: mineral.dureza,
                    maleabilidad: mineral.maleabilidad,
                    metal, 
                    tipo,
                    mineralMetal,
                    mineralNoMetal,
                    presentacionList,
                    presentacionSelect, 
                    costoPresentacion: minPre 
                })
            })
            .catch((err) => console.log(err));
    }

    componentWillMount() {
        this.getMineralList();
        this.getPresentacionList();
    }

    tipoMineral = (e) => {
        const tipo = e
        const metal = tipo.label === 'Metal' ? true : false
        this.setState({ tipo, metal })
    }

    nuevoNombre = (e) => {
        const nombre = e.target.value
        this.setState(() => ({ nombre }))
    }

    nuevaDescripcion = (e) => {
        const descripcion = e.target.value
        this.setState(() => ({ descripcion }))
    }

    nuevaDureza = (e) => {
        const dureza = e.target.value
        this.setState(() => ({ dureza }))
    }

    nuevaMaleabilidad = (e) => {
        const maleabilidad = e.target.value
        this.setState(() => ({ maleabilidad }))
    }

    presentacionNuevo = (e) => {
        const presentacionSelect = e
        let costoPresentacion = []
        if (!!presentacionSelect) {
            costoPresentacion = presentacionSelect.map((p) => {
                if (this.state.costoPresentacion.length > 0 && !!this.state.costoPresentacion.find((c) => c.fk_presentacion === p.clave)) {
                    return this.state.costoPresentacion.find((c) => c.fk_presentacion === p.clave)
                } else {
                    return ({ fk_mineral: this.props.match.params.id, fk_presentacion: p.clave, costo: '' })
                }
            })
        }
        this.setState({ presentacionSelect, costoPresentacion })
    }

    nuevoCostoPresentacion = (e, clave) => {
        const costo = e.target.value
        const costoPresentacion = []
        this.state.costoPresentacion.forEach((c) => {
            if (c.fk_presentacion === clave) {
                costoPresentacion.push({ fk_mineral: this.props.match.params.id, fk_presentacion: clave, costo })
            } else {
                costoPresentacion.push(c)
            }
        })
        this.setState(() => ({ costoPresentacion }))
    }

    mineralMetalNuevo = (e) => {
        const mineralesMetalSelect = e
        let compuestoMetal = []
        if (!!mineralesMetalSelect) {
            compuestoMetal = mineralesMetalSelect.map((m) => {
                if (this.state.compuestoMetal.length > 0 && !!this.state.compuestoMetal.find((c) => c.fk_metal === m.clave)) {
                    return this.state.compuestoMetal.find((c) => c.fk_metal === m.clave)
                } else {
                    return ({ fk_metal1: this.props.match.params.id, fk_metal2: m.clave, cantidad: '' })
                }
            })
        }
        this.setState({ mineralesMetalSelect, compuestoMetal })
    }

    mineralNoMetalNuevo = (e) => {
        const mineralesNoMetalSelect = e
        let compuestoNoMetal = []
        if (!!mineralesNoMetalSelect) {
            compuestoNoMetal = mineralesNoMetalSelect.map((m) => {
                if (this.state.compuestoNoMetal.length > 0 && !!this.state.compuestoNoMetal.find((c) => c.fk_no_metal === m.clave)) {
                    return this.state.compuestoNoMetal.find((c) => c.fk_no_metal === m.clave)
                } else {
                    return ({ fk_no_metal1: this.props.match.params.id, fk_no_metal2: m.clave, cantidad: '' })
                }
            })
        }
        this.setState({ mineralesNoMetalSelect, compuestoNoMetal })
    }

    nuevoCompuestoMetal = (e, clave) => {
        const cantidad = e.target.value
        const compuesto = []
        this.state.compuestoMetal.forEach((c) => {
            if (c.fk_metal === clave) {
                compuesto.push({ fk_metal1: this.props.match.params.id, fk_metal2: clave, cantidad })
            } else {
                compuesto.push(c)
            }
        })
        this.setState(() => ({ compuestoMetal: compuesto }))
    }

    nuevoCompuestoNoMetal = (e, clave) => {
        const cantidad = e.target.value
        const compuesto = []
        this.state.compuestoNoMetal.forEach((c) => {
            if (c.fk_no_metal === clave) {
                compuesto.push({ fk_no_metal1: this.props.match.params.id, fk_no_metal2: clave, cantidad })
            } else {
                compuesto.push(c)
            }
        })
        this.setState(() => ({ compuestoNoMetal: compuesto }))
    }

    render(){
        return(
            <div className='nuevo-aliado content-container'>
                <h1 className='ali-nuevo-titulo'>Modificar Mineral</h1>

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
                                        placeholder={this.state.nombre}
                                        // value={this.state.nombre}
                                        onChange={this.nuevoNombre}
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
                                        onChange={this.nuevaDescripcion}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div> 

                    <div className='caja-multi-select min-select-comp'>
                        <p className='select-label'>Presentación:</p>
                        <Select
                            isMulti
                            name="minerales"
                            //value={this.state.presentacionSelect}
                            options={this.state.presentacionList}
                            getOptionLabel={(option) => option.nombre}
                            getOptionValue={(option) => option.nombre}
                            className="multi-select"
                            classNamePrefix="select"
                            noOptionsMessage={() => "No hay presentaciones con ese nombre"}
                            placeholder="Selecciona Presentación(es)"
                            onChange={this.presentacionNuevo}
                        />
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
                                                        onChange={(e) => this.nuevoCostoPresentacion(e, presentacion.clave)}
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
                                                        onChange={(e) => this.nuevoCostoPresentacion(e, presentacion.clave)}
                                                        placeholder='Costo'
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
                                                        onChange={(e) => this.nuevoCostoPresentacion(e, presentacion.clave)}
                                                        placeholder='Costo'
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

                    <div className='select-seleccionar'>
                        <p className='select-mineral'>Mineral:</p>
                        <Select
                            name="mineral-tipo"
                            placeholder='Selecciona el tipo de mineral'
                            options={this.state.optionsTipoMineral}
                            className="single-select-mineral"
                            classNamePrefix="select"
                            value={this.state.tipo}
                            noOptionsMessage={() => "No hay minerales con ese nombre"}
                            onChange={this.tipoMineral}
                        />
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
                                                onChange={this.nuevaDureza}
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
                                                onChange={this.nuevaMaleabilidad}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div> 
                            
                            <div className='caja-multi-select min-select-comp'>
                                <p className='select-label'>Compuesto por:</p>
                                <Select
                                    isMulti
                                    name="minerales"
                                    value={this.state.mineralesMetalSelect}
                                    options={this.state.mineralMetal}
                                    getOptionLabel={(option) => option.nombre}
                                    getOptionValue={(option) => option.nombre}
                                    className="multi-select"
                                    classNamePrefix="select"
                                    noOptionsMessage={() => "No hay minerales con ese nombre"}
                                    placeholder="Selecciona Mineral(es)"
                                    onChange={this.mineralMetalNuevo}
                                />
                            </div>

                            {(this.state.mineralesMetalSelect && this.state.mineralesMetalSelect.length) > 0 &&
                                <div className='cantidad-mineral'>
                                    <div className='cantidad-mineral-column'>
                                        {this.state.mineralesMetalSelect.map((mineral, index) => {
                                            return (
                                                index % 3 === 0 &&
                                                <Form className="yacimiento-nuevo-nombre" key={index}>
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (%):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                value={this.state.compuestoMetal.find((c) => c.fk_metal2 === mineral.clave).cantidad}
                                                                className='yac-inputs'
                                                                placeholder='Cantidad'
                                                                onChange={(e) => this.nuevoCompuestoMetal(e, mineral.clave)}
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
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (%):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                value={this.state.compuestoMetal.find((c) => c.fk_metal2 === mineral.clave).cantidad}
                                                                className='yac-inputs'
                                                                onChange={(e) => this.nuevoCompuestoMetal(e, mineral.clave)}
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
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (%):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='yac-inputs'
                                                                value={this.state.compuestoMetal.find((c) => c.fk_metal2 === mineral.clave).cantidad}
                                                                onChange={(e) => this.nuevoCompuestoMetal(e, mineral.clave)}
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
                            <div className='caja-multi-select min-select-comp'>
                                <p className='select-label'>Compuesto por:</p>
                                <Select
                                    isMulti
                                    name="minerales"
                                    value={this.state.mineralesNoMetalSelect}
                                    options={this.state.mineralNoMetal}
                                    getOptionLabel={(option) => option.nombre}
                                    getOptionValue={(option) => option.nombre}
                                    className="multi-select"
                                    classNamePrefix="select"
                                    noOptionsMessage={() => "No hay minerales con ese nombre"}
                                    placeholder="Selecciona Mineral(es)"
                                    onChange={this.mineralNoMetalNuevo}
                                />
                            </div>

                            {(this.state.mineralesNoMetalSelect && this.state.mineralesNoMetalSelect.length) > 0 &&
                                <div className='cantidad-mineral'>
                                    <div className='cantidad-mineral-column'>
                                        {this.state.mineralesNoMetalSelect.map((mineral, index) => {
                                            return (
                                                index % 3 === 0 &&
                                                <Form className="yacimiento-nuevo-nombre" key={index}>
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (%):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='yac-inputs'
                                                                value={this.state.compuestoNoMetal.find((c) => c.fk_no_metal2 === mineral.clave).cantidad}                                                            
                                                                onChange={(e) => this.nuevoCompuestoNoMetal(e, mineral.clave)}
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
                                        {this.state.mineralesNoMetalSelect.map((mineral, index) => {
                                            return (
                                                index % 3 === 1 &&
                                                <Form className="yacimiento-nuevo-nombre" key={index}>
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (%):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='yac-inputs'
                                                                value={this.state.compuestoNoMetal.find((c) => c.fk_no_metal2 === mineral.clave).cantidad}                                                            
                                                                onChange={(e) => this.nuevoCompuestoNoMetal(e, mineral.clave)}
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
                                        {this.state.mineralesNoMetalSelect.map((mineral, index) => {
                                            return (
                                                index % 3 === 2 &&
                                                <Form className="yacimiento-nuevo-nombre" key={index}>
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label column sm="9">Cantidad de {mineral.nombre} (%):</Form.Label>
                                                        <Col sm='3'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='yac-inputs'
                                                                value={this.state.compuestoNoMetal.find((c) => c.fk_no_metal2 === mineral.clave).cantidad}                                                            
                                                                onChange={(e) => this.nuevoCompuestoNoMetal(e, mineral.clave)}
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
                        </div>
                    }

                    </div>  
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.registrar_boton} className='botones-nuevo'>Guardar</Button>
                </div>
            </div>

        )
        
    }
    atras_boton = () => {
        history.goBack()
    }
}

export default MineralModificar