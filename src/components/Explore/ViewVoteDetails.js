import React, { Component } from 'react'

export class ViewVoteDetails extends Component {

    handleClick = async (e, data) => {
        // access to e.target here
        console.log('dataaa', data)

    }

    render() {
        return (
            <div>

                {
                    this.props.candidateDetails.length === 0
                        ?

                        <h5 style={{ textAlign: "center" }}>None at the moment</h5>
                        :
                        <div className="container">
                            <h1>DESCRIPTION</h1>
                            <p>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?</p>
                            <div className="row" style={{ display: "flex" }}>
                                {
                                    this.props.candidateDetails.map((item, i) =>
                                        <div key={i} className="card border-primary mb-2" style={{ maxWidth: '20rem', margin: "5px", borderRadius: "10px" }}>
                                            <div class="card-body" style={{ alignItems: "center" }}>
                                                <h4 class="card-title" >{item.name}</h4>
                                                <p class="card-text">PARTY:{!item.party ? "NONE" : item.party}</p>
                                                <center>
                                                    <i
                                                        onClick={((e) => this.handleClick(e, item))}
                                                        className="fa fa-heart"
                                                        style={{ fontSize: "24px", color: item.color }}></i>
                                                </center>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                }

            </div>
        )
    }
}

export default ViewVoteDetails
