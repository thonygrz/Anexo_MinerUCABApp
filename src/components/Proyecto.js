import React from 'react'
import { Button } from 'react-bootstrap'
import EliminarModal from './EliminarModal'
import { history } from '../routers/AppRouter'

class Proyecto extends React.Component{
    state = {
        modalShow: false
    }
    consultar = () => {
        console.log(this.props.clave) 
        history.push(`/proyectos/consultar/${this.props.clave}`)
    }
    modificar = () => {
        history.push('/proyectos/modificar')
    }
    render(){
        let modalClose = () => this.setState({ modalShow: false })
        return(
            <div className="proyecto-caja">
                <div className='p-c-titulo' onClick={this.consultar}>
                    <p>{this.props.nombre}</p>
                </div>
                <div className='proyecto-caja-botones'>
                    <Button onClick={this.modificar} className="p-c-boton">Modificar</Button>
                    <Button onClick={this.eliminar_boton} className="p-c-boton">Eliminar</Button>
                </div>
                <EliminarModal
                    show={this.state.modalShow}
                    onHide={modalClose}
                    eliminar='proyecto'
                    nombre={this.props.nombre}
                />
            </div>
        )
    }
    eliminar_boton = () =>{
        this.setState({ modalShow: true })
    }
}

export default Proyecto