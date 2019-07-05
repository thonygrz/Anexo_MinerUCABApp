import React from 'react'
import ProyectosNuevoFaseEmpleadosSelect from './ProyectosNuevoFaseEmpleadosSelect'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import Select from 'react-select'
import { getCargoF } from '../utils/api'
import { connect } from 'react-redux';

class ProyectosNuevoFaseEmpleados extends React.Component {
    botonAtras = () => {
        history.goBack()
    }
    state = {
        cargos: [],
        empleadosSelect: [],
        costo: '',
        lunesInicio: '',
        lunesFin: '',
        martesInicio: '',
        martesFin: '',
        miercolesInicio: '',
        miercolesFin: '',
        juevesInicio: '',
        juevesFin: '',
        viernesInicio: '',
        viernesFin: '',
    }

    getCargosFase = () => {
        getCargoF(this.props.location.state.fase, this.props.location.state.etapa, this.props.location.state.yacimiento)
            .then((res) => {
                const cargos = res.data
                this.setState({ cargos })
            })
            .then(() => {
                console.log(this.state.cargos)
            })
    }
    componentWillMount = () => {
        this.getCargosFase()
    }
    render() {
        return (
            <div className="nuevo-empleado content-container">

                <h1 className='emp-nuevo-titulo'>Seleccionar Empleados</h1>

                <div className="form-nuevo-emp">

                    <h1 className='Seleccion-estapas'>Cargos</h1>
                    <div className='etapas-proyecto'>
                        <div className='etapas-lista-proyecto'>
                            {this.state.cargos.map((cargo, index) => {
                                return <ProyectosNuevoFaseEmpleadosSelect key={index} nombre={cargo.nombre} yacimiento={this.props.location.state.yacimiento} etapa={this.props.location.state.etapa} fase={this.props.location.state.fase} cargo={cargo.fk_cargo} costo={cargo.costo} cantidad={cargo.cantidad} yan_min={this.props.location.state.yan_min} />
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
        history.push({
            pathname: `/proyectos/nuevo/fase/maquinaria/${this.props.location.state.fase}`,
            state: {
                yacimiento: this.props.location.state.yacimiento,
                etapa: this.props.location.state.etapa,
                fase: this.props.location.state.fase,
                yan_min: this.props.location.state.yan_min
            }
        })
    }
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(ProyectosNuevoFaseEmpleados)