import React from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import { Button } from 'react-bootstrap'
import Cliente from './Cliente'
import {getCliente} from '../utils/api';
import {getClientesNat} from '../utils/api';
import {getClientesJud} from '../utils/api';



class ClientesPage extends React.Component {
    
    constructor(props) {
        super(props);
      
        this.state = {
           clienteList: [],
           naturalList: [],
            juridicoList: [],
            natural: true
        };
    } 

    nuevoCliente = () => {
        history.push('/clientes/nuevo')
    }


    getNaturalList = () => {
        getClientesNat()
        .then((res) => {
           
                console.log(res);
                var naturalList = res.data;
                this.setState({ naturalList });
            
        })
        .then(() => {
            this.setState((prevState) => ({ clienteList: prevState.naturalList }))
        })
        .catch((err) => console.log(err));
    }

    getJuridicoList = () => {
        getClientesJud()
        .then((res) => {
           
                console.log(res);
                var juridicoList = res.data;
                this.setState({ juridicoList });
            
        })
        .then(() => {
            this.setState((prevState) => ({ clienteList: prevState.clienteList.concat(prevState.juridicoList)}))
        })
        .catch((err) => console.log(err));
    }

    componentWillMount = () => {

        this.getNaturalList();
        this.getJuridicoList();
    }

    render () {
        return (
            <div className='empleados content-container'>
                <Button onClick={this.nuevoCliente} className='boton-registrar-emp'>Registrar Cliente</Button>
                <div className='caja-botones-tipo-cliente'>
                    <Button onClick={() => this.setState({ natural: true })} disabled={this.state.natural} variant={this.state.natural ? 'secondary' : 'primary'} className='boton-registrar-emp'>Natural</Button>
                    <Button onClick={() => this.setState({ natural: false })} disabled={!this.state.natural} variant={!this.state.natural ? 'secondary' : 'primary'} className='boton-registrar-emp'>Jurídico</Button>
                </div>
                {this.state.natural && 
                    <div className='empleados-columnas'>
                        <div className='left empleados-lista'>
                            {this.state.naturalList.map((cliente, index) => {
                                return index % 2 === 0 && <Cliente key={cliente.clave} nombre={cliente.nombre} clave={cliente.clave} apellido={cliente.apellido} telefono={cliente.telefono} cedula={cliente.ci} fk_lugar={cliente.fk_lugar}/>
                            })}
                        </div>

                        <div className='right empleados-lista'>
                        {this.state.naturalList.map((cliente, index) => {
                                return index % 2 === 1 && <Cliente key={cliente.clave} nombre={cliente.nombre} clave={cliente.clave} apellido={cliente.apellido} telefono={cliente.telefono} cedula={cliente.ci} fk_lugar={cliente.fk_lugar}/>
                            })}
                        </div>   
                    </div>
                }
                {!this.state.natural &&
                    <div className='empleados-columnas'>
                        <div className='left empleados-lista'>
                            {this.state.juridicoList.map((cliente, index) => {
                                return index % 2 === 0 && <Cliente key={cliente.clave} nombre={cliente.nombre} clave={cliente.clave} telefono={cliente.telefono} rif={cliente.rif} fk_lugar={cliente.fk_lugar}/>
                            })}
                        </div>

                        <div className='right empleados-lista'>
                        {this.state.juridicoList.map((cliente, index) => {
                                return index % 2 === 1 && <Cliente key={cliente.clave} nombre={cliente.nombre} clave={cliente.clave} telefono={cliente.telefono} rif={cliente.rif} fk_lugar={cliente.fk_lugar}/>
                            })}
                        </div>
                    </div>
                }         
            </div>
        )
    }
} 

const mapStateToProps = (state) =>({
    clientes: state.clientes
})

export default connect(mapStateToProps)(ClientesPage)