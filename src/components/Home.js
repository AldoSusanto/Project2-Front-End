import React from 'react';
import {Helmet} from 'react-helmet';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home">
            <section>
                <div>
                    <span class="mdi mdi-cube-outline "></span>
                </div>
                <h1>Quiz App</h1>
                <div class="play-button-container">
                    <ul>
                        <li>
                            <Link to="/play" class="play-button">Play</Link>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </Fragment>
)

export default Home;