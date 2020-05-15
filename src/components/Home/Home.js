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

                {/* CARD ROW */}

                <div className="container" style={{ marginTop: "50px" }}>
                    <div className="row col-md-12" style={{ justifyContent: "space-between" }}>
                        <div class="card text-white bg-primary mb-3" style={{ maxWidth: "20rem", borderRadius: "10px", border: 0 }}>
                            <div class="card-header">CREATE YOUR POLLS</div>
                            <div class="card-body">
                                {/* <h4 class="card-title">Primary card title</h4> */}
                                <p class="card-text">
                                    Create a voting poll and have people vote on it for fun or campaign.</p>
                            </div>
                        </div>

                        <div class="card border-primary mb-3" style={{ maxWidth: "20rem", borderRadius: "10px" }}>
                            <div class="card-header">VOTE ON POLLS</div>
                            <div class="card-body">
                                {/* <h4 class="card-title">Primary card title</h4> */}
                                <p class="card-text">Pick out a poll you're particular on, vote on it and see your votes count!.</p>
                            </div>
                        </div>

                        <div class="card text-white bg-dark mb-3" style={{ maxWidth: "20rem", borderRadius: "10px", border: 0 }}>
                            <div class="card-header">VIEW VOTE METRICS</div>
                            <div class="card-body">
                                {/* <h4 class="card-title">Primary card title</h4> */}
                                <p class="card-text">View the metrics of your vote and watch how it plays out till it ends!.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
