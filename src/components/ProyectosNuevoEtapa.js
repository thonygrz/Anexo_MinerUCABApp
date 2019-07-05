import React from 'react'
import { history } from '../routers/AppRouter'
import { getFasesE } from '../utils/api'

class ProyectoNuevoEtapas extends React.Component {
    state = {
        showFases: false,
        fases: []
    }
    getFasesList = () => {
        getFasesE(this.props.etapa, this.props.yacimiento)
            .then((res) => {
                const fases = res.data
                this.setState({ fases })
            })
    }
    componentWillMount = () => {
        this.getFasesList()
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
                                    <div className='fase-caja-proy' onClick={() => this.fase_detalle(fase.clave)} key={fase.clave}>
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
    fase_detalle = (clave) => {
        history.push({
            pathname: `/proyectos/nuevo/fase/empleados/${clave}`,
            state: {
                yacimiento: this.props.yacimiento,
                etapa: this.props.etapa,
                fase: clave,
                yan_min: this.props.yanMinSelect
            }
        })
    }
}

export default ProyectoNuevoEtapas