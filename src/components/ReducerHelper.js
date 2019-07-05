import React from 'react'
import {getLugares} from '../utils/api';

class ReducerHelper extends React.Component{
    constructor(props) {
        super(props);
      
        this.state = {
           lugaresList: [],
        };
    }    
   
    getLugaresList = () => {
        getLugares()
        .then((res) => {
            console.log(res);
            var lugaresList = res.data;
            this.setState({lugaresList})
        })
        .catch((err) => console.log(err));
        return lugaresList;
    }

    render(){
        return(<div></div>
        )
    }
}

export default ReducerHelper