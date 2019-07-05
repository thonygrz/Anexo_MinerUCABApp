import React from 'react'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import moment from 'moment'
import { Form, Row, Col, Button } from 'react-bootstrap'
import {
    getVentaStatus,
    getCompraStatus,
    getStatus,
    postUpdateVentaStatus,
    postUpdateCompraStatus,
    postVentaStatus,
    postCompraStatus } from '../utils/api'

class CambioEstatus extends React.Component {
    state = {
        estatus: [],
        estatusSelect: '',
        statusList: [],
    }
    nuevoEstatus = (e) => {
        const estatusSelect = e
        this.setState({ estatusSelect })
    }
    getVentaPendiente = () => {
        getVentaStatus(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                console.log(res)
                const venta = res.data
                const ventaInd = venta[venta.length - 1]
                const estatusSelect = this.state.statusList.find((s) => s.clave === ventaInd.fk_status)
                this.setState({ estatusSelect })
            })
    }
    getCompraPendiente = () => {
        getCompraStatus(parseInt(this.props.match.params.id, 10))
            .then((res) => {
                console.log(res)
                const compra = res.data
                const compraInd = compra[compra.length - 1]
                const estatusSelect = this.state.statusList.find((s) => s.clave === compraInd.fk_status)
                this.setState({ estatusSelect })
            })
    }
    getStatusList = () => {
        getStatus()
            .then((res) => {
                const statusList = res.data
                this.setState({ statusList })
            })
    }
    componentWillMount = () => {
        this.getStatusList()
        if (this.props.location.state.tipo === 'venta') {
            this.getVentaPendiente()
        } else {
            this.getCompraPendiente()
        }
    }
    atras_boton = () => {
        history.goBack()
    }

    postEstatusVenta = () => {
        postVentaStatus(moment(), parseInt(this.props.match.params.id, 10), this.state.estatusSelect.clave)
        .then(() => {
            history.goBack()

        })
    }

    postEstatusCompra = () => {
        postCompraStatus(moment(), parseInt(this.props.match.params.id, 10), this.state.estatusSelect.clave)
            .then(() => {
                history.goBack()
            })
    }

    registrar_boton = () => {
        if (this.props.location.state.tipo === 'venta') {
            this.postEstatusVenta()
        } else {
            this.postEstatusCompra()
        }
    }
    render() {
        return (
            <div className="nuevo-aliado content-container">
                <h1 className='ali-nuevo-titulo'>Cambiar Estatus</h1>
                <div className="form-nuevo-ali">
                    <div className='caja-multi-select'>
                        <Select
                            name="empleados"
                            options={this.state.statusList}
                            // value={this.state.estatusSelect
                            getOptionLabel={(option) => option.nombre}
                            getOptionValue={(option) => option.clave}
                            className="multi-select-proy"
                            classNamePrefix="select"
                            noOptionsMessage={() => "No hay horas con ese nombre"}
                            placeholder="Selecciona Estatus"
                            onChange={this.nuevoEstatus}
                        />
                    </div>
                </div>
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.registrar_boton} className='botones-nuevo'>Generar Venta</Button>
                </div>
            </div>
        )
    }
}

export default CambioEstatus