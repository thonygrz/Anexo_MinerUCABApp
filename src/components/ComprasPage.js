import React from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import { Button } from 'react-bootstrap'
import Compra from './Compra'
import { getAliados, getCompras } from '../utils/api'

class ComprasPage extends React.Component {
    state = {
        compras: [{
            clave: '',
            fk_aliado: '',
            nombre_aliado: '',
            fecha_aliado: '',
            fk_lugar_aliado: '',
        }],
        aliadosList: [],
        comprasList: [],
    }
    getComprasList = () => {
        getCompras()
            .then((res) => {
                const comprasList = res.data
                this.setState({ comprasList })
            })
            .then(() => {
                const compra = []
                if (this.state.comprasList.length > 0) {
                    this.state.comprasList.forEach((c) => {
                        console.log(c)
                        const ali = this.state.aliadosList.find((a) => a.clave === c.fk_aliado)
                        compra.push({
                            clave: c.clave,
                            fk_aliado: c.fk_aliado,
                            nombre_aliado: ali.nombre,
                            fecha_aliado: ali.fecha_c,
                            fk_lugar_aliado: ali.fk_lugar,
                        })
                        console.log(compra)
                    })
                }
                this.setState({ compras: compra })
            })
    }
    getAliadosList = () => {
        getAliados()
            .then((res) => {
                const aliadosList = res.data
                this.setState({ aliadosList })
            })
            .then(() => {
                this.getComprasList()
            })
    }
    componentWillMount = () => {
        this.getAliadosList()
    }
    render () {
        return (
            <div className='compras content-container'>
                <h1 className='ali-nuevo-titulo'>Historial</h1>

                <div className='compras-columnas-enc'>
                    <div className='compras-lista'>
                        <div className='compra-caja'>
                            <div className='historial-titulo'>
                                Compras
                            </div>
                        </div>
                    </div>
                    <div className='compras-lista'>
                        <div className='compra-caja'>
                            <div className='historial-titulo'>
                                Aliados
                            </div>
                        </div>
                    </div>   
                </div>

                <div className='compras-columnas'>
                    <div className='compras-lista'>
                        {this.state.compras.map((compra, index) => {
                            return <Compra key={compra.clave} clave={compra.clave} nombre_aliado={compra.nombre_aliado} clave_aliado={compra.fk_aliado} fecha_aliado={compra.fecha_aliado} fk_lugar_aliado={compra.fk_lugar_aliado}/>
                        })}
                    </div>
                </div>         
            </div>
        )
    }
} 

const mapStateToProps = (state) =>({
    compras: state.compras,
    aliados: state.aliados
})

export default connect(mapStateToProps)(ComprasPage)