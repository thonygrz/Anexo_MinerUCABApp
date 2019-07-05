import React from 'react'
import { connect } from 'react-redux'
import Ventas_pen from './Ventas_pen'
import Compras_pen from './Compras_pen'
import { getAliados, getClientesJud, getClientesNat, getVentasPendientes, getComprasPendientes, getVentaP, getCompraP } from '../utils/api'

class EstatusPage extends React.Component {
    state = {
        ventasPendientesList: [],
        comprasPendientesList: [],
        ventasList: [],
        comprasList: [],
        clienteJuridicoList: [],
        clienteNaturalList: [],
        clienteList: [],
        detVentaList: [],
        detCompraList: [],
        aliadoList: [],
    }
    getComprasPList = (clave) => {
        getCompraP(clave)
            .then((res) => {
                const comprasList = res.data
                this.setState((prev) => ({ comprasList: prev.comprasList.concat(comprasList) }))
            })
    }
    getVentaPList = (clave) => {
        getVentaP(clave)
            .then((res) => {
                const ventasList = res.data
                this.setState((prev) => ({ ventasList: prev.ventasList.concat(ventasList) }))
            })
    } 
    getComprasPendientesList = () => {
        getComprasPendientes()
            .then((res) => {
                const comprasPendientesList = res.data
                this.setState({ comprasPendientesList })
            })
            .then(() => {
                this.state.comprasPendientesList.forEach((cp) => {
                    this.getComprasPList(cp.fk_compra)
                })
            })
    }
    getVentasPendientesList = () => {
        getVentasPendientes()
            .then((res) => {
                const ventasPendientesList = res.data
                this.setState({ ventasPendientesList })
            })
            .then(() => {
                this.getComprasPendientesList()
            })
            .then(() => {
                this.state.ventasPendientesList.forEach((vp) => {
                    this.getVentaPList(vp.fk_venta)
                })
            })
    }
    getAliadoList = () => {
        getAliados()
            .then((res) => {
                console.log('ya llegaron los aliados', res);
                var aliadoList = res.data;
                this.setState({ aliadoList });
            })
            .catch((err) => console.log(err));
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

    componentWillMount = () => {
        this.getVentasPendientesList()
        this.getClienteNaturalList()
        this.getAliadoList()
    }
    render(){
        return (
            <div className='estatus content-container'>
                <h1 className='estatus-titulo'>Compras pendientes</h1>
                {this.state.comprasList.map((compra_pen,index) => {

                    const aliado = this.state.aliadoList.find((al) => al.clave === compra_pen.fk_aliado)
                    return <Compras_pen key={compra_pen.clave} clave={compra_pen.clave} aliado={aliado.nombre} mineral={compra_pen.mineral} cantidad={compra_pen.cantidad} costo={compra_pen.costo} fecha={compra_pen.fecha}></Compras_pen>
                })}
                <h1 className='estatus-titulo'>Ventas pendientes</h1>
                {this.state.ventasList.map((venta_pen,index) => {
                    const cliente = this.state.clienteList.find((cl) => cl.clave === venta_pen.fk_clientenatural || cl.clave === venta_pen.fk_clientejuridico)
                    
                    return <Ventas_pen key={venta_pen.clave} clave={venta_pen.clave} cliente={cliente.nombre} fecha={venta_pen.fecha}></Ventas_pen>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    compras_pen: state.compras_pen,
    ventas_pen: state.ventas_pen
})

export default connect(mapStateToProps)(EstatusPage)