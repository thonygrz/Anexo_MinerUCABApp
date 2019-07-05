import React from 'react'

class VentDet extends React.Component {
    componentWillMount = () => {
        console.log(this.props)
    }
    render() {
        return (
            <div className='compras-det-caja'>
                <p>{this.props.mineral}</p>
                <p>{this.props.presentacion}</p>
                <p>{this.props.cantidad} Kg</p>
                <p>{this.props.costo} Bs</p>
                <p>{this.props.fecha}</p>
            </div>
        )
    }
}

export default VentDet 