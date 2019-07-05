import React from 'react'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { connect } from 'react-redux'
import Proyecto from './Proyecto'
import {getProyectos} from '../utils/api';


class ProyectosPage extends React.Component{
    
    constructor(props) {
        super(props);
      
        this.state = {
           proyectoslist: [],
        };
    }  
    
    nuevaExplotacion = () => {
        history.push('/proyectos/nuevo')
    }

    getProyectosList = () => {
        getProyectos()
        .then((res) => {
            console.log('ya llegaron los proyectos',res);
            var proyectoslist = res.data;
            this.setState({ proyectoslist });
        })
        .catch((err) => console.log(err));
    }

    componentWillMount() {
        this.getProyectosList();
    }

    render(){
        return(
            <div className="proyectos content-container">
                <Button onClick={this.nuevaExplotacion} className='boton-registrar-pro'>Crear Explotacion</Button>
                <div className='proyectos-columnas'>
                    <div className='left proyectos-lista'>
                        {this.state.proyectoslist.map((proyecto, index) => {
                            console.log(proyecto.clave)
                            return index % 2 === 0 && <Proyecto key={proyecto.clave} clave={proyecto.clave} nombre={proyecto.nombre}  />
                        })}
                    </div>

                    <div className='right proyectos-lista'>
                        {this.state.proyectoslist.map((proyecto, index) => {
                            return index % 2 === 1 && <Proyecto key={proyecto.clave} clave={proyecto.clave} nombre={proyecto.nombre}  />
                        })}
                    </div>   
                </div>  

            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    proyectos: state.proyectos
})

export default connect(mapStateToProps)(ProyectosPage)