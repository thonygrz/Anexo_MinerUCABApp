import React from 'react'
import { history } from '../routers/AppRouter'
import moment from 'moment'
import {
    getAli_MinSinFK,
    getNoMetales,
    getMetales,
    getDetCompra } from '../utils/api'

class Compras_pen extends React.Component{
    state = {
        detCompraList: [],
        cantidad: 0,
        costo: 0,
        aliMinList: [],
        noMetalList: [],
        mineralList: [],
        metalList: [],
        minerales: '',
    }
    getAli_MinList = () => {
        getAli_MinSinFK()
            .then((res) => {
                var aliMinList = res.data;
                this.setState({ aliMinList });
            })
            .then(() => {
                let minerales = ''
                this.state.detCompraList.forEach((dc) => {
                    const alimin = this.state.aliMinList.find((a) => a.clave === dc.fk_alimin)
                    const mineral = this.state.mineralList.find((m) => m.clave === alimin.fk_metal || m.clave === alimin.fk_nometal)
                    minerales = minerales + mineral.nombre + ' | '
                })
                this.setState({ minerales })
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
                this.getAli_MinList()
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
    getDetComprasList = () => {
        getDetCompra(this.props.clave)
            .then((res) => {
                const detCompraList = res.data
                this.setState({ detCompraList })
            })
            .then(() => {
                let cantidad = 0
                let costo = 0
                this.state.detCompraList.forEach((dv) => {
                    cantidad += parseInt(dv.cantidad, 10)
                    costo += parseInt(dv.costo_ind, 10)
                })
                this.setState({ cantidad, costo })
            })
            .then(() => {
                this.getMetalList()
            })
    }
    componentWillMount = () => {
        this.getDetComprasList()
    }
    render(){
        return(
            <div className='estatus-caja' onClick={this.estatusCambiar} >
                <p>{this.props.aliado}</p>
                <p>{this.state.minerales}</p>
                <p>{this.state.cantidad} Kg</p>
                <p>{this.state.costo} Bs</p>
                <p>{moment(this.props.fecha).format('DD/MM/YYYY')}</p>
            </div>
        )
    }
    estatusCambiar = () => {
        history.push(`/estatus/cambiar/${this.props.clave}`, { tipo: 'compra' })
    }
}

export default Compras_pen 