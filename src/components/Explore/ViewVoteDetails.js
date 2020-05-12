import React, { Component } from 'react'
import Chart from "./Chart"
import loader from "../../assets/loader.svg";
import { addVote } from "../../actions/dashboard";
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


export class ViewVoteDetails extends Component {

    state = {
        userFullName: localStorage.getItem("name").toLowerCase(),
        name: "",
        pollId: "",
        candidateId: "",
        candidateName: "",
    }


    notify = (text) => toast.success(text);

    handleClick = async (e, data) => {
        // access to e.target here
        return this.setState({
            pollId: data.pollId,
            candidateId: data._id,
            candidateName: data.name
        })

    }

    renderVotedCandidate(candidate, candidates) {
        // candidateObject and candidateDetails
        // youre checking candidate id.id
        let cda;
        for (let cd of candidates) {
            if (candidate.candidateId._id === cd._id) {
                cda = cd
            }
        }
        return (
            <div className="container" style={{ position: "relative" }}>
                <div className="center">
                    <button disabled className="btn btn-block" style={{
                        color: "white",
                        backgroundColor: cda.color,
                        // position: "absolute"
                    }}>You Voted for {cda.name}</button>
                    <Chart keys={Object.keys(this.props.chartValues[0])} values={Object.values(this.props.chartValues[0])} />
                </div>

                {/* <div style={{ display: "flex-end" }}>
                    
                </div> */}
            </div>
        )
    }

    handleChange = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    };

    handleSubmit = async () => {
        const { pollId, candidateId } = this.state;
        const userId = localStorage.getItem("userId");
        await this.props.addVote({ pollId, candidateId, userId });
        if (this.props.created) {
            this.notify("Your Vote has been successfully recorded");
            this.props.history.push("/voteSuccess")
        }
        else {
            this.setState({
                error: true,
                errorMsg: this.props.errorMsg.data.message
            })
        }
    }

    render() {
        const { candidateDetails, candidateObject } = this.props
        return (
            <div>
                {
                    this.props.candidateDetails.length === 0
                        ?

                        <h5 style={{ textAlign: "center" }}>None at the moment</h5>
                        :
                        <div className="container">
                            {
                                this.props.candidateObject ?
                                    <div>
                                        {this.renderVotedCandidate(candidateObject, candidateDetails)}
                                    </div>
                                    :
                                    <div>
                                        <h1>DESCRIPTION</h1>
                                        <p>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?</p>
                                        <div className="row" style={{ display: "flex" }}>
                                            {
                                                this.props.candidateDetails.map((item, i) =>
                                                    <div key={i} className="card border-primary mb-2" style={{ maxWidth: '20rem', margin: "5px", borderRadius: "10px" }}>
                                                        <div className="card-body" style={{ alignItems: "center" }}>
                                                            <h4 className="card-title" >{item.name}</h4>
                                                            <p className="card-text">PARTY:{!item.party ? "NONE" : item.party}</p>
                                                            <center>
                                                                <button className="btn btn-link" data-toggle="modal" data-target="#addVoteModal">
                                                                    <i
                                                                        onClick={((e) => this.handleClick(e, item))}
                                                                        className="fa fa-heart"
                                                                        style={{ fontSize: "24px", color: item.color }}></i>
                                                                </button>
                                                            </center>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                            }
                        </div>
                }
                {/* ADD POLL MODAL */}
                <div className="modal fade" id="addVoteModal" tabIndex="-1" role="dialog" aria-hidden="true">

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">CONFIRM VOTE</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label style={{ fontFamily: "montserrat" }}>
                                        Please confirm your vote by typing your full name <strong style={{ color: "darkgreen" }}>{this.state.userFullName}</strong>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        onChange={text => this.handleChange("name", text)}
                                        placeholder="Your Name Please.." />
                                </div>
                                <p className="lead">You are voting for <strong style={{ fontFamily: "Montserrat" }}>{this.state.candidateName.toUpperCase()}</strong></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button
                                    type="button"
                                    onClick={this.handleSubmit}
                                    className="btn btn-primary"
                                    disabled={this.state.name.toLowerCase() !== this.state.userFullName}
                                    data-dismiss="modal"
                                >
                                    {!this.props.loading ? "VOTE" : <img alt='loading'
                                        src={loader} style={{ width: '23px' }} />}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                {/* ADD POLL MODAL */}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addVote: data => dispatch(addVote(data))
})

const mapStateToProps = state => ({
    loading: state.dash.loading,
    data: state.dash.data,
    fetched: state.dash.fetched,
    created: state.dash.created,
    error: state.dash.error,
    errorMsg: state.dash.errorMsg
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewVoteDetails));
