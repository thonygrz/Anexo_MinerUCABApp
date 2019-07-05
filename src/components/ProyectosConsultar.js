import React from 'react'
import ProyectosConsultarEtapa from './ProyectosConsultarEtapa'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import {getEtapas} from '../utils/api';


class ProyectosConsultar extends React.Component {
    botonAtras = () => {
        history.goBack()
    }
    constructor(props) {
        super(props);
      
        this.state = {
           etapasList: [],
        };
    } 

    getEtapasList = () => {
        console.log(this.props.match.params.id)        
        getEtapas(parseInt(this.props.match.params.id, 10))
        .then((res) => {
            console.log('ya llegaron las etapas de los proyectos',res);
            var etapasList = res.data;
            this.setState({ etapasList });
        })
        .catch((err) => console.log(err));
    }

    componentWillMount() {
        this.getEtapasList();
    }
    render() {
        return (
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Proyecto</h1>

                <div className="form-nuevo-emp">
                    <div className="form-nuevo-emp">
                        <h1 className='Seleccion-estapas'>Etapas</h1>
                        <div className='etapas-proyecto'>
                            <div className='etapas-lista-proyecto'>
                                {this.state.etapasList.map((etapa, index) => {
                                    return <ProyectosConsultarEtapa key={index} clave={etapa.clave} nombre={etapa.nombre} />
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

export default ProyectosConsultar