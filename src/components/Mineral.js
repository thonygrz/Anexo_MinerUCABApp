import React from 'react'
import { Button, Image } from 'react-bootstrap'
import EliminarModal from './EliminarModal'
import { history } from '../routers/AppRouter'
import mineralImagen from '../../img/mineral.jpg'

class Mineral extends React.Component {
    state = {
        modalShow: false
    }
    mineralesConsultar = () => {
        history.push(`/minerales/consultar/${this.props.clave}`, {tipo: this.props.tipo})        
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false })
        return (
            <div className='mineral-caja'>
                <Image src={mineralImagen} width='100px' />
                <div className='m-c-titulo' onClick={this.mineralesConsultar}>
                    <p>{this.props.nombre}</p>
                </div>
                <div className='mineral-caja-botones'>
                    <Button onClick={this.modificar_boton} className="i-c-boton">Modificar</Button>
                    <Button onClick={this.eliminar_boton} className="i-c-boton">Eliminar</Button>
                </div>
                <EliminarModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    eliminar='mineral'
                    nombre={this.props.nombre}
                    clave_min={this.props.clave}
                    //getMin={this.getMin}
                />
            </div>
        )
    }
    eliminar_boton = () =>{
        this.setState({ modalShow: true })
    }
    modificar_boton = () =>{
        if(this.props.dureza){
            history.push(`/minerales/modificar/${this.props.clave}`,{clave: this.props.clave, nombre: this.props.nombre, descripcion: this.props.descripcion,dureza: this.props.dureza, maleabilidad: this.props.maleabilidad, tipo: this.props.tipo}) 
        }
        else if(!this.props.dureza){
            history.push(`/minerales/modificar/${this.props.clave}`,{clave: this.props.clave, nombre: this.props.nombre, descripcion: this.props.descripcion, tipo: this.props.tipo}) 
        }
    }

}
export default Mineral