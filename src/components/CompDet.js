import React from 'react'

class CompDet extends React.Component{
    render(){
        return(
            <div className='compras-det-caja'>
                <p>{this.props.mineral}</p>
                <p>{this.props.cantidad} Kg</p>
                <p>{this.props.costo} Bs</p>
                <p>{this.props.fecha}</p>
            </div>
        )
    }
}

export default CompDet 