import React from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import { Button } from 'react-bootstrap'
import Yacimiento from './Yacimiento'
import { getYacimientos } from '../utils/api'

class YacimientosPage extends React.Component {
    state = {
        yacimientosList: [],
    }
    
    nuevoYacimiento = () => {
        history.push('/yacimientos/nuevo')
    }

    getYacimientosList = () => {
        getYacimientos()
            .then((res) => {
                const yacimientosList = res.data
                this.setState({ yacimientosList })
            })
    }
    
    componentWillMount = () => {
        this.getYacimientosList()
    }

    render() {
        return (
            <div className='yacimientos content-container'>
                <Button onClick={this.nuevoYacimiento} className='boton-nuevo-yac'>Nuevo Yacimiento</Button>
                <div className='yacimientos-columnas'>
                    <div className='left yacimientos-lista'>
                        {this.state.yacimientosList.map((yacimiento, index) => {
                            return index % 2 === 0 && <Yacimiento key={yacimiento.clave} nombre={yacimiento.nombre} clave={yacimiento.clave} />
                        })}
                    </div>

                    <div className='right yacimientos-lista'>
                        {this.state.yacimientosList.map((yacimiento, index) => {
                            return index % 2 === 1 && <Yacimiento key={yacimiento.clave} nombre={yacimiento.nombre} clave={yacimiento.clave} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    yacimientos: state.yacimientos
})

export default connect(mapStateToProps)(YacimientosPage)