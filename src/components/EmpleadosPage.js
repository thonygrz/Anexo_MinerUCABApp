import React from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import { Button } from 'react-bootstrap'
import Empleado from './Empleado'
import {getEmpleados} from '../utils/api'

class EmpleadosPage extends React.Component {

    constructor(props) {
        super(props);
      
        this.state = {
           empleadosList: [],
        };
    } 


    nuevoEmpleado = () => {
        history.push('/empleados/nuevo')
    }

    getEmpleadosList = () =>{
        getEmpleados()
        .then((res) => {
            console.log('EMPLEADOS RECIBIDOS: ',res.data)
            let empleadosList = res.data
            this.setState({empleadosList})
        })
        .catch((err) => console.log(err))
    }

    componentWillMount = () => {
        this.getEmpleadosList()
    }


    render () {
        return (
            <div className='empleados content-container'>
                <Button onClick={this.nuevoEmpleado} className='boton-registrar-emp'>Registrar Empleado</Button>
                <div className='empleados-columnas'>
                    <div className='left empleados-lista'>
                        {this.state.empleadosList.map((empleado, index) => {
                            return index % 2 === 0 && <Empleado key={empleado.clave} clave={empleado.clave} nombre={empleado.nombre} apellido={empleado.apellido} cedula={empleado.cedula} sexo={empleado.sexo} telefono={empleado.telefono} fecha_nac={empleado.fecha_nac} fecha_cont={empleado.fecha_contratado} fk_cargo={empleado.fk_cargo} fk_estatus={empleado.fk_status} fk_rol={empleado.fk_rol} fk_lugar={empleado.fk_lugar} />
                        })}
                    </div>

                    <div className='right empleados-lista'>
                        {this.state.empleadosList.map((empleado, index) => {
                            return index % 2 === 1 && <Empleado key={empleado.clave} clave={empleado.clave} nombre={empleado.nombre} apellido={empleado.apellido} cedula={empleado.cedula} sexo={empleado.sexo} telefono={empleado.telefono} fecha_nac={empleado.fecha_nac} fecha_cont={empleado.fecha_contratado} fk_cargo={empleado.fk_cargo} fk_estatus={empleado.fk_status} fk_rol={empleado.fk_rol} fk_lugar={empleado.fk_lugar}/>
                        })}
                    </div>   
                </div>         
            </div>
        )
    }
} 

const mapStateToProps = (state) =>({
    empleados: state.empleados
})

export default connect(mapStateToProps)(EmpleadosPage)