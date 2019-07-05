import React from 'react'
import { history } from '../routers/AppRouter'
import moment from 'moment'
import {
    getMinPre,
    getNoMetales,
    getMetales,
    getDetVenta} from '../utils/api'

class Ventas_pen extends React.Component{
    state = {
        detVentaList: [],
        cantidad: 0,
        costo: 0,
        minPreList: [],
        noMetalList: [],
        mineralList: [],
        metalList: [],
        minerales: '',
    }
    getMinPreList = () => {
        getMinPre()
            .then((res) => {
                const minPreList = res.data
                this.setState({ minPreList })
            })
            .then(() => {
                let minerales = ''
                this.state.detVentaList.forEach((dc) => {
                    const minpre = this.state.minPreList.find((a) => a.clave === dc.fk_minpre)
                    const mineral = this.state.mineralList.find((m) => m.clave === minpre.fk_metal || m.clave === minpre.fk_nometal)
                    minerales = minerales + mineral.nombre + ' | '
                })
                this.setState({ minerales })
            })
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
                this.getMinPreList()
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
    getDetVentaList = () => {
        getDetVenta(this.props.clave)
            .then((res) => {
                const detVentaList = res.data
                this.setState({ detVentaList })
            })
            .then(() => {
                let cantidad = 0
                let costo = 0
                this.state.detVentaList.forEach((dv) => {
                    cantidad += parseInt(dv.cantidad, 10)
                    costo += parseInt(dv.costo_ind, 10)
                })
                this.setState({ cantidad, costo })
            })
            .then(() =>{
                this.getMetalList()
            })
    }
    componentWillMount = () => {
        this.getDetVentaList()

    }
    render(){
        return(
            <div className='estatus-caja' onClick={this.estatusCambiar}>
                <p>{this.props.cliente}</p>
                <p>{this.state.minerales}</p>
                <p>{this.state.cantidad} Kg</p>
                <p>{this.state.costo} Bs</p>
                <p>{moment(this.props.fecha).format('DD/MM/YYYY')}</p>
            </div>
        )
    }
    estatusCambiar = () => {
        history.push(`/estatus/cambiar/${this.props.clave}`,{tipo: 'venta'})
    }
}

export default Ventas_pen 