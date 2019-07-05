import { history } from '../routers/AppRouter'

export const login = (user, password) => ({
    type: 'LOGIN',
    user,
    password
})

export const startLogin = (user, password) => {
    return () => {
        history.push('/home')
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {   
        history.push('/')     
    }
}