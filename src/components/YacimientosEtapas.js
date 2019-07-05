import React from 'react'
import { history } from '../routers/AppRouter'
import EliminarModal from './EliminarModal'
import { MDBCloseIcon } from 'mdbreact'
import { getFasesE } from '../utils/api'

class YacimientosEtapas extends React.Component {
    state = {
        modalShow: false,
        fases: [],
        cantidad: 0,
    }
    getFasesList = () => {
        getFasesE(this.props.clave_e, this.props.clave_y)
            .then((res) => {
                const fases = res.data
                this.setState({ fases })
            })
            .then(() => {
                let cantidad = 0
                this.state.fases.forEach((f) => {
                    cantidad++
                })
                this.setState({ cantidad })
            })
            .then(() => {
                console.log(this.props.clave_e)
                console.log(this.props.clave_y)

                console.log(this.state.fases)
                console.log(this.state.cantidad)
                console.log(this.state.fases.length - this.state.cantidad)
                console.log(this.state.fases.length)
                console.log(this.state.fases[this.state.fases.length - this.state.cantidad])
            })
    }
    componentWillMount = () => {
        this.getFasesList()
    }
    render() {
        let modalClose = () => this.setState({ modalShow: false })
        return (
            <div className='etapa-caja' >
                <div className='etapa-titulo' onClick={this.etapa_fase}>
                    <p>{this.props.nombre}</p>
                </div>
                {this.props.tipo === 'modificar' && 
                    <div>
                        <MDBCloseIcon onClick={this.eliminar_boton} className="etapa-boton" />
                        <EliminarModal
                            show={this.state.modalShow}
                            onHide={modalClose}
                            eliminar='etapa'
                            nombre={this.props.nombre}
                            clave_eta={this.props.clave}
                        />
                    </div>
                }
            </div>
        )
    }
    etapa_fase = () => {
        this.props.tipo === 'modificar' ? 
            history.push({
                pathname: `/yacimientos/fases/modificar`,
                state: {
                    yacimiento: this.props.yacimiento,
                    nfases: this.state.cantidad,
                    fases: this.state.fases,
                    etapa: this.props.etapa
                }
            }) : 
            history.push({
                pathname: `/yacimientos/etapas/fases/${this.state.fases[this.state.fases.length - this.state.cantidad].clave}`,
                state: {
                    yacimiento: this.props.yacimiento,
                    nfases: this.state.cantidad,
                    fases: this.state.fases,
                    etapa: this.props.etapa
                }
            })
    }
    eliminar_boton = () => {
        this.setState({ modalShow: true })
    }
}

export default YacimientosEtapas