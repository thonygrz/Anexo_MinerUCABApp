import React from 'react'
import VentDet from './VentDet'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import moment from 'moment'
import { getDetVenta, getVentas, getMinPre, getPresentacion, getNoMetales, getMetales } from '../utils/api'

class VentasDetalles extends React.Component {
    state = {
        clave: this.props.match.params.id,
        vent_det: [],
        detVentaList: [],
        ventasList: [],
        metalList: [],
        noMetalList: [],
        mineralList: [],
        minPreList: [],
        presentacionList: [],
    }

    getDetVentaList = () => {
        getDetVenta(this.props.match.params.id)
            .then((res) => {
                const detVentaList = res.data
                this.setState({ detVentaList })
            })
            .then(() => {
                const vent_det = []
                console.log(this.state.detVentaList)
                const ventaDetArray = this.state.detVentaList
                if (ventaDetArray.length > 0) {
                    const fecha = this.state.ventasList.find((v) => v.clave == this.state.clave).fecha
                    ventaDetArray.forEach((v) => {
                        const mineralCod = this.state.minPreList.find((p) => p.clave === v.fk_minpre)
                        const mineral = this.state.mineralList.find((m) => (m.clave === mineralCod.fk_metal || m.clave === mineralCod.fk_no_metal)).nombre
                        const presentacion = this.state.presentacionList.find((p) => p.clave === mineralCod.fk_presentacion).nombre
                        vent_det.push({
                            mineral,
                            presentacion,
                            cantidad: v.cantidad,
                            costo: v.costo_ind * v.cantidad,
                            fecha: moment(fecha).format('DD/MM/YYYY')
                        })
                    })
                }
                this.setState({ vent_det })
            })
    }

    getVentasList = () => {
        getVentas()
            .then((res) => {
                const ventasList = res.data
                this.setState({ ventasList })
            })
            .then(() => {
                this.getDetVentaList()
            })
    }

    getMinPreList = () => {
        getMinPre()
            .then((res) => {
                const minPreList = res.data
                this.setState({ minPreList })
            })
            .then(() => {
                this.getVentasList()
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
                this.getPresentacionList()
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

    componentWillMount = () => {
        this.getMetalList()
    }
    render() {
        return (
            <div className='compras content-container'>
                <h1 className='compras-det-titulo'>Detalle de Venta {this.state.clave}</h1>
                {this.state.vent_det.length > 0 &&
                    this.state.vent_det.map((v, index) => {
                        return <VentDet key={index} mineral={v.mineral} presentacion={v.presentacion} cantidad={v.cantidad} costo={v.costo} fecha={v.fecha}></VentDet>
                    })
                }
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

export default VentasDetalles