import React, { Component } from 'react'
import Navbar from '../Dashboard/Navbar'
import loader from "../../assets/loader.svg";
import beanEater from "../../assets/beanEater.svg";
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { getPolls, getCandidates } from "../../actions/dashboard";
import { toast } from 'react-toastify';
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
    }

    async componentDidMount() {
        await this.props.getPolls(1);
        if (this.props.fetched) {
            this.setState({
                polls: this.props.polls.data.data,
                totalPage: this.props.polls.data.meta.pageCount,
                currentPage: this.props.polls.data.meta.page + 1,
                limit: this.props.polls.data.meta.limit,
                total: this.props.polls.data.meta.total
            })
        }
    }

    async makePageRequest(number) {
        const fetchDataForPagination = await axios.get(`http://localhost:7500/polls?page=${number}`);
        if (fetchDataForPagination) {
            this.setState({
                polls: fetchDataForPagination.data.data,
                totalPage: fetchDataForPagination.data.meta.pageCount,
                currentPage: fetchDataForPagination.data.meta.page + 1,
                limit: fetchDataForPagination.data.meta.limit,
                total: fetchDataForPagination.data.meta.total,
                showVoteDetails: false
            })
        }
        // handle else later
    }

    handleClick = async (e, data) => {
        // access to e.target here
        await this.props.getCandidates(data._id);
        if (this.props.fetched) {
            this.setState({ showVoteDetails: true, voteDetails: data, candidateDetails: this.props.candidates.data.data })
        }

    }

    render() {
        const pageNumbers = [];
        let renderPageNumbers;
        if (this.state.total !== null) {
            for (let i = 1; i <= Math.ceil(this.state.total / this.state.limit); i++) {
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

        const { showVoteDetails, voteDetails, candidateDetails } = this.state;

        return (
            <div>
                <Navbar name="Pollúr" />
                <div className="row">
                    {/* table for explore */}
                    <div className="col-md-6">
                        <div className="container">
                            {/* table pagination */}
                            <div style={{ marginTop: "8px" }} className="container row">
                                {renderPageNumbers}
                            </div>
                            {/* table pagination */}

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
                                                            <td>{item.name.toUpperCase()}</td>
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
    getCandidates: data => dispatch(getCandidates(data))
})

const mapStateToProps = state => ({
    loading: state.dash.loading,
    polls: state.dash.polls,
    fetched: state.dash.fetched,
    candidates: state.dash.candidates,
    error: state.dash.error,
    errorMsg: state.dash.errorMsg
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Explore));
