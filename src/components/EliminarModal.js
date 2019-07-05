import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { deleteMineral } from '../utils/api'
import { deleteAliado } from '../utils/api'
import { deleteClienteNat } from '../utils/api'
import { deleteClienteJud, deleteYacimiento } from '../utils/api'
import { deleteEmpleado } from '../utils/api'


class EliminarModal extends React.Component {
    // eliminarMineral = () => {
    //     deleteMineralList();
    //     this.props.onHide()
    // }
    deleteYacimientoList = () => {
        deleteYacimiento(this.props.clave_yac)
            .then((req) => {
                // console.log(this.props.clave_min, this.props.nombre);
                //console.log('hola');
            })
            .catch((err) => console.log(err));
        this.props.onHide()
    }

    deleteEmpleadoList = () => {
        console.log('CLAVE EMPLEADO A ELIMINAR: ',this.props.clave_emp)
        deleteEmpleado(this.props.clave_emp)
        .then((req) => {
            // console.log(this.props.clave_min, this.props.nombre);
            //console.log('hola');
        })
        .catch((err) => console.log(err));
        this.props.onHide()
       // this.props.eliminar === 'mineral' && this.props.g
    }

    deleteMineralList = () => {
        deleteMineral(this.props.clave_min)
        .then((req) => {
            // console.log(this.props.clave_min, this.props.nombre);
            //console.log('hola');
        })
        .catch((err) => console.log(err));
        this.props.onHide()
       // this.props.eliminar === 'mineral' && this.props.g
    }

    deleteAliadoList = () => {
        deleteAliado(this.props.clave_ali)
        .then((req) => {
            // console.log(this.props.clave_min, this.props.nombre);
            //console.log('hola');
        })
        .catch((err) => console.log(err));
        this.props.onHide()
       // this.props.eliminar === 'mineral' && this.props.g
    }

    deleteClienteList = () => {
        if(this.props.apellido){
            deleteClienteNat(this.props.clave_cli)
            .then((req) => {
                // console.log(this.props.clave_min, this.props.nombre);
                //console.log('hola');
            })
            .catch((err) => console.log(err));
            this.props.onHide()
        // this.props.eliminar === 'mineral' && this.props.g
        }
        else if(!this.props.apellido){
            deleteClienteJud(this.props.clave_cli)
            .then((req) => {
                // console.log(this.props.clave_min, this.props.nombre);
                //console.log('hola');
            })
            .catch((err) => console.log(err));
            this.props.onHide()
           // this.props.eliminar === 'mineral' && this.props.g
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className='eliminar-titulo' id="contained-modal-title-vcenter">
                        Eliminar {this.props.eliminar}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='eliminar-body'>
                        Está a punto de eliminar el {this.props.eliminar} {this.props.nombre}
                    </p>
                </Modal.Body>
                <Modal.Footer className='caja-botones-eliminar'>
                    <Button className='boton-eliminar' onClick={this.props.onHide}>Cancelar</Button>
                    {this.props.eliminar === 'mineral' && <Button className='boton-eliminar' onClick={this.deleteMineralList}>Aceptar</Button>}
                    {this.props.eliminar === 'aliados' && <Button className='boton-eliminar' onClick={this.deleteAliadoList}>Aceptar</Button>}
                    {this.props.eliminar === 'cliente' && <Button className='boton-eliminar' onClick={this.deleteClienteList}>Aceptar</Button>}
                    {this.props.eliminar === 'yacimiento' && <Button className='boton-eliminar' onClick={this.deleteYacimientoList}>Aceptar</Button>}
                    {this.props.eliminar === 'empleado' && <Button className='boton-eliminar' onClick={this.deleteEmpleadoList}>Aceptar</Button>}


                </Modal.Footer>
            </Modal>
        )
    }
} 

export default EliminarModal