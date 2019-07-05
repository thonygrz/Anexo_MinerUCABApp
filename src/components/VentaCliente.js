import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { connect } from 'react-redux'
import Select from 'react-select'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { getStatus, postVentaStatus, postTPVenta, postTPTransferencia, postTPCheque, postTPTDebito, postTPTCredito, getMetales, getNoMetales, getClientesNat, getClientesJud, getLugares, postInsertClienteJud, postInsertClienteNat, postVenta, getVentas, postDetVenta, getInventario, postUpdateInventario } from '../utils/api'
import moment from 'moment'


class ClienteNuevo extends React.Component {
    state = {
        nombre: '',
        apellido: '',
        cedula: '',
        rif: '',
        fk_lugar: '',
        telefono: '',
        estados: [],
        municipios: [],
        parroquias: [],
        disableMunicipios: true,
        disableParroquias: true,
        optionsTipoCliente: [{ label: 'Natural', value: 1 }, { label: 'Jurídico', value: 2 }],
        optionsForma: [{ label: 'Buscar cliente registrado', value: 1 }, { label: 'Nuevo Cliente', value: 2 }],
        tipoClienteValue: '',
        tipoForma: '',
        clienteSelect: [],
        clienteList: [],
        optionsPago: [{ label: 'Transferencia', value: 1 }, { label: 'Cheque', value: 2 }, { label: 'Tarjeta Débito', value: 3 }, { label: 'Tarjeta Crédito', value: 4 }],
        tipoPago: '',
        tnumeroTDebito: '',
        tnumeroTCredito: '',
        tnumeroTransferencia: '',
        tnumeroCheque: '',
        tncuentaTransferencia: '',
        tncuentaCheque: '',
        tcodigo: '',
        ttipo: '',
        tvfecha: null,
        focusedT: false,
        focusedC: false,
        clienteList: [],
        clienteNaturalList: [],
        clienteJuridicoList: [],
        lugaresList: [],
        ventasList: [],
        ventaActual: {},
        inventarioList: [],
        mineralList: [],
        metalList: [],
        noMetalList: [],
        mineralesCantidad: [],
        total: 0,
        costoTPTransferencia: 0,
        costoTPCheque: 0,
        costoTPTDebito: 0,
        costoTPTCredito: 0,
        tptransferencia: [],
        tpcheque: [],
        tptcredito: [],
        tpdebito: [],
        statusList: [],
    }
    tipoClienteChange = (e) => {
        const tipoClienteValue = e
        this.setState({ tipoClienteValue })
    }
    tipoPagoNuevo = (e) => {
        const tipoPago = e
        this.setState({ tipoPago })
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

    formaVenta = (e) => {
        const tipoForma = e
        this.setState(() => ({ tipoForma }))
    }

    clienteNuevo = (e) => {
        const clienteSelect = e
        this.setState(() => ({ clienteSelect }))
    }

    modificarTNumeroTDebito = (e) => {
        const tnumeroTDebito = e.target.value
        this.setState({ tnumeroTDebito })
    }

    modificarTNumeroTCredito = (e) => {
        const tnumeroTCredito = e.target.value
        this.setState({ tnumeroTCredito })
    }

    modificarTNumeroTransferencia = (e) => {
        const tnumeroTransferencia = e.target.value
        this.setState({ tnumeroTransferencia })
    }

    modificarTNumeroCheque = (e) => {
        const tnumeroCheque = e.target.value
        this.setState({ tnumeroCheque })
    }

    modificarTCodigo = (e) => {
        const tcodigo = e.target.value
        this.setState({ tcodigo })
    }

    modificarTNCuentaTransferencia = (e) => {
        const tncuentaTransferencia = e.target.value
        this.setState({ tncuentaTransferencia })
    }

    modificarTNCuentaCheque = (e) => {
        const tncuentaCheque = e.target.value
        this.setState({ tncuentaCheque })
    }

    modificarTTipo = (e) => {
        const ttipo = e.target.value
        this.setState({ ttipo })
    } 

    modificatTFecha = (e) => {
        const tfecha = e.format('YYYY-MM-DD')
        this.setState(() => ({ tfecha }))
    }

    modificatTVFecha = (e) => {
        const tvfecha = e.format('YYYY-MM-DD')
        this.setState(() => ({ tvfecha }))
    }

    modificarCostoTPTCredito = (e) => {
        const costoTPTCredito = e.target.value
        this.setState(() => ({ costoTPTCredito }))
    }

    modificarCostoTPTransferencia = (e) => {
        const costoTPTransferencia = e.target.value
        this.setState(() => ({ costoTPTransferencia }))
    }

    modificarCostoTPCheque = (e) => {
        const costoTPCheque = e.target.value
        this.setState(() => ({ costoTPCheque }))
    }

    modificarCostoTPTDebito = (e) => {
        const costoTPTDebito = e.target.value
        this.setState(() => ({ costoTPTDebito }))
    }

    getClienteJuridicoList = () => {
        getClientesJud()
            .then((res) => {
                console.log(res)
                const clienteJuridicoList = res.data
                this.setState({ clienteJuridicoList })
            })
            .then(() => {
                this.setState((prevState) => ({ clienteList: prevState.clienteList.concat(prevState.clienteJuridicoList) }))
            })
            .catch((err) => console.log(err))
    }

    getClienteNaturalList = () => {
        getClientesNat()
            .then((res) => {
                console.log('c natural', res.data)
                const clienteNaturalList = res.data
                this.setState({ clienteNaturalList })
            })
            .then(() => {
                this.setState((prevState) => ({ clienteList: prevState.clienteNaturalList }))
            })
            .then(() => {
                this.getClienteJuridicoList()
            })
            .catch((err) => console.log(err))
    }

    getLugaresList = () => {
        getLugares()
            .then((res) => {
                console.log(res);
                const lugaresList = res.data;
                this.setState({ lugaresList })
            })
            .then(() => {
                const estados = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'ESTADO') : []
                const municipios = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'MUNICIPIO') : []
                const parroquias = this.state.lugaresList ? this.state.lugaresList.filter((lugar) => lugar.tipo === 'PARROQUIA') : []
                this.setState({ estados, municipios, parroquias })
            })
            .catch((err) => console.log(err));
    }

    getInventarioList = () => {
        getInventario()
            .then((res) => {
                console.log(res);
                const inventarioList = res.data;
                this.setState({ inventarioList })
            })
            .then(() => {
                const mineralesCantidad = []
                this.state.mineralList.forEach((m) => {
                    let mineral = []
                    mineral = this.props.venta.filter((v) => v.fk_metal === m.clave || v.fk_no_metal === m.clave)
                    if (mineral && mineral.length > 0) {
                        let cantidad = 0
                        mineral.forEach((c) => {
                            cantidad += parseInt(c.cantidad, 10)
                        })
                        if (!!m.dureza) { 
                            mineralesCantidad.push({
                                fk_metal: m.clave,
                                cantidad
                            })
                        } else {
                            mineralesCantidad.push({
                                fk_no_metal: m.clave,
                                cantidad
                            })
                        }
                    }
                })
                this.setState({ mineralesCantidad })
            })
            .then(() => {
                console.log('min cantidad 1', this.state.mineralesCantidad)
            })
            .catch((err) => console.log(err));
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
                this.getInventarioList()
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

    total = () => {
        let total = 0
        if (this.props.venta && this.props.venta.length > 0) {
            this.props.venta.forEach((c) => {
                total = total + c.cantidad * c.costo_unitario
            })
        }
        this.setState({ total })
    }

    getStatusList = () => {
        getStatus()
            .then((res) => {
                const statusList = res.data
                this.setState({ statusList })
            })
    }

    componentWillMount = () => {
        this.total()
        this.getClienteNaturalList()
        this.getLugaresList()
        this.getMetalList()
        this.getStatusList()
    }

    getVentasList = () => {
        getVentas()
            .then((res) => {
                const ventasList = res.data
                this.setState({ ventasList })
            })
            .then(() => {
                const ventaActual = this.state.ventasList[this.state.ventasList.length - 1]
                this.setState({ ventaActual })
            })
            .then(() => {
                console.log('venta actual', this.state.ventaActual)
            })
    }

    postDetVentaActual = (cantidad, costo_ind, fk_inventario, fk_venta, fk_minpre) => {
        postDetVenta(cantidad, costo_ind, fk_inventario, fk_venta, fk_minpre)
            .then((res) => {
                console.log('postDetVenta', cantidad)
            })
    }

    postUpdateInventarioActual = (cantidad, fk_metal, fk_no_metal) => {
        postUpdateInventario(cantidad, fk_metal, fk_no_metal)
            .then((res) => {
                console.log('update inv', cantidad)
            })
    }

    postVentaActual = () => {
        if (this.state.clienteSelect.ci) {
            postVenta(this.state.total, moment(), this.state.clienteSelect.clave, null)
                .then((res) => {
                    const ventaActual = res.data
                    this.setState({ ventaActual: ventaActual[0] })
                    console.log(ventaActual)
                })
                .then(() => {
                    postVentaStatus(moment(), this.state.ventaActual.clave, 1)
                })
                .then(() => {
                    if (this.state.tnumeroTransferencia > 0) {
                        postTPTransferencia(this.state.tnumeroTransferencia, this.state.tncuentaTransferencia)
                            .then((res) => {
                                const tptransferencia = res.data
                                this.setState({ tptransferencia: tptransferencia[0] })
                            })
                            .then(() => {
                                postTPVenta(moment(), this.state.total, this.state.tptransferencia.clave, null, null, null, this.state.ventaActual.clave)
                            })
                    }
                    if (this.state.tnumeroCheque > 0) {
                        postTPCheque(this.state.tnumeroCheque, this.state.tncuentaCheque)
                            .then((res) => {
                                const tpcheque = res.data
                                this.setState({ tpcheque: tpcheque[0] })
                            })
                            .then(() => {
                                postTPVenta(moment(), this.state.total, null, null, this.state.tpcheque.clave, null, this.state.ventaActual.clave)
                            })
                    }
                    if (this.state.tnumeroTCredito > 0) {
                        postTPTCredito(this.state.tnumeroTCredito, this.state.tcodigo, this.state.tvfecha)
                            .then((res) => {
                                const tptcredito = res.data
                                this.setState({ tptcredito: tptcredito[0] })
                            })
                            .then(() => {
                                postTPVenta(moment(), this.state.total, null, this.state.tptcredito, null, null, this.state.ventaActual.clave)
                            })
                    }
                    if (this.state.tnumeroTDebito > 0) {
                        postTPTDebito(this.state.tnumeroTDebito, this.state.ttipo)
                            .then((res) => {
                                const tpdebito = res.data
                                this.setState({ tpdebito: tpdebito[0] })
                            })
                            .then(() => {
                                postTPVenta(moment(), this.state.total, null, null, null, this.state.tpdebito, this.state.ventaActual.clave)
                            })
                    }
                })
                .then(() => {
                    console.log(this.state.ventaActual)
                    let solicitud = false
                    console.log('min cantidad 2', this.state.mineralesCantidad)
                    this.state.mineralesCantidad.forEach((cm) => {
                        let inv = ''
                        if (!!cm.fk_metal) {
                            inv = this.state.inventarioList.find((i) => cm.fk_metal === i.fk_metal)
                        } else {
                            inv = this.state.inventarioList.find((i) => cm.fk_no_metal === i.fk_no_metal)
                        }
                        console.log('inv',inv)
                        if (!!inv && inv.cantidad_almacenada >= cm.cantidad) {
                            this.postUpdateInventarioActual(cm.cantidad * (-1), cm.fk_metal, cm.fk_no_metal)
                            console.log(this.props.venta)
                            console.log(cm)
                            this.props.venta.forEach((dv) => {
                                if (dv.fk_metal === cm.fk_metal && dv.fk_no_metal === cm.fk_no_metal) {
                                    console.log(this.state.clienteSelect.clave)
                                    
                                    this.postDetVentaActual(dv.cantidad, dv.costo, inv.clave, this.state.ventaActual.clave, dv.fk_minpre)
                                }
                            })
                        } else {
                            solicitud = true
                            this.props.venta.forEach((dv) => {
                                if (dv.fk_metal === cm.fk_metal && dv.fk_no_metal === cm.fk_no_metal) {
                                    this.postDetVentaActual(dv.cantidad, dv.costo, inv.clave, this.state.ventaActual.clave, dv.fk_minpre)
                                }
                            })
                        }
                    })
                    this.setState({ solicitud })
                })
                .then(() => {
                    this.state.solicitud ? history.push({
                        pathname: '/ventas/solicitud',
                        state: {
                            mineralesCantidad: this.state.mineralesCantidad
                        }
                    }) : history.push('/')
                })
        } else {
            postVenta(this.state.total, moment(), null, this.state.clienteSelect.clave)
                .then((res) => {
                    const ventaActual = res.data
                    this.setState({ ventaActual: ventaActual[0] })
                })
                .then(() => {
                    if (this.state.tnumeroTransferencia > 0) {
                        postTPTransferencia(this.state.tnumeroTransferencia, this.state.tncuentaTransferencia)
                            .then((res) => {
                                const tptransferencia = res.data
                                this.setState({ tptransferencia: tptransferencia[0] })
                            })
                            .then(() => {
                                postTPVenta(moment(), this.state.total, this.state.tptransferencia.clave, null, null, null, this.state.ventaActual.clave)
                            })
                    }
                    if (this.state.tnumeroCheque > 0) {
                        postTPCheque(this.state.tnumeroCheque, this.state.tncuentaCheque)
                            .then((res) => {
                                const tpcheque = res.data
                                this.setState({ tpcheque: tpcheque[0] })
                            })
                            .then(() => {
                                postTPVenta(moment(), this.state.total, null, null, this.state.tpcheque.clave, null, this.state.ventaActual.clave)
                            })
                    }
                    if (this.state.tnumeroTCredito > 0) {
                        postTPTCredito(this.state.tnumeroTCredito, this.state.tcodigo, this.state.tvfecha)
                            .then((res) => {
                                const tptcredito = res.data
                                this.setState({ tptcredito: tptcredito[0] })
                            })
                            .then(() => {
                                postTPVenta(moment(), this.state.total, null, this.state.tptcredito, null, null, this.state.ventaActual.clave)
                            })
                    }
                    if (this.state.tnumeroTDebito > 0) {
                        postTPTDebito(this.state.tnumeroTDebito, this.state.ttipo)
                            .then((res) => {
                                const tpdebito = res.data
                                this.setState({ tpdebito: tpdebito[0] })
                            })
                            .then(() => {
                                postTPVenta(moment(), this.state.total, null, null, null, this.state.tpdebito, this.state.ventaActual.clave)
                            })
                    } 
                })
                .then(() => {
                    let solicitud = false
                    this.state.mineralesCantidad.forEach((cm) => {
                        let inv = ''
                        if (!!cm.fk_metal) {
                            inv = this.state.inventarioList.find((i) => cm.fk_metal === i.fk_metal)
                        } else {
                            inv = this.state.inventarioList.find((i) => cm.fk_no_metal === i.fk_no_metal)
                        }
                        if (!!inv && inv.cantidad_almacenada >= cm.cantidad) {
                            this.postUpdateInventarioActual(cm.cantidad * (-1), cm.fk_metal, cm.fk_no_metal)
                            this.props.venta.forEach((dv) => {
                                if (dv.fk_metal === cm.fk_metal && dv.fk_no_metal === cm.fk_no_metal) {
                                    this.postDetVentaActual(dv.cantidad, dv.costo, inv.clave, this.state.ventaActual.clave, dv.fk_minpre)
                                }
                            })
                        } else {
                            solicitud = true
                            this.props.venta.forEach((dv) => {
                                if (dv.fk_metal === cm.fk_metal && dv.fk_no_metal === cm.fk_no_metal) {
                                    this.postDetVentaActual(dv.cantidad, dv.costo, inv.clave, this.state.ventaActual.clave, dv.fk_minpre)
                                }
                            })
                        }
                    })
                    this.setState({ solicitud })
                })
                .then(() => {
                    this.state.solicitud ? history.push({
                        pathname: '/ventas/solicitud',
                        state: {
                            mineralesCantidad: this.state.mineralesCantidad
                        }
                    }) : history.push('/')
                })
        }
       
    }

    postClienteList = () => {
        if (this.state.tipoClienteValue.label == 'Jurídico') {
            postInsertClienteJud(this.state.nombre, this.state.apellido, this.state.telefono, this.state.rif, this.state.fk_lugar)
                .then((res) => {
                    const clienteSelect = res.data
                    this.setState({ clienteSelect: clienteSelect[0] })
                })
                .then(() => {
                    console.log('cliente actual', this.state.clienteSelect)
                    this.postVentaActual()
                })
                .catch((err) => console.log(err))
        }
        else if (this.state.tipoClienteValue.label == 'Natural') {
            postInsertClienteNat(this.state.nombre, this.state.apellido, this.state.telefono, this.state.cedula, this.state.fk_lugar)
                .then((res) => {
                    const clienteSelect = res.data
                    this.setState({ clienteSelect: clienteSelect[0] })
                })
                .then(() => {
                    console.log('cliente actual', this.state.clienteSelect)
                    this.postVentaActual()
                })
                .catch((err) => console.log(err))
        }
    }

    atras_boton = () => {
        history.goBack()
    }

    registrar_boton = () => {
        if (this.state.tipoForma.label === 'Nuevo Cliente') {
            this.postClienteList()
        } else {
            this.postVentaActual()
        }        
    }

    render() {
        return (
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Seleccionar Cliente</h1>

                <div className="form-nuevo-emp">
                    <div className='caja-dosColumns'>
                        <div className='emp-nombre'>
                            <p className='lugar-label'>Cliente:</p>
                            <Select
                                name="cliente-tipo"
                                placeholder='Selecciona la forma de buscar cliente'
                                options={this.state.optionsForma}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay clientes con ese nombre"}
                                value={this.state.tipoForma}
                                onChange={this.formaVenta}
                            />
                        </div>
                    </div>
                    {this.state.tipoForma.label === 'Buscar cliente registrado' && 
                        <div className='caja-dosColumns'>
                            <div className='emp-nombre'>
                                <p className='lugar-label'>Seleccionar:</p>
                                <Select
                                    name="cliente-tipo"
                                    placeholder='Selecciona cliente'
                                    options={this.state.clienteList}
                                    className="single-select"
                                    classNamePrefix="select"
                                    getOptionLabel={option => option.nombre}
                                    getOptionValue={option => option.clave}
                                    noOptionsMessage={() => "No hay clientes con ese nombre"}
                                    value={this.state.clienteSelect}
                                    onChange={this.clienteNuevo}
                                />
                            </div>
                        </div> 
                    }
                    {this.state.tipoForma.label === 'Nuevo Cliente' && 
                        <div>
                            <div className='caja-dosColumns'>
                                <div className='emp-nombre'>
                                    <p className='lugar-label'>Tipo:</p>
                                    <Select
                                        name="cliente-tipo"
                                        placeholder='Selecciona el tipo de cliente'
                                        options={this.state.optionsTipoCliente}
                                        className="single-select"
                                        classNamePrefix="select"
                                        noOptionsMessage={() => "No hay clientes con ese tipo"}
                                        value={this.state.tipoClienteValue}
                                        onChange={this.tipoClienteChange}
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
                                    </div>
                                }
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
                    }
                    <div className='caja-dosColumns'>
                        <div className='emp-nombre'>
                            <p className='lugar-label'>Tipo de Pago:</p>
                            <Select
                                isMulti
                                name="cliente-tipo"
                                placeholder='Selecciona el tipo de pago'
                                options={this.state.optionsPago}
                                className="single-select"
                                classNamePrefix="select"
                                noOptionsMessage={() => "No hay clientes con ese nombre"}
                                value={this.state.tipoPago}
                                onChange={this.tipoPagoNuevo}
                            />
                        </div>
                    </div>
                    <div className="emp-nombre">
                        <Form className="empleado-nombre">
                            <Form.Group as={Row} controlId='formPlaintextText'>
                                <Form.Label className="label-nombre" column sm="3">Costo:</Form.Label>
                                <Col sm='9'>
                                    <Form.Control
                                        required
                                        size='lg'
                                        type='text'
                                        className='emp-inputs'
                                        placeholder='Tipo'
                                        value={this.state.total - this.state.costoTPTCredito - this.state.costoTPTDebito - this.state.costoTPTransferencia - this.state.costoTPCheque}
                                        readOnly
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                    {this.state.tipoPago && this.state.tipoPago.length > 0 &&
                        this.state.tipoPago.map((tp => {
                            return (
                                <div>
                                    {tp.label === 'Tarjeta Crédito' &&
                                        <div className="caja-dosColumns">
                                            <div className="tp-cheque">
                                                <Form className="tp-cheque-form">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Número:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Número'
                                                                value={this.state.tnumeroTCredito}
                                                                onChange={this.modificarTNumeroTCredito}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className='caja-fecha-aliado'>
                                                <p className='fecha-aliado-label'>Fecha Vencimiento:</p>
                                                <SingleDatePicker
                                                    date={this.state.tvfecha ? moment(this.state.tvfecha) : this.state.tvfecha}
                                                    onDateChange={this.modificatTVFecha}
                                                    focused={this.state.focusedC}
                                                    onFocusChange={({ focused }) => this.setState({ focusedC: focused })}
                                                    numberOfMonths={1}
                                                    isOutsideRange={() => false}
                                                    displayFormat='DD/MM/YYYY'
                                                    placeholder='Fecha'
                                                //weekDayFormat= 'Lu Ma Mi Ju Vi Sa Do'
                                                //monthFormat
                                                />
                                            </div>
                                            <div className="tp-cheque">
                                                <Form className="tp-cheque-form">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Código:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Código'
                                                                value={this.state.tcodigo}
                                                                onChange={this.modificarTCodigo}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className="emp-nombre">
                                                <Form className="empleado-nombre">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Costo:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Costo'
                                                                value={this.state.costoTPTCredito}
                                                                onChange={this.modificarCostoTPTCredito}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                        </div>
                                    }
                                    {tp.label === 'Transferencia' &&
                                        <div className="caja-dosColumns">
                                            <div className="emp-nombre">
                                                <Form className="empleado-nombre">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Número:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Número'
                                                                value={this.state.tnumeroTransferencia}
                                                                onChange={this.modificarTNumeroTransferencia}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className="emp-nombre">
                                                <Form className="empleado-nombre">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Número Cuenta:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Número de Cuenta'
                                                                value={this.state.tncuentaTransferencia}
                                                                onChange={this.modificarTNCuentaTransferencia}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className="emp-nombre">
                                                <Form className="empleado-nombre">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Costo:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Costo'
                                                                value={this.state.costoTPTransferencia}
                                                                onChange={this.modificarCostoTPTransferencia}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                        </div>
                                    }
                                    {tp.label === 'Cheque' &&
                                        <div className="caja-dosColumns">
                                            <div className="emp-nombre">
                                                <Form className="empleado-nombre">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Número:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Número'
                                                                value={this.state.tnumeroCheque}
                                                                onChange={this.modificarTNumeroCheque}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className="emp-nombre">
                                                <Form className="empleado-nombre">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Número Cuenta:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Número de Cuenta'
                                                                value={this.state.tncuentaCheque}
                                                                onChange={this.modificarTNCuentaCheque}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className="emp-nombre">
                                                <Form className="empleado-nombre">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Costo:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Costo'
                                                                value={this.state.costoTPCheque}
                                                                onChange={this.modificarCostoTPCheque}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                        </div>
                                    }
                                    {tp.label === 'Tarjeta Débito' &&
                                        <div className="caja-dosColumns">
                                            <div className="emp-nombre">
                                                <Form className="empleado-nombre">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Número:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Número'
                                                                value={this.state.tnumeroTDebito}
                                                                onChange={this.modificarTNumeroTDebito}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
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
                                                                value={this.state.ttipo}
                                                                onChange={this.modificarTTipo}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                            <div className="emp-nombre">
                                                <Form className="empleado-nombre">
                                                    <Form.Group as={Row} controlId='formPlaintextText'>
                                                        <Form.Label className="label-nombre" column sm="3">Costo:</Form.Label>
                                                        <Col sm='9'>
                                                            <Form.Control
                                                                required
                                                                size='lg'
                                                                type='text'
                                                                className='emp-inputs'
                                                                placeholder='Costo'
                                                                value={this.state.costoTPTDebito}
                                                                onChange={this.modificarCostoTPTDebito}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        }))
                    }
                   
                </div>     
    
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.registrar_boton} className='botones-nuevo'>Generar Venta</Button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    venta: state.venta
})

export default connect(mapStateToProps)(ClienteNuevo)