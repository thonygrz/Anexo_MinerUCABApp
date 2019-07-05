import React from 'react'
import { Link } from 'react-router-dom'


const NotFoundPage = () => (
    <div className="notfound">
        <h1 className="notfound-text">404</h1>
        <Link className="notfound-link" to="/home"><h1>Home</h1></Link>
    </div>
)

export default NotFoundPage