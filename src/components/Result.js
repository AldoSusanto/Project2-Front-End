import React from 'react';
import {Helmet} from 'react-helmet';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Result extends React.Component {
    render() {
        return (
            <Fragment>
                    <Helmet><title>Quiz App - Summary</title></Helmet>
                <div className="quiz-summary">
                    <Fragment>
                        <div>
                            <span className="mdi mdi-check-circle-outline success-icon"></span>
                            <h1>Quiz Has ended</h1>
                            <div className="container stats">
                                <h4>Thank you for taking the quiz</h4>
                                <span className="stat left">Total num of Questions: </span>
                                <span className="right">10</span><br></br>

                                <span className="stat left">Total num of Questions: </span>
                                <span className="right">10</span><br></br>

                                <span className="stat left">Total num of Questions: </span>
                                <span className="right">10</span><br></br>
                            </div>
                        </div>
                        <section>
                            <ul>
                                <li>
                                    <Link to="/"> Back to Home</Link>
                                </li>
                                <li>
                                    <Link to="/play"> Retake quiz</Link>
                                </li>                        
                            </ul>
                        </section>
                    </Fragment>
                </div>
            </Fragment>
        )
    }
}

export default Result;