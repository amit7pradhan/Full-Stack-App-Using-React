import React from 'react'
import { Link } from 'react-router-dom'

export default function Navabar() {
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Employee Managment</Link>

                </div>
                <Link className="btn btn-outline-light" to="/adduser">AddUser</Link>
            </nav>

        </div>
    )
}
