import React from 'react'
import ProyectosModificarFaseMaquinariaSelect from './ProyectosModificarFaseMaquinariaSelect'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'

class ProyectosModificarFaseMaquinaria extends React.Component {
    botonAtras = () => {
        history.goBack()
    }
    state = {
        maquinarias: [{
            nombre: 'Maquinaria 1'
        }, {
            nombre: 'Maquinaria 2'
        }, {
            nombre: 'Maquinaria 3'
        }, {
            nombre: 'Maquinaria 4'
        }]
    }
    render() {
        return (
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Maquinaria</h1>

                <div className="form-nuevo-emp">

                    <h1 className='Seleccion-estapas'>Tipos de Maquinaria</h1>
                    <div className='etapas-proyecto'>
                        <div className='etapas-lista-proyecto'>
                            {this.state.maquinarias.map((maquinaria, index) => {
                                return <ProyectosModificarFaseMaquinariaSelect key={index} nombre={maquinaria.nombre} />
                            })}
                        </div>
                    </div>

                </div>
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Atrás</Button>
                    <Button onClick={this.siguiente} className='botones-nuevo'>Enviar</Button>
                </div>
            </div>
        )
    }
    siguiente = () => {
        history.push('/proyectos')
    }
}

export default ProyectosModificarFaseMaquinaria