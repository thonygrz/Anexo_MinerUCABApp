import React from 'react' 
import CompDet from './CompDet' 
import { Button } from 'react-bootstrap'
import { history } from '../routers/AppRouter'
import { getDetCompra, getCompras, getAli_MinSinFK, getNoMetales, getMetales } from '../utils/api'
import moment from 'moment'

const pruebaDetalleC = [{
    clave: '1',
    fk_compra: '1',
    fk_ali_min: '1',
    cantidad: 4,
    costo: 3,
    fk_inventario: '1'
}]

const pruebaAliMin = [{
    clave: '1',
    fk_aliado: '1',
    fk_mineral: '1',
    costo: 3
}]

const pruebaMineral = [{
    clave: '1',
    nombre: 'Carbón'
}]

const pruebaCompras = [{
    clave: '1',
    fk_aliado: '1',
    monto_total: 10,
    fecha: '20-10-2020'
}]

class ComprasDetalles extends React.Component {
    state = {
        clave: this.props.match.params.id,
        compra_det: [{
            mineral: '',
            cantidad: '',
            costo: '',
            fecha: '',
        }], 
        detCompraList: [],
        comprasList: [],
        aliMinList: [],
        noMetalList: [],
        metalList: [],
        mineralList: [],
    }

    getDetComprasList = () => {
        getDetCompra(this.props.match.params.id)
            .then((res) => {
                const detCompraList = res.data
                this.setState({ detCompraList })
            })
            .then(() => {
                const compra_det = []
                if (this.state.detCompraList.length > 0) {
                    console.log(this.state.detCompraList)
                    const compra = this.state.comprasList.find((c) => c.clave === parseInt(this.props.match.params.id, 10))
                    console.log(compra)
                    this.state.detCompraList.forEach((c) => {
                        console.log(this.state.aliMinList)
                        const mineralCod = this.state.aliMinList.find((a) => a.clave === c.fk_alimin)
                        console.log(mineralCod)
                        let mineral = ''
                        if (mineralCod.fk_metal) {
                            mineral = this.state.mineralList.find((m) => m.clave === mineralCod.fk_metal).nombre
                        } else {
                            mineral = this.state.mineralList.find((m) => m.clave === mineralCod.fk_nometal).nombre
                        }
                        compra_det.push({
                            mineral,
                            cantidad: c.cantidad,
                            costo: c.costo_ind,
                            fecha: moment(compra.fecha).format('DD/MM/YYYY')
                        })
                    })
                }
                this.setState({ compra_det })
            })
    }

    getComprasList = () => {
        getCompras()
            .then((res) => {
                const comprasList = res.data
                this.setState({ comprasList })
            })
            .then(() => {
                this.getDetComprasList()
            })
    }

    getAli_MinList = () => {
        getAli_MinSinFK()
            .then((res) => {
                console.log('ya llegaron los aliados_min', res);
                var aliMinList = res.data;
                this.setState({ aliMinList });
            })
            .then(() => {
                this.getComprasList()
            })
    }

    getNoMetalList = () => {
        getNoMetales()
            .then((res) => {
                console.log(res)
                const noMetalList = res.data
                this.setState({ noMetalList })
            })
            .then(() => {
                this.setState((prevState) => ({ mineralList: prevState.mineralList.concat(prevState.noMetalList) }))
            })
            .then(() => {
                this.getAli_MinList()
            })
            .catch((err) => console.log(err))
    }

    getMetalList = () => {
        getMetales()
            .then((res) => {
                console.log(res)
                const metalList = res.data
                this.setState({ metalList })
            })
            .then(() => {
                this.setState((prevState) => ({ mineralList: prevState.metalList }))
            })
            .then(() => {
                this.getNoMetalList()
            })
            .catch((err) => console.log(err))
    }

    componentWillMount = () => {
        this.getMetalList()
    }
    render() {
        return (
            <div className='compras content-container'>
                <h1 className='compras-det-titulo'>Detalle de Compra {this.state.clave}</h1>
                {this.state.compra_det.length > 0 &&
                    this.state.compra_det.map((c, index) => {
                        return <CompDet key={index} mineral={c.mineral} cantidad={c.cantidad} costo={c.costo} fecha={c.fecha}></CompDet>
                    })
                }
                <div className='caja-botones-nuevo'>
                    <Button onClick={this.atras_boton} variant="secondary" className='botones-nuevo'>Volver</Button>
                </div>
            </div>
        )
    }

    atras_boton = () => {
        history.goBack()
    }
}

export default ComprasDetalles