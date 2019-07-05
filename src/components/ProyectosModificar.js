import React from 'react'
import ProyectosModificarEtapa from './ProyectosModificarEtapa'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import Select from 'react-select'

class ProyectosModificar extends React.Component {
    botonAtras = () => {
        history.goBack()
    }
    state = {
        etapas: [{
            nombre: 'Etapa 1'
        }, {
            nombre: 'Etapa 2'
        }, {
            nombre: 'Etapa 3'
        }, {
            nombre: 'Etapa 4'
        }],
        yacimientoList: [],
        yacimientoSelect: [{ nombre: 'Hola' }],
    }
    yacimientoNuevo = (e) => {
        const yacimientoSelect = e
        this.setState({ yacimientoSelect })
    }
    render() {
        return (
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Modificar Proyecto</h1>

                <div className="form-nuevo-emp">

                    <div className="form-nuevo-emp">
                        <h1 className='Seleccion-estapas'>Etapas</h1>
                        <div className='etapas-proyecto'>
                            <div className='etapas-lista-proyecto'>
                                {this.state.etapas.map((etapa, index) => {
                                    return <ProyectosModificarEtapa key={index} nombre={etapa.nombre} />
                                })}
                            </div>
                        </div>
                    </div>

                </div>
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.registrar_boton} className='botones-nuevo'>Enviar</Button>
                </div>
            </div>
        )
    }
}

export default ProyectosModificar