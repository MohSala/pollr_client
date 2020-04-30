import React, { Component } from 'react'
import loader from "../../assets/loader.svg";
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { addCandidate } from "../../actions/dashboard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundColors from "../Colors"
toast.configure()
export class PollDetail extends Component {
    state = {
        name: '',
        color: backgroundColors[0],
        candidates: [],
        party: '',
        errorMsg: '',
        error: false
    }

    notify = (text) => toast.success(text);

    handleChange = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    };

    handleSubmit = async () => {
        const { name, color, party } = this.state;
        const pollId = this.props.id;
        await this.props.addCandidate({ name, color, party, pollId });
        if (this.props.created) {
            this.notify("Your Candidate has been successfully added");
            // terrible hack but is necessary for now
            this.props.history.push('/login');
        }
        else {
            this.setState({
                error: true,
                errorMsg: this.props.errorMsg.data.message
            })
        }

    }

    renderColors() {
        return backgroundColors.map(color => {
            return (
                <button
                    key={color}
                    style={{
                        backgroundColor: color,
                        padding: "22px",
                        width: "14%",
                        alignSelf: "center"
                    }} onClick={() => this.setState({ color })}></button>
            );
        });
    }

    render() {
        let typeProp;
        if (this.props.type === "public") {
            typeProp = <span className="badge badge-success">Public</span>
        }
        else {
            typeProp = <span className="badge badge-primary">Private</span>
        }
        const { candidates } = this.state;
        return (
            <div>
                <div className="">
                    <h3
                        style={{
                            fontFamily: "Montserrat",
                            textAlign: "center",
                            marginTop: "10px"
                        }}>{this.props.name}</h3>

                    {typeProp}

                    <h3 style={{
                        fontFamily: "Montserrat",
                        fontWeight: "bold",
                        marginTop: "5px"
                    }}>CATEGORY:   <u>{this.props.category}</u> </h3>

                    <h3
                        style={{
                            fontFamily: "Montserrat",
                            fontWeight: "bolder",
                            textAlign: "center",
                            marginTop: "20px"
                        }}>CANDIDATES</h3>
                    <hr />
                    {
                        this.props.candidateDetails.length == 0
                            ?
                            <h5
                                style={{ textAlign: "center" }}>
                                None at the Moment</h5>
                            :
                            <div className="container">
                                <div className="row" style={{ justifyContent: "space-between" }}>
                                    {this.props.candidateDetails.map((item, i) =>
                                        <div key={i} >
                                            <button disabled style={{ backgroundColor: item.color, padding: "15px", borderRadius: "50%" }}></button>
                                            <h6>{item.name}</h6>
                                            <p style={{ fontSize: "10px" }}>PARTY:{!item.party ? "NONE" : item.party}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                    }
                    <hr />

                    {/* ADD CANDIDATE BUTTON */}
                    <div className="container">
                        <button type="button" className="btn btn-outline-success  btn-block" data-toggle="modal" data-target="#addCandidateModal">ADD A CANDIDATE</button>
                    </div>
                    {/* ADD CANDIDATE BUTTON */}

                    {/* DELETE BUTTON */}
                    <div className="container" style={{ marginTop: "10px" }}>
                        <button disabled type="button" className="btn btn-danger  btn-block" >DELETE THIS POLL</button>
                    </div>
                    {/* DELETE BUTTON */}
                </div>

                {/* ADD Candidate MODAL */}
                <div className="modal fade" id="addCandidateModal" tabIndex="-1" role="dialog" aria-hidden="true">

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">ADD A Candidate</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={text => this.handleChange("name", text)}
                                        placeholder="Naira Marley" />
                                </div>

                                <div className="form-group" style={{ justifyContent: "center" }}>
                                    <label>Pick The candidate's Color</label>
                                    <div>
                                        {this.renderColors()}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Party(Optional)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={text => this.handleChange("party", text)}
                                        placeholder="F.F.O" />
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button
                                    type="button"
                                    onClick={this.handleSubmit}
                                    className="btn"
                                    disabled={!this.state.name || !this.state.color}
                                    data-dismiss="modal"
                                    style={{ color: "white", backgroundColor: this.state.color }}
                                >
                                    {!this.props.loading ? "CREATE" : <img alt='loading'
                                        src={loader} style={{ width: '23px' }} />}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                {/* ADD Candidate MODAL */}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addCandidate: data => dispatch(addCandidate(data))

})

const mapStateToProps = state => ({
    loading: state.dash.loading,
    candidate: state.dash.candidate,
    fetched: state.dash.fetched,
    created: state.dash.created,
    error: state.dash.error,
    errorMsg: state.dash.errorMsg
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PollDetail));
