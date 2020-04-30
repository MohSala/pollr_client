import React, { Component } from 'react'
import { Link } from "react-router-dom"
export class Home extends Component {
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">POLLÚR!</h1>
                    <p className="lead" style={{ fontFamily: "Montserrat" }}>Pollúr is an application built to help you create a secure voting system for both personal and private polling!!</p>
                    <p className="lead" style={{ fontFamily: "Montserrat" }}>Simple to use and get real time analytics!</p>

                    <hr className="my-4" />
                    <p className="lead">
                        <Link to="/login">
                            <button className="btn btn-primary btn-md" >GET STARTED</button>
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default Home
