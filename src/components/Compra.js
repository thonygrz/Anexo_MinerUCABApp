import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import aliadosImagen from '../../img/manos-estrechadas.png'
import compraImagen from '../../img/compra.png'

class Compra extends React.Component {
    state = {
        modalShow: false
    }

    comprasDetalles = () => {
        history.push(`/compras/detalles/${this.props.clave}`)
    }

    consultarAliado = () => {
        history.push(`/aliados/consultar/${this.props.clave_aliado}`, { clave: this.props.clave_aliado, nombre: this.props.nombre_aliado, fecha_c: this.props.fecha_aliado, fk_lugar: this.props.fk_lugar_aliado })
    }

    render() {
        return (
            <div className='compras-columnas'>
                <div className='compras-lista'>
                    <div className='compra-caja'>
                        <Image src={compraImagen} width='70px'/>
                        <div className='c-c-titulo comp-det' onClick={this.comprasDetalles}>
                            <p>Compra {this.props.clave}</p>
                        </div>
                    </div>
                </div>
                <div className='compras-lista'>
                    <div className='compra-caja'>
                        <Image src={aliadosImagen} width='70px' />
                        <div className='c-c-titulo comp-det' onClick={this.consultarAliado}>
                            <p>{this.props.nombre_aliado}</p>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}

export default Compra