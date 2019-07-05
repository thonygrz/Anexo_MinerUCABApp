import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import empleadosImagen from '../../img/user_blue_logo.png'
import EliminarModal from './EliminarModal'


class Empleado extends React.Component {
    state = {
        modalShow: false
    }
    clienteConsultar = () => {
        if(this.props.cedula){
            history.push(`/clientes/consultar/${this.props.clave}`,{clave: this.props.clave, nombre: this.props.nombre, apellido: this.props.apellido, telefono: this.props.telefono, cedula: this.props.cedula, fk_lugar: this.props.fk_lugar})
        }
        else if(this.props.rif){
            history.push(`/clientes/consultar/${this.props.clave}`,{clave: this.props.clave, nombre: this.props.nombre, telefono: this.props.telefono, rif: this.props.rif, fk_lugar: this.props.fk_lugar})
        }
    }
    render() {
        let modalClose = () => this.setState({ modalShow: false })
        return (
            <div className='empleado-caja'>
                <Image src={empleadosImagen} width='70px' />
                <div className='e-c-titulo' onClick={this.clienteConsultar}>
                    <p>{this.props.nombre}</p>
                </div>
                <div className='empleado-caja-botones'>
                    <Button onClick={this.modificar_boton} className="e-c-boton">Modificar</Button>
                    <Button onClick={this.eliminar_boton} className="e-c-boton">Eliminar</Button>
                </div>
                <EliminarModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    eliminar='cliente'
                    nombre={this.props.nombre}
                    clave_cli={this.props.clave}
                    apellido={this.props.apellido}
                />
            </div>
        )
    }
    modificar_boton = () => {
        if(this.props.cedula){
            history.push(`/clientes/modificar/${this.props.clave}`,{clave: this.props.clave, nombre: this.props.nombre, apellido: this.props.apellido, telefono: this.props.telefono, cedula: this.props.cedula, fk_lugar: this.props.fk_lugar})
        }
        else if(this.props.rif){
            history.push(`/clientes/modificar/${this.props.clave}`,{clave: this.props.clave, nombre: this.props.nombre, telefono: this.props.telefono, rif: this.props.rif, fk_lugar: this.props.fk_lugar})
        }

    }
    eliminar_boton = () => {
        this.setState({ modalShow: true })
    }
}

export default Empleado