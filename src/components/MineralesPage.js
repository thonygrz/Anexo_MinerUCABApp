import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import Mineral from './Mineral'
import {getMinerales} from '../utils/api';
import {getMetales} from '../utils/api';
import {getNoMetales} from '../utils/api';


class MineralesPage extends React.Component{
    constructor(props) {
        super(props);
      
        this.state = {
           mineralList: [],
            metal: true,
            mineralMetal: [],
            mineralNoMetal: []
        };
    }    

    nuevoMineral = () => {
        history.push('/minerales/nuevo')
    }

    // getMineralList = () => {
    //     getMinerales()
    //     .then((res) => {
    //         console.log(res);
    //         var mineralList = res.data;
    //         this.setState({ mineralList });
    //     })
    //     .then(() => {
    //         const mineralMetal = this.state.mineralList.filter((mineral, index) => !!mineral.dureza)
    //         const mineralNoMetal = this.state.mineralList.filter((mineral, index) => !!!mineral.dureza)
    //         this.setState({ mineralMetal, mineralNoMetal })
    //     })
    //     .catch((err) => console.log(err));
    // }

    getMetalList = () => {
        getMetales()
        .then((res) => {
            console.log(res);
            var mineralMetal = res.data;
            this.setState({ mineralMetal });
        })
        .catch((err) => console.log(err));
    }

    getNoMetalList = () => {
        getNoMetales()
        .then((res) => {
            console.log(res);
            var mineralNoMetal = res.data;
            this.setState({ mineralNoMetal });
        })
        .catch((err) => console.log(err));
    }

    componentWillMount = () => {
        // this.getMineralList()
        this.getMetalList()
        this.getNoMetalList()
    }

    render(){
        return(
            <div>
                <div className='minerales content-container'>
                    <Button onClick={ () => this.nuevoMineral()} className='boton-nuevo-min'>Nuevo Mineral</Button>
                    <div className='caja-botones-tipo-cliente'>
                        <Button onClick={() => this.setState({ metal: true })} disabled={this.state.metal} variant={this.state.metal ? 'secondary' : 'primary'} className='boton-registrar-emp'>Metal</Button>
                        <Button onClick={() => this.setState({ metal: false })} disabled={!this.state.metal} variant={!this.state.metal ? 'secondary' : 'primary'} className='boton-registrar-emp'>No Metal</Button>
                    </div>    

                    {this.state.metal &&
                        <div className='minerales-columnas'>
                            <div className='left minerales-lista'>
                                {this.state.mineralMetal.map((mineral, index) => {
                                    return index % 2 === 0 && <Mineral key={mineral.clave} nombre={mineral.nombre} clave={mineral.clave} descripcion={mineral.descripcion} dureza={mineral.dureza} maleabilidad={mineral.maleabilidad} tipo='metal' getMin={this.getMineralList}/>
                                })}
                            </div>
        
                            <div className='right minerales-lista'>
                                {this.state.mineralMetal.map((mineral, index) => {
                                    return index % 2 === 1 && <Mineral key={mineral.clave} nombre={mineral.nombre} clave={mineral.clave} descripcion={mineral.descripcion} dureza={mineral.dureza} maleabilidad={mineral.maleabilidad} tipo='metal' getMin={this.getMineralList}/>
                                })}
                            </div>   
                        </div>
                    }    
                    {!this.state.metal &&
                        <div className='minerales-columnas'>
                            <div className='left minerales-lista'>
                                {this.state.mineralNoMetal.map((mineral, index) => {
                                    return index % 2 === 0 && <Mineral key={mineral.clave} nombre={mineral.nombre} clave={mineral.clave} descripcion={mineral.descripcion} tipo='metal' getMin={this.getMineralList}/>
                                })}
                            </div>
        
                            <div className='right minerales-lista'>
                                {this.state.mineralNoMetal.map((mineral, index) => {
                                    return index % 2 === 1 && <Mineral key={mineral.clave} nombre={mineral.nombre} clave={mineral.clave} descripcion={mineral.descripcion} tipo='metal' getMin={this.getMineralList}/>
                                })}
                            </div>   
                        </div>
                    }       
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    minerales: state.minerales
})

export default connect(mapStateToProps)(MineralesPage)