import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import HomePage from '../components/HomePage';

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                Component === HomePage ? (
                    <div>                  
                        <Component {...props} />
                    </div>
                ) : (
                        <div>
                            <Header />
                            <Component {...props} />
                        </div>
                    )
            ) : (
                    <Redirect to="/" />
                )
        )} />
    )

const mapStateToProps = (state) => ({
    // isAuthenticated: !!state.auth.user
    isAuthenticated: true
})

export default connect(mapStateToProps)(PrivateRoute)