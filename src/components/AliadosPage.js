import React from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import { Button } from 'react-bootstrap'
import Aliado from './Aliado'
import {getAliados} from '../utils/api';

class AliadosPage extends React.Component{

    constructor(props) {
        super(props);
      
        this.state = {
           aliadoList: [],
        };
    }  
    
    nuevoAliado = () => {
        history.push('/aliados/nuevo')
    }

    getAliadoList = () => {
        getAliados()
        .then((res) => {
            console.log('ya llegaron los aliados',res);
            var aliadoList = res.data;
            this.setState({ aliadoList });
        })
        .catch((err) => console.log(err));
    }

    componentWillMount() {
        this.getAliadoList();
    }
    
    render(){
        //console.log('Lugares en AliadosPage',this.props.lugares)
        return(
            <div>
                <div className="aliados content-container">
                    <Button onClick={this.nuevoAliado} className='boton-nuevo-ali'>Nuevo aliado</Button>
                        <div className='aliados-columnas'>
                            <div className='left aliados-lista'>
                                {this.state.aliadoList.map((aliado, index) => {
                                    return index % 2 === 0 && <Aliado key={aliado.clave} nombre={aliado.nombre} clave={aliado.clave} fecha_c={aliado.fecha_creacion} fk_lugar={aliado.fk_lugar}/>
                                })}
                            </div>

                            <div className='right aliados-lista'>
                                {this.state.aliadoList.map((aliado, index) => {
                                    return index % 2 === 1 && <Aliado key={aliado.clave} nombre={aliado.nombre} clave={aliado.clave} fecha_c={aliado.fecha_creacion} fk_lugar={aliado.fk_lugar}/>
                                })}
                            </div>   
                        </div>                     
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) =>({
    aliados: state.aliados,
    lugares: state.lugares
})

export default connect(mapStateToProps)(AliadosPage)