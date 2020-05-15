import React, { Component } from 'react'
import Navbar from './Navbar'
import loader from "../../assets/loader.svg";
import beanEater from "../../assets/beanEater.svg";
import dashboard from "../../assets/dashboard.svg"
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { addPoll, getMyPoll, getCandidates } from "../../actions/dashboard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '../common/Pagination';
import PollDetail from './PollDetail';
toast.configure()

export class Dashboard extends Component {

	state = {
		name: "",
		category: "",
		type: "",
		errorMsg: '',
		currentPage: 1,
		postsPerPage: 5,
		polls: [],
		pollDetails: {},
		candidateDetails: [],
		showPollDetails: false,
		error: false
	}

	componentDidMount = async () => {
		const userId = localStorage.getItem("userId");
		await this.props.getMyPoll(userId);
		if (this.props.fetched) {
			this.setState({
				polls: this.props.data.data.data
			})
		}
		else {
			this.setState({
				error: true,
				errorMsg: this.props.errorMsg.data.message
			})
		}
	}

	notify = (text) => toast.success(text);

	handleChange = (name, e) => {
		this.setState({
			[name]: e.target.value
		});
	};

	changeCategory = async (e) => {
		this.setState({
			category: e.target.value
		})
	}

	changeType = async (e) => {
		this.setState({
			type: e.target.value
		})
	}

	handleSubmit = async () => {
		const { name, category, type } = this.state;
		const userId = localStorage.getItem("userId");
		await this.props.addPoll({ name, category, type, userId });
		if (this.props.created) {
			this.notify("Your Poll has been successfully created");
			this.componentDidMount()
		}
		else {
			this.setState({
				error: true,
				errorMsg: this.props.errorMsg.data.message
			})
		}

	}

	handleClick = async (e, data) => {
		// access to e.target here
		await this.props.getCandidates(data._id);
		if (this.props.fetched) {
			this.setState({ showPollDetails: true, pollDetails: data, candidateDetails: this.props.candidates.data.data })
		}
		else {
			this.setState({
				error: true,
				errorMsg: this.props.errorMsg.data.message
			})
		}

	}



	render() {
		const { candidateDetails, pollDetails, showPollDetails, polls, error, errorMsg, postsPerPage, currentPage } = this.state;
		// Get current posts
		const indexOfLastPost = currentPage * postsPerPage;
		const indexOfFirstPost = indexOfLastPost - postsPerPage;
		const currentPolls = this.state.polls.slice(indexOfFirstPost, indexOfLastPost);

		// Change page
		const paginate = pageNumber => this.setState({ currentPage: pageNumber });
		return (
			<div>
				<Navbar name="PLLR" />
				{error &&
					<div className="alert alert-dismissible alert-danger">
						<button type="button" className="close" data-dismiss="alert">&times;</button>
						<strong>Oh snap!</strong> Change a few things up and try submitting again.
</div>
				}
				<div className="row">

					{/* FIRST CONTAINER DIV */}
					<div className="col-md-6">
						<div className="container">
							<h3 style={{ fontFamily: "Montserrat", marginTop: "60px" }}>WELCOME, {localStorage.getItem("name")}</h3>
							{/* tabke */}
							<h4 style={{ fontFamily: "Montserrat", marginTop: "20px" }}>YOUR POLLS</h4>
							{
								this.props.loading &&
								<center>
									<img alt='loading'
										src={beanEater} style={{ width: '100px' }} />
								</center>

							}
							{
								currentPolls.length === 0
									?
									<center>
										<img src={dashboard} alt="vote" style={{ width: "250px", height: "250px" }} />
										<h4 className="lead">You do not have any open polls yet. create one!!</h4>
									</center>

									:
									<table className="table table-hover table-responsive">
										<thead>
											<tr>
												<th scope="col">S/N</th>
												<th scope="col">Name</th>
												<th scope="col">Category</th>
												<th scope="col">Type</th>
											</tr>
										</thead>
										<tbody>
											{
												currentPolls.map((item, i) =>
													<tr key={i} className="table-light" onClick={((e) => this.handleClick(e, item))}>
														<th scope="row">{i + 1}</th>
														<td>{item.name.toUpperCase()}</td>
														<td>{item.category.toUpperCase()}</td>
														<td>{item.type.toUpperCase()}</td>
													</tr>
												)
											}
										</tbody>
									</table>
							}

							<Pagination
								postsPerPage={postsPerPage}
								totalPosts={polls.length}
								paginate={paginate}
							/>
						</div>
					</div>
					{/* FIRST CONTAINER DIV */}

					{/* SECOND CONTAINER DIV */}
					<div className="col-md-6">
						<div className="container">
							<button type="button" className="btn btn-outline-primary  btn-block" data-toggle="modal" data-target="#addPollModal">CREATE A VOTING POLL</button>
						</div>

						{
							showPollDetails &&
							<div className="container">
								<PollDetail
									name={pollDetails.name}
									type={pollDetails.type}
									category={pollDetails.category}
									id={pollDetails._id}
									candidateDetails={candidateDetails}

								/>
							</div>
						}
					</div>
					{/* SECOND CONTAINER DIV */}
				</div>

				{/* ADD POLL MODAL */}
				<div className="modal fade" id="addPollModal" tabIndex="-1" role="dialog" aria-hidden="true">

					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">ADD A POLL</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">

								<div className="form-group">
									<label>Name</label>
									<input
										type="email"
										className="form-control"
										onChange={text => this.handleChange("name", text)}
										placeholder="Every great voting poll has a good name.." />
								</div>

								<div className="form-group">
									<label>Category</label>
									<select className="form-control" onChange={this.changeCategory}>
										<option>Select the criterium of your poll</option>
										<option>Political</option>
										<option>Sport</option>
										<option>Protest</option>
										<option>Human Rights</option>
										<option>Open Ballot</option>
									</select>
								</div>

								<div className="form-group">
									<label>Type(Is it Open to All or Private)</label>
									<select disabled className="form-control" onChange={this.changeType}>
										{/* <option>FFA or Privy</option> */}
										<option value="public">Public</option>
										{/* <option value="private">Private</option> */}
									</select>
								</div>

							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
								<button
									type="button"
									onClick={this.handleSubmit}
									className="btn btn-success"
									disabled={!this.state.name || !this.state.category || !this.state.type}
									data-dismiss="modal"
								>
									{!this.props.loading ? "CREATE" : <img alt='loading'
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
	addPoll: data => dispatch(addPoll(data)),
	getMyPoll: data => dispatch(getMyPoll(data)),
	getCandidates: data => dispatch(getCandidates(data))
})

const mapStateToProps = state => ({
	loading: state.dash.loading,
	data: state.dash.data,
	created: state.dash.created,
	candidates: state.dash.candidates,
	fetched: state.dash.fetched,
	error: state.dash.error,
	errorMsg: state.dash.errorMsg
})

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard));
