import React, { Component } from 'react'
import Navbar from '../Dashboard/Navbar'
// import loader from "../../assets/loader.svg";
import beanEater from "../../assets/beanEater.svg";
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { getPolls, getCandidates, getACandidate, getPollVotes, searchPolls } from "../../actions/dashboard";
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import ViewVoteDetails from './ViewVoteDetails';

export class Explore extends Component {
    state = {
        polls: [],
        totalPage: 0,
        total: 0,
        currentPage: 0,
        limit: 0,
        showVoteDetails: false,
        candidateDetails: [],
        candidateObject: {},
        chartValues: false,
        showPagination: false,
        showReturn: false,
        search: '',
        errorMsg: '',
        error: false
    }

    async componentDidMount() {
        await this.props.getPolls(1);
        if (this.props.fetched) {
            this.setState({
                polls: this.props.polls.data.data,
                totalPage: this.props.polls.data.meta.pageCount,
                currentPage: this.props.polls.data.meta.page + 1,
                limit: this.props.polls.data.meta.limit,
                total: this.props.polls.data.meta.total,
                showPagination: true,
                showReturn: false
            })
        }
        else {
            this.setState({
                error: true,
                errorMsg: this.props.errorMsg.data.message,
                showPagination: false
            })
        }
    }

    async makePageRequest(number) {
        const fetchDataForPagination = await axios.get(`https://pollur-api-imdjxr5ywq-ez.a.run.app/polls?page=${number}`);
        if (fetchDataForPagination) {
            this.setState({
                polls: fetchDataForPagination.data.data,
                totalPage: fetchDataForPagination.data.meta.pageCount,
                currentPage: fetchDataForPagination.data.meta.page + 1,
                limit: fetchDataForPagination.data.meta.limit,
                total: fetchDataForPagination.data.meta.total,
                showVoteDetails: false,
                showPagination: true
            })
        } else {
            this.setState({
                error: true,
                errorMsg: this.props.errorMsg.data.message,
                showPagination: false
            })
        }
    }

    handleClick = async (e, data) => {
        // access to e.target here
        const userId = localStorage.getItem("userId");
        await this.props.getACandidate(userId, data._id);
        await this.props.getCandidates(data._id);
        await this.props.getPollVotes(data._id);
        if (this.props.fetched) {
            this.setState({
                showVoteDetails: true,
                voteDetails: data,
                candidateDetails: this.props.candidates.data.data,
                candidateObject: this.props.candidate.data.data,
                chartValues: this.props.votes.data.data

            })
        } else {
            this.setState({
                error: true,
                errorMsg: this.props.errorMsg.data.message
            })
        }

    }

    handleChange = (name, e) => {
        this.setState({
            [name]: e.target.value
        });
    };

    handleSearch = async () => {
        const { search } = this.state;
        await this.props.searchPolls(search);
        if (this.props.searched) {
            this.setState({
                polls: this.props.data.data.data,
                showPagination: false,
                showReturn: true,
                error: false
            })
        } else {
            this.setState({
                error: true,
                errorMsg: this.props.errorMsg.data.message,
                showPagination: true
            })
        }
    }

    goBack = async () => {
        return this.componentDidMount()
    }

    render() {
        const pageNumbers = [];
        let renderPageNumbers;
        if (this.state.total !== null) {
            for (let i = 1; i <= Math.round(this.state.total / this.state.limit); i++) {
                pageNumbers.push(i);
            }

            renderPageNumbers = pageNumbers.map(number => {
                let classes = this.state.currentPage === number ? 'page-item active' : 'page-item';

                return (
                    <ul key={number} className="pagination">
                        <li className={classes}>
                            <Link className="page-link" onClick={() => this.makePageRequest(number)}>{number}</Link>
                        </li>
                    </ul>

                );
            });
        }

        const { showReturn, showPagination, chartValues, error, errorMsg, showVoteDetails, voteDetails, candidateDetails, candidateObject } = this.state;

        return (
            <div>
                <Navbar name="Pollúr" />
                {error &&
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Oh snap!</strong> {errorMsg}
                    </div>
                }
                <div className="row">
                    {/* table for explore */}
                    <div className="col-md-6">
                        {/* search input */}
                        <div className="form-group col-sm-6" style={{ marginTop: "10px" }}>
                            <input
                                type="text"
                                autocomplete="off"
                                placeholder="I am looking for..."
                                className="form-control" name="email"
                                onChange={text => this.handleChange("search", text)}
                                style={{ fontFamily: 'Montserrat', border: "2px solid black" }} />
                            <button
                                type="button"
                                onClick={this.handleSearch}
                                disabled={!this.state.search}
                                className="btn btn-primary">SEARCH<span role="img" aria-label="rocket">🔎</span> </button>
                            {showReturn &&
                                <button
                                    type="button"
                                    onClick={this.goBack}
                                    disabled={!this.state.search}
                                    className="btn btn-link">BACK</button>}
                        </div>
                        {/* search input */}
                        <div className="container">

                            {
                                this.props.loading ?
                                    <center>
                                        <img alt='loading'
                                            src={beanEater} style={{ width: '100px' }} />
                                    </center>
                                    :
                                    <div>
                                        <table className="table table-hover table-responsive">
                                            <thead>
                                                <tr>
                                                    {/* <th scope="col">S/N</th> */}
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">ADDED BY</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    this.state.polls.map((item, i) =>
                                                        <tr key={i} className="table-light" onClick={((e) => this.handleClick(e, item))}>
                                                            {/* <th scope="row">{i + 1}</th> */}
                                                            <td>{item.name.toUpperCase()} <br /> <span className="badge badge-pill badge-light">{item.voteCount}VTS</span> </td>
                                                            <td>{item.category.toUpperCase()}</td>
                                                            <td> {item.type === "public" ? <span className="badge badge-success">PUBLIC</span> : <span className="badge badge-primary">PRIVATE</span>}
                                                            </td>
                                                            <td>{item.userId.fullName.toUpperCase().slice(0, 5)}....
                                                        </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>

                                    </div>

                            }
                            {/* table pagination */}
                            <div style={{ marginTop: "8px" }} className="container row">
                                {showPagination && renderPageNumbers}
                            </div>
                            {/* table pagination */}
                        </div>
                    </div>

                    {/* SECOND CONTAINER DIV */}
                    <div className="col-md-6">
                        {
                            showVoteDetails &&
                            <div className="container">
                                <ViewVoteDetails
                                    name={voteDetails.name}
                                    type={voteDetails.type}
                                    category={voteDetails.category}
                                    id={voteDetails._id}
                                    candidateDetails={candidateDetails}
                                    candidateObject={candidateObject}
                                    chartValues={chartValues}
                                />
                            </div>
                        }
                    </div>
                    {/* SECOND CONTAINER DIV */}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getPolls: data => dispatch(getPolls(data)),
    getCandidates: data => dispatch(getCandidates(data)),
    getACandidate: (data, payload) => dispatch(getACandidate(data, payload)),
    getPollVotes: data => dispatch(getPollVotes(data)),
    searchPolls: data => dispatch(searchPolls(data))
})

const mapStateToProps = state => ({
    loading: state.dash.loading,
    polls: state.dash.polls,
    fetched: state.dash.fetched,
    candidate: state.dash.candidate,
    candidates: state.dash.candidates,
    searched: state.dash.searched,
    data: state.dash.data,
    votes: state.dash.votes,
    error: state.dash.error,
    errorMsg: state.dash.errorMsg
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Explore));
