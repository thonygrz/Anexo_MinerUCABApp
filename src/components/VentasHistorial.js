import React from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import { Button } from 'react-bootstrap'
import Venta from './Venta'
import { getVentas, getClientesNat, getClientesJud } from '../utils/api'


class VentasHistorial extends React.Component {
    state = {
        ventas: [{
            clave: '',
            fk_clientenatural: '',
            fk_clientejuridico: '',
            nombre_cliente: '',
        }],
        ventasList: [],
        clienteList: [],
        clienteNaturalList: [],
        clienteJuridicoList: [],
    }
    getVentasList = () => {
        getVentas()
        .then((res) => {
            const ventasList = res.data
            this.setState({ ventasList })
        })
        .then(() => {
            const venta = []
            if (this.state.ventasList.length > 0) {
                console.log(this.state.ventasList)
                console.log(this.state.clienteList)

                this.state.ventasList.forEach((v) => {
                    console.log(v)
                    console.log(this.state.clienteList.find((c) => (c.clave === v.fk_clientenatural || c.clave === v.fk_clientejuridico)))
                    const cliente = this.state.clienteList.find((c) => (c.clave === v.fk_clientenatural || c.clave === v.fk_clientejuridico))
                    venta.push({
                        clave: v.clave,
                        fk_clientenatural: v.fk_clientenatural,
                        fk_clientejuridico: v.fk_clientejuridico,
                        nombre_cliente: cliente.nombre,
                        apellido: cliente.apellido,
                        telefono: cliente.telefono,
                        cedula: cliente.ci,
                        rif: cliente.rif,
                        fk_lugar: cliente.fk_lugar
                    })
                })
            }
            this.setState({ ventas: venta })
        })
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
            .then(() => {
                this.getVentasList()
            })
            .catch((err) => console.log(err))
    }

    getClienteNaturalList = () => {
        getClientesNat()
            .then((res) => {
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
        this.getClienteNaturalList()
    }
    render() {
        return (
            <div className='compras content-container'>
                <h1 className='ali-nuevo-titulo'>Historial</h1>

                <div className='compras-columnas-enc'>
                    <div className='compras-lista'>
                        <div className='compra-caja'>
                            <div className='historial-titulo'>
                                Ventas
                            </div>
                        </div>
                    </div>
                    <div className='compras-lista'>
                        <div className='compra-caja'>
                            <div className='historial-titulo'>
                                Clientes
                            </div>
                        </div>
                    </div>
                </div>

                <div className='compras-columnas'>
                    <div className='compras-lista'>
                        {this.state.ventas.map((venta, index) => {
                            return <Venta key={venta.clave} clave={venta.clave} nombre_cliente={venta.nombre_cliente} clave_cliente={venta.fk_clientenatural || venta.fk_clientejuridico} telefono={venta.telefono} apellido={venta.apellido} rif={venta.rif} cedula={venta.cedula} fk_lugar={venta.fk_lugar}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    compras: state.compras
})

export default connect(mapStateToProps)(VentasHistorial)