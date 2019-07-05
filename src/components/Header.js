import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, startLogout } from '../actions/auth'
import { Image } from 'react-bootstrap'
import logoutImagen from '../../img/logout.png'
import logoImagen from '../../img/logo_negro.png'


class Header extends Component {
    handleLogout = () => {
        this.props.startLogout()
        this.props.logout()
    }
    render() {
        return (
            <header className="header-content-container">
                <div >
                    <div className="header-top">
                        <Image src={logoImagen} className="logo" ></Image>
                        <div className="user-box">
                            <p>{this.props.nombre}</p>
                        </div>
                        <div onClick={this.handleLogout} className="logout">
                            <button className="button-logout">Cerrar Sesión</button>
                            <Image className="image-logout" src={logoutImagen} />
                        </div>
                    </div>
                    <div className="header__content">
                        <NavLink className="header-link" to="/home" activeClassName="is-active"><h1>Inicio</h1></NavLink>
                        <NavLink className="header-link" to="/yacimientos" activeClassName="is-active"><h1>Yacimientos</h1></NavLink>
                        <NavLink className="header-link" to="/aliados" activeClassName="is-active"><h1>Aliados</h1></NavLink>
                        <NavLink className="header-link" to="/empleados" activeClassName="is-active"><h1>Empleados</h1></NavLink>
                        <NavLink className="header-link" to="/clientes" activeClassName="is-active"><h1>Clientes</h1></NavLink>
                        <NavLink className="header-link" to="/compras" activeClassName="is-active"><h1>Compras</h1></NavLink>
                        <NavLink className="header-link" to="/ventas" activeClassName="is-active"><h1>Ventas</h1></NavLink>
                        <NavLink className="header-link" to="/proyectos" activeClassName="is-active"><h1>Proyectos</h1></NavLink>
                        <NavLink className="header-link" to="/estatus" activeClassName="is-active"><h1>Estatus</h1></NavLink>
                        <NavLink className="header-link" to="/minerales" activeClassName="is-active"><h1>Minerales</h1></NavLink>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
    nombre: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)