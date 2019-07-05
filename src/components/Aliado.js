import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import aliadosImagen from '../../img/manos-estrechadas.png'
import EliminarModal from './EliminarModal'
import {getLugar} from '../utils/api'

class Aliados extends React.Component {
    state = {
        modalShow: false,
        estado: '',
        municipio: '',      
        parroquia: '',
    }

    aliadoConsultar = () => {
        history.push(`/aliados/consultar/${this.props.clave}`,{clave: this.props.clave, nombre: this.props.nombre, fecha_c: this.props.fecha_c, fk_lugar: this.props.fk_lugar})        
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false })
        return (
            <div className='aliado-caja'>
                <Image src={aliadosImagen} width='70px' />
                <div className='a-c-titulo' onClick={this.aliadoConsultar}>
                    <p>{this.props.nombre}</p>
                </div>
                <div className='aliado-caja-botones'>
                    <Button onClick={this.modificar_boton} className="a-c-boton">Modificar</Button>
                    <Button onClick={this.eliminar_boton} className="a-c-boton">Eliminar</Button>
                </div>
                <EliminarModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    eliminar='aliados'
                    nombre={this.props.nombre}
                    clave_ali={this.props.clave}
                />
            </div>
        )
    }

    modificar_boton = () =>{
        history.push(`/aliados/modificar/${this.props.clave}`,{clave: this.props.clave, nombre: this.props.nombre, fecha_c: this.props.fecha_c, fk_lugar: this.props.fk_lugar})
    }
    eliminar_boton = () => {
        this.setState({ modalShow: true })
    }

}


export default Aliados