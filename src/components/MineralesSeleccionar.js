import React from 'react'
import { history } from '../routers/AppRouter'
import Select from 'react-select';

class MineralSeleccionar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tipoMineral: [
            {label: "Metal", value: 1},
            {label: "No Metal", value: 2}
            ]
        };
    }

    metal(){
        history.push('/minerales/nuevo/metal')
    }

    noMetal(){
        history.push('/minerales/nuevo/noMetal')
    }

    render(){
        return(
            <div className='container-seleccionar'>
                <div className='select-seleccionar'>
                    <Select 

                    placeholder='Selecciona el tipo de mineral'
                    options={this.state.tipoMineral}
                    onChange={this.state}/>             
                </div>
            </div>
        )
    }
}

export default MineralSeleccionar