import React from 'react'
//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
//import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import BootstrapTable from 'react-bootstrap-table-next'; 
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import filterFactory from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';

class Tabla extends React.Component {
    state = {
        selectRowProp: {
            mode: 'checkbox',
            clickToSelect: true,
            clickToEdit: true
        }
    }
    render() {
        return (
            <div className='caja-tabla'>
                <BootstrapTable 
                    keyField="id"
                    data={this.props.data} 
                    columns={this.props.columns}
                    filter={filterFactory()}
                    selectRow={this.state.selectRowProp} 
                    cellEdit={cellEditFactory({
                        mode: 'click',
                        blurToSave: true
                    })}
                    noDataIndication={'No hay cargos'}
                    bootstrap4
                    className='table'
                />
            </div>
        )
    }
}

export default Tabla