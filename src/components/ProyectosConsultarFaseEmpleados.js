import React from 'react'
import ProyectosConsultarFaseEmpleadosSelect from './ProyectosConsultarFaseEmpleadosSelect'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import {getFasesCargos} from '../utils/api';


class ProyectosConsultarFaseEmpleados extends React.Component {
    botonAtras = () => {
        history.goBack()
    }
    constructor(props) {
        super(props);
      
        this.state = {
           cargosList: [],
        };
    } 

    getCargosList = () => {
        getFasesCargos(parseInt(this.props.match.params.id, 10))
        .then((res) => {
            console.log('ya llegaron los cargos las fases las etapas del proyectos',res);
            var cargosList = res.data;
            console.log(cargosList)
            this.setState({ cargosList });
        })
        .catch((err) => console.log(err));
    }

    componentWillMount() {
        this.getCargosList();
    }
    render() {
        return (
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Empleados</h1>

                <div className="form-nuevo-emp">

                    <h1 className='Seleccion-estapas'>Cargos</h1>
                    <div className='etapas-proyecto'>
                        <div className='etapas-lista-proyecto'>
                            {this.state.cargosList.map((cargo, index) => {
                                return <ProyectosConsultarFaseEmpleadosSelect key={index} nombre={cargo.nombre} clave={cargo.clave} fk_cargo={cargo.fk_cargo}/>
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
        history.push('/proyectos/consultar/fase/maquinaria')
    }
}

export default ProyectosConsultarFaseEmpleados