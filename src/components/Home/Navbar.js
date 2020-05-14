import React, { Component } from 'react'
import { Link } from "react-router-dom"
export class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                    <Link to='/dashboard' className="navbar-brand">POLLÚR</Link>
                </nav>
            </div>
        )
    }
}

export default Navbar
