import React, { Component } from 'react'
import { Link } from "react-router-dom"
export class Home extends Component {
    render() {
        return (
            <div>
                <div className="jumbotron" style={{ backgroundColor: "white" }}>
                    <h1 className="display-3">POLLÚR</h1>
                    <p className="lead" style={{ fontFamily: "Montserrat" }}>
                        If you don't vote, you lose the right to complain
                        </p>
                    <p className="lead" style={{ fontFamily: "Montserrat" }}>
                        -GEORGE CARLIN</p>

                    <hr className="my-4" />
                    <p className="lead">
                        <Link to="/login">
                            <button className="btn btn-primary btn-md" >VOTE <span role="img" aria-label="check">🗳</span></button>
                        </Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default Home
