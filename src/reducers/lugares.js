import Helper from '../components/ReducerHelper'

let lugares = [{ 
    id: '1',
    nombre: 'Caracas',
    tipo: 'Estado',
    fk_lugar: null,
    label: 'Caracas',
    value: 'caracas'
}, {
    id: '2',
    nombre: 'Baruta',
    tipo: 'Municipio',
    fk_lugar: '1',
    label: 'Baruta',
    value: 'baruta'
}, { 
    id: '3',
    nombre: 'Minas',
    tipo: 'Parroquia',
    fk_lugar: '2',
    label: 'Minas',
    value: 'minas'
}, {
    id: '4',
    nombre: 'Amazonas',
    tipo: 'Estado',
    fk_lugar: null,
    label: 'Amazonas',
    value: 'amazonas'
}, { 
    id: '5',
    nombre: 'Vargas',
    tipo: 'Estado',
    fk_lugar: null,
    label: 'Vargas',
    value: 'vargas'
}, {
    id: '6',
    nombre: 'Chacao',
    tipo: 'Municipio',
    fk_lugar: '4',
    label: 'Chacao',
    value: 'chacao'
}, { 
    id: '7',
    nombre: 'San Juan',
    tipo: 'Parroquia',
    fk_lugar: '6',
    label: 'San Juan',
    value: 'san_juan'
}]

/*
const getLugarList = () => {
    console.log('getlugarList')
    lugares = ''
    getLugares()
    .then((res) => {
        console.log(res);
        lugares = res.data;
        console.log('getLugares',lugares)
    })
    .catch((err) => console.log(err));
}

getLugarList();*/
const guardarLugares = (lug) =>{
    console.log('guardando lugares')
   // lugares = Helper.getLugaresList();
    console.log('lugares en el reducer',lugares)
}

guardarLugares();

export default (state = lugares, action) => {
    switch (action.type) {
        case 'GUARDAR_LUGARES':
            return action.lugares
        default:
            return state
    }
}