import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import comprasImagen from '../../img/compra.png'
import clientesImagen from '../../img/user_blue_logo.png'

class Venta extends React.Component {
    state = {
        modalShow: false
    }

    ventasDetalles = () => {
        history.push(`/ventas/historial/detalles/${this.props.clave}`)
    }

    consultarCliente = () => {
        if (this.props.cedula) {
            history.push(`/clientes/consultar/${this.props.clave_cliente}`, { clave: this.props.clave_cliente, nombre: this.props.nombre_cliente, apellido: this.props.apellido, telefono: this.props.telefono, cedula: this.props.cedula, fk_lugar: this.props.fk_lugar })
        }
        else if (this.props.rif) {
            history.push(`/clientes/consultar/${this.props.clave_cliente}`, { clave: this.props.clave_cliente, nombre: this.props.nombre_cliente, telefono: this.props.telefono, rif: this.props.rif, fk_lugar: this.props.fk_lugar })
        }
    }

    render() {
        return (
            <div className='compras-columnas'>
                <div className='compras-lista'>
                    <div className='compra-caja'>
                        <Image src={comprasImagen} width='70px'/>
                        <div className='c-c-titulo comp-det' onClick={this.ventasDetalles}>
                            <p>Venta {this.props.clave}</p>
                        </div>
                    </div>
                </div>
                <div className='compras-lista'>
                    <div className='compra-caja'>
                        <Image src={clientesImagen} width='70px' />
                        <div className='c-c-titulo comp-det' onClick={this.consultarCliente}>
                            <p>{this.props.nombre_cliente}</p>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}


export default Venta