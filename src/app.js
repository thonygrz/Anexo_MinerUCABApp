import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import LoadingPage from './components/LoadingPage'

// const { Client } = require('pg')

// const connectionData = {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'minerucab',
//     password: 'thonypost',
//     port: 5432,
//   }
//   const client = new Client(connectionData)

// client.connect()
// // client.query('SELECT * FROM privilegio')
// //     .then(response => {
// //         console.log(response.rows)
// //         client.end()
// //     })
// //     .catch(err => {
// //         client.end()
// //     })

const store = configureStore()

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

// let hasRendered = false
// const renderApp = () => {
//     if (!hasRendered) {
//         ReactDOM.render(jsx, document.getElementById('app'))
//         hasRendered = true
//     }
// }

ReactDOM.render(jsx, document.getElementById('app'))

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         store.dispatch(login(user.uid))
//         renderApp()
//         if (history.location.pathname === '/') {
//             history.push('/dashboard')
//         }
//     } else {
//         store.dispatch(logout())
//         renderApp()
//         history.push('/')
//     }
// })