import React from 'react'
import { Modal, Button } from 'react-bootstrap'

class ModificarModal extends React.Component {
    modificar = () => {
        this.props.onHide()
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
                        Modificar {this.props.modificar}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='eliminar-body'>
                        Está a punto de modificar el {this.props.modificar} {this.props.nombre}
                    </p>
                </Modal.Body>
                <Modal.Footer className='caja-botones-eliminar'>
                    <Button className='boton-eliminar' onClick={this.props.onHide}>Cancelar</Button>
                    <Button className='boton-eliminar' onClick={this.modificar}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        )
    }
} 

export default ModificarModal