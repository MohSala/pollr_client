import React, { Component } from 'react'
import Navbar from "../components/Dashboard/Navbar"
import contactImage from "../assets/contact.svg"
import axios from "axios";
import loader from "../assets/loader.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
export class Contact extends Component {
    state = {
        message: "",
        error: false,
        errorMsg: ""
    }

    notify = (text) => toast.success(text);

    handleChange = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    };

    handleSubmit = async () => {
        this.setState({ loading: true })
        const userId = localStorage.getItem("userId");
        const { message } = this.state;
        const data = await axios.post("https://pollur-api-imdjxr5ywq-ez.a.run.app/message", { userId, message });
        if (data) {
            this.setState({ loading: false, message: "", error: false, errorMsg: "" })
            this.notify("Alright! Your message has been recorded successfully");
        }
        else {
            this.setState({
                error: true,
                errorMsg: "Sorry, we could not send your message at this point, please try again later"
            })
        }
    }

    render() {
        const { error, errorMsg } = this.state;
        return (
            <div>
                <Navbar name="Pllr" />
                {error &&
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Oh snap!</strong> {errorMsg}
                    </div>
                }
                <div className="container center">
                    <center>
                        <h4 style={{ fontFamily: "Montserrat", marginTop: "40px" }} > pllr</h4>
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
                                onClick={this.handleSubmit}
                                className="btn btn-primary">
                                {!this.state.loading ?
                                    <span role="img" aria-label="rocket">🚀</span> : <img alt='loading'
                                        src={loader} style={{ width: '23px' }} />}

                            </button>
                        </div>
                    </center>
                </div>
            </div>
        )
    }
}

export default Contact
