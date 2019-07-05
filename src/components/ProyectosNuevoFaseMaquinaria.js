import React from 'react'
import ProyectosNuevoFaseMaquinariaSelect from './ProyectosNuevoFaseMaquinariaSelect'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { getTipoMaquinariaF } from '../utils/api'

class ProyectosNuevoFaseMaquinaria extends React.Component {
    botonAtras = () => {
        history.goBack()
    }
    state = {
        tipoMaquinaria: []
    }
    getTMaquinariaFase = (fclave) => {
        getTipoMaquinariaF(fclave, this.props.location.state.etapa.clave, this.props.location.state.yacimiento.clave)
            .then((res) => {
                const tipoMaquinaria = res.data
                this.setState({ tipoMaquinaria })
            })
            .then(() => {
                console.log('tipoMaquinaria', this.state.tipoMaquinaria)
            })
    }
    render() {
        return (
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Seleccionar Maquinaria</h1>

                <div className="form-nuevo-emp">

                    <h1 className='Seleccion-estapas'>Tipos de Maquinaria</h1>
                    <div className='etapas-proyecto'>
                        <div className='etapas-lista-proyecto'>
                            {this.state.tipoMaquinaria.map((maquinaria, index) => {
                                return <ProyectosNuevoFaseMaquinariaSelect key={index} nombre={maquinaria.nombre} yacimiento={this.props.location.state.yacimiento} etapa={this.props.location.state.etapa} fase={this.props.location.state.fase} cargo={maquinaria.fk_tipomaquinaria} costo={maquinaria.costo} cantidad={maquinaria.cantidad} yan_min={this.props.location.state.yan_min} />
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

export default ProyectosNuevoFaseMaquinaria