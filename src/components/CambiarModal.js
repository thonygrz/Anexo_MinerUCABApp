import React from 'react'
import { Modal, Button } from 'react-bootstrap'

class CambiarModal extends React.Component {
    cambiar = () => {
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
                        Cambiar {this.props.cambiar}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='eliminar-body'>
                        Está a punto de cambiar el {this.props.cambiar} {this.props.nombre}
                    </p>
                </Modal.Body>
                <Modal.Footer className='caja-botones-eliminar'>
                    <Button className='boton-eliminar' onClick={this.props.onHide}>Cancelar</Button>
                    <Button className='boton-eliminar' onClick={this.cambiar}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
        )
    }
} 

export default CambiarModal