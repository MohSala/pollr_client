import React, { Component } from 'react'
import Navbar from "../components/Dashboard/Navbar"
import contactImage from "../assets/contact.svg"

export class Contact extends Component {
    state = {
        message:""
    }

    handleChange = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    };

    render() {
        return (
            <div>
                <Navbar name="Pollúr" />
                <div className="container center">
                    <center>
                        <h4 style={{ fontFamily: "Montserrat", marginTop: "40px" }} > pollúr</h4>
                        <h3 style={{ fontFamily: "Montserrat", marginTop: "40px" }}>WE ARE SO EXCITED TO HEAR FROM YOU!</h3>
                        <p className="lead" style={{ fontFamily: "montserrat" }}>Thank you so much for using our product. Please reach out to us with your suggestions and we would surely hit you right back!</p>
                        <img src={contactImage} alt="contactus" style={{ maxHeight: "250px", maxWidth: "300px", marginTop: "60px" }} />
                        <div className="form-group col-sm-6" style={{ marginTop: "10px" }}>
                            <label style={{ float: "left" }}>MESSAGE</label>
                            <textarea
                                className="form-control" name="email"
                                onChange={text => this.handleChange("message", text)}
                                required
                                style={{ fontFamily: 'Montserrat', border: "2px solid black" }} />
                        </div>

                        <div>
                            <button 
                            type="button" 
                            disabled={!this.state.message}
                            className="btn btn-primary">SHOOT<span role="img" aria-label="rocket">🚀</span> </button>
                        </div>
                    </center>
                </div>
            </div>
        )
    }
}

export default Contact
