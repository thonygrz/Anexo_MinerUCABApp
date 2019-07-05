import React from 'react'
import $ from 'jquery'
import 'datatables.net-dt/css/jquery.dataTables.css'
require('datatables.net')
require('datatables.net-select')
require('datatables.net-editor')
import { connect } from 'react-redux'
import { seleccionarCargos } from '../actions/cargos' 
import { seleccionarMaquinaria } from '../actions/maquinas' 
import { Button } from 'react-bootstrap'

class Tabla extends React.Component {
    constructor(props) {
        super(props)
        this.datatable = null
    }
    componentDidMount() {
        console.log(this.props.data)
        console.log(this.props.columns)
        $(document).ready(() => {
            this.datatable = $(`#${this.props.elemento}`).DataTable({
                data: this.props.data,
                columns: this.props.columns,
                ...this.props.options,
                columnDefs: [{
                    targets: [0],
                    visible: false
                }, {
                    targets: [2, 3],
                    orderable: false
                }],
                select: {
                    style: 'multi'
                },
                language: {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ningún dato disponible en esta tabla",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "Último",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    },
                    select: {
                        rows: {
                            _: ". %d filas seleccionadas",
                            0: ". Haz click en una fila para seleccionarla",
                            1: ". 1 fila seleccionada"
                        }
                    }
                }
            })
            $(`#button-${this.props.elemento}`).click(() => {
                const data1 = this.datatable.$('#cant').serialize()
                const dataArray1 = data1.split('&').map((d) => {
                    if(d.replace('cantidad=', '').match(/^\d*$/)) {
                        return parseInt(d.replace('cantidad=', ''), 10)
                    } else {
                        alert('Dato Incorrecto')
                        return 0
                    }
                })
                const data2 = this.datatable.$('#cost').serialize()
                const dataArray2 = data2.split('&').map((d) => {
                    if (d.replace('costo=', '').match(/^\d*$/)) {
                        return parseInt(d.replace('costo=', ''), 10)
                    } else {
                        alert('Dato Incorrecto')
                        return 0
                    }
                })
                console.log(data1)
                console.log(dataArray1)
                console.log(data2)
                console.log(dataArray2)
                console.log(this.props.data)
                console.log(this.props.data1)
                console.log(this.props.data2)

                if (this.props.elemento === 'cargos') {
                    this.props.data.forEach((data, index) => {
                        this.props.seleccionarCargos(data.clave, dataArray1[index], dataArray2[index])
                    })
                }

                if (this.props.elemento === 'maquinaria') {
                    this.props.data.forEach((data, index) => {
                        this.props.seleccionarMaquinaria(data.clave, dataArray1[index], dataArray2[index])
                    })
                }
                
            })
        })
    }
    componentWillUnmount() {
        this.datatable.destroy(true);
    }
    render() {
        return (
            <div className='datatable'>
                <table id={this.props.elemento} className='hover row-border' />
                {console.log(this.props.tipo)}
                {this.props.tipo === 'modificar' || this.props.tipo === 'crear' && 
                    <div className='caja-boton-submit'>
                        <Button id={`button-${this.props.elemento}`} className='boton-submit'>Guardar cambios de la tabla {this.props.elemento}</Button>
                    </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    seleccionarCargos: (clave, cantidad, costo) => dispatch(seleccionarCargos(clave, cantidad, costo)),
    seleccionarMaquinaria: (clave, cantidad, costo) => dispatch(seleccionarMaquinaria(clave, cantidad, costo))
})

export default connect(undefined, mapDispatchToProps)(Tabla)