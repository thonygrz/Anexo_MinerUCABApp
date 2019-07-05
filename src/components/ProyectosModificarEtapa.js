import React from 'react'
import { history } from '../routers/AppRouter'

class ProyectoModificarEtapas extends React.Component {
    state = {
        showFases: false,
        fases: [{
            nombre: 'Fase 1'
        }, {
            nombre: 'Fase 2'
        }, {
            nombre: 'Fase 3'
        }, {
            nombre: 'Fase 4'
        }]
    }
    render() {
        return (
            <div>
                <div className='etapa-caja-proy' onClick={this.etapa_fase}>
                    <p>{this.props.nombre}</p>
                </div>
                {this.state.showFases &&
                    <div className='proy-fases-columnas'>
                        <div className='left yacimientos-lista'>
                            {this.state.fases.map((fase, index) => {
                                return index % 2 === 0 && (
                                    <div className='fase-caja-proy' onClick={this.fase_detalle}>
                                        <p>{fase.nombre}</p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='right yacimientos-lista'>
                            {this.state.fases.map((fase, index) => {
                                return index % 2 === 1 && (
                                    <div className='fase-caja-proy' onClick={this.fase_detalle}>
                                        <p>{fase.nombre}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        )
    }
    etapa_fase = () => {
        this.setState(({ showFases }) => ({ showFases: !showFases }))
    }
    fase_detalle = () => {
        history.push('/proyectos/modificar/fase/empleados')
    }
}

export default ProyectoModificarEtapas