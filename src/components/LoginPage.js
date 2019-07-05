import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { login, startLogin } from '../actions/auth'

class LoginPage extends Component {
    state = {
        user: '',
        password: '',
        validated: false
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            this.setState({ validated: true })
            return
        }
        this.props.login(this.state.user, this.state.password)
        this.props.startLogin()
    }
    handleChangeUser = (e) => {
        this.setState({ user: e.target.value })
    }
    handleChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    render() {
        return (
            <div className='login'>
                <div className='login-box'>
                    <Form noValidate validated={this.state.validated} onSubmit={e => this.handleSubmit(e)} className='login-form'>
                        <Form.Group className='login-form-group' controlId='usuario'>
                            <Form.Label className='login-text'>Usuario</Form.Label>
                            <Form.Control
                                required
                                size='lg'
                                type='text'
                                placeholder='Usuario'
                                value={this.state.user}
                                onChange={this.handleChangeUser}
                            />
                            <Form.Control.Feedback className='login-error' type='invalid'>Usuario inválido.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='login-form-group' controlId='contraseña'>
                            <Form.Label className='login-text'>Contraseña</Form.Label>
                            <Form.Control
                                required
                                size='lg'
                                type='password'
                                placeholder='Contraseña'
                                value={this.state.password}
                                onChange={this.handleChangePassword}
                            />
                            <Form.Control.Feedback className='login-error' type='invalid'>Contraseña inválida.</Form.Control.Feedback>
                        </Form.Group>
                        <div className='login-button'>
                            <Button variant='success' type='submit' size='lg'>Iniciar Sesión</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (user, password) => dispatch(login(user, password)),
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)