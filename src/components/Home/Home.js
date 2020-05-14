import React, { Component } from 'react'
import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Icon from "../../assets/hometing.svg"
export class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="row">
                    <div className="jumbotron col-md-6" style={{ backgroundColor: "white" }}>
                        <h1 className="display-3" style={{
                            fontFamily: "Montserrat",
                            fontStyle: "italics",
                            textDecoration: "underline",
                            textDecorationColor: "darkgreen"
                        }}>POLLÚR</h1>
                        <h3 className="display-4" style={{ fontFamily: "Montserrat", fontStyle: "italics" }}>PUBLIC AND PRIVATE POLLING MADE EASY</h3>
                        <p className="lead" style={{ fontFamily: "Montserrat", fontStyle: "italics" }}>
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

                    <div className="col-md-6">
                        <img src={Icon} style={{ width: "100%", height: "auto" }} alt="iconimage" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
