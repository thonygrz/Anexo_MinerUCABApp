import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import yacimientosImagen from '../../img/pico.png'
import EliminarModal from './EliminarModal'

class Yacimiento extends React.Component {
    state = {
        modalShow: false
    }
    yacimientoConsultar = () => {
        history.push(`/yacimientos/consultar/${this.props.clave}`)
    }
    render() {
        let modalClose = () => this.setState({ modalShow: false })
        return (
            <div className='yacimiento-caja'>
                <Image src={yacimientosImagen} width='70px' />
                <div className='y-c-titulo' onClick={this.yacimientoConsultar}>
                    <p>{this.props.nombre}</p>
                </div>
                <div className='yacimiento-caja-botones'>
                    <Button onClick={this.modificar_boton} className="y-c-boton">Modificar</Button>
                    <Button onClick={this.eliminar_boton} className="y-c-boton">Eliminar</Button>
                </div>
                <EliminarModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    eliminar='yacimiento'
                    nombre={this.props.nombre}
                    clave_yac={this.props.clave}
                />
            </div>
        )
    }
    modificar_boton = () =>{
        history.push(`/yacimientos/modificar/${this.props.clave}`)
    }
    eliminar_boton = () =>{
        this.setState({ modalShow: true })
    }

}


export default Yacimiento