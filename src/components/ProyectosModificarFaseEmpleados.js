import React from 'react'
import ProyectosModificarFaseEmpleadosSelect from './ProyectosModificarFaseEmpleadosSelect'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import Select from 'react-select'

class ProyectosModificarFaseEmpleados extends React.Component {
    botonAtras = () => {
        history.goBack()
    }
    state = {
        cargos: [{
            nombre: 'Cargo 1'
        }, {
            nombre: 'Cargo 2'
        }, {
            nombre: 'Cargo 3'
        }, {
            nombre: 'Cargo 4'
        }]
    }
    render() {
        return (
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Empleados</h1>

                <div className="form-nuevo-emp">

                    <h1 className='Seleccion-estapas'>Cargos</h1>
                    <div className='etapas-proyecto'>
                        <div className='etapas-lista-proyecto'>
                            {this.state.cargos.map((cargo, index) => {
                                return <ProyectosModificarFaseEmpleadosSelect key={index} nombre={cargo.nombre} />
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
        history.push('/proyectos/modificar/fase/maquinaria')
    }
}

export default ProyectosModificarFaseEmpleados