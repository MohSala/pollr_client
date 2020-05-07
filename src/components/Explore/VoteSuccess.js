import React, { Component } from 'react'
import { Link } from "react-router-dom";
export class VoteSuccess extends Component {
    render() {
        return (
            <div class="jumbotron">
                <h1 class="display-3">ALRIGHT!!!</h1>
                <p class="lead">
                    You just voted for a candidate. Your votes are secure and safe with us, in the mean time you can see how the poll is going but you can't vote again
</p>
                <hr class="my-4" />
                <p>See how the Poll is going.</p>
                <p class="lead">
                    <Link to="/explore" className="btn btn-primary btn-lg" role="button">explore</Link>
                </p>
            </div>
        )
    }
}

export default VoteSuccess
