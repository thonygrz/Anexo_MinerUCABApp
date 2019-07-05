import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import empleadosImagen from '../../img/user_blue_logo.png'
import EliminarModal from './EliminarModal'


class Empleado extends React.Component {
    state = {
        modalShow: false
    }
    empleadoConsultar = () => {
        history.push(`/empleados/consultar/${this.props.clave}`,{clave: this.props.clave, nombre: this.props.nombre, apellido: this.props.apellido,cedula: this.props.cedula, sexo: this.props.sexo, telefono: this.props.telefono, fecha_nac: this.props.fecha_nac, fecha_cont: this.props.fecha_cont, fk_cargo:this.props.fk_cargo, fk_estatus: this.props.fk_estatus, fk_lugar: this.props.fk_lugar})
    }
    render() {
        let modalClose = () => this.setState({ modalShow: false })
        return (
            <div className='empleado-caja'>
                <Image src={empleadosImagen} width='70px' />
                <div className='e-c-titulo' onClick={this.empleadoConsultar}>
                    <p>{this.props.nombre}</p>
                </div>
                <div className='empleado-caja-botones'>
                    <Button onClick={this.modificar_boton} className="e-c-boton">Modificar</Button>
                    <Button onClick={this.eliminar_boton} className="e-c-boton">Eliminar</Button>
                </div>
                <EliminarModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    eliminar='empleado'
                    nombre={this.props.nombre}
                    clave_emp={this.props.clave}
                />
            </div>
        )
    }
    modificar_boton = () =>{
        history.push(`/empleados/modificar/${this.props.clave}`,{clave: this.props.clave, nombre: this.props.nombre, apellido: this.props.apellido,cedula: this.props.cedula, sexo: this.props.sexo, telefono: this.props.telefono, fecha_nac: this.props.fecha_nac, fecha_cont: this.props.fecha_cont, fk_cargo:this.props.fk_cargo, fk_estatus: this.props.fk_estatus, fk_lugar: this.props.fk_lugar})
    }
    eliminar_boton = () =>{
        this.setState({ modalShow: true })
    }

}


export default Empleado