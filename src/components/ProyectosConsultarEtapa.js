import React from 'react'
import { history } from '../routers/AppRouter'
import {getFases} from '../utils/api';


class ProyectosConsultarEtapas extends React.Component {

    constructor(props) {
        super(props);
      
        this.state = {
           fasesList: [],
        };
    } 

    getFasesList = () => {
        console.log(this.props.clave)        
        getFases(parseInt(this.props.clave, 10))
        .then((res) => {
            console.log('ya llegaron las fases las etapas del proyectos',res);
            var fasesList = res.data;
            console.log(fasesList)
            this.setState({ fasesList });
        })
        .catch((err) => console.log(err));
    }

    componentWillMount() {
        this.getFasesList();
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
                            {this.state.fasesList.map((fase, index) => {
                                return index % 2 === 0 && (
                                    <div className='fase-caja-proy' onClick={() => this.fase_detalle(fase.clave)}>
                                        <p>{fase.nombre}</p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='right yacimientos-lista'>
                            {this.state.fasesList.map((fase, index) => {
                                return index % 2 === 1 && (
                                    <div className='fase-caja-proy' onClick={() => this.fase_detalle(fase.clave)}>
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
        history.push(`/proyectos/consultar/fase/empleados/${clave}`)
    }
}

export default ProyectosConsultarEtapas