import React from 'react';
import {Helmet} from 'react-helmet';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/woman-laptop.png';
import Menubar from '../Menubar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <Menubar />
        <div id="home" className="row">
            <div className="col-md-8 text-center">
                <h1>Bingung cari laptop yang tepat ?</h1>
                <p>Isi quiz berikut untuk mendapatkan rekomendasi<br></br>laptop yang tepat untukmu</p>
                <Link to={`/play`}><button type="button" name="button" className="btn btn-success">Mulai Quiz</button></Link>
            </div>
            <div className="col-sm-4 position-relative">
                <img className="fixed-bottom position-absolute bottom-0 end-0" src={homeImage} />
            </div>
        </div>

        <div className="howItWorks">
            <div className="row HIW-row ">
                <div className="col-md-12 text-center">
                    <h1>How it works</h1> 
                </div>
            </div>
            <div className="row HIW-row">
                <div className="col-md-4 text-center">
                    <FontAwesomeIcon icon="laptop" className="HIW-icons" />
                    <h3 className="HIW-title text-center">Start Quiz</h3>
                </div>
                <div className="col-md-4 text-center">
                    <FontAwesomeIcon icon="envelope" className="HIW-icons"/>
                    <h3 className="HIW-title text-center">Tell us how we<br></br> can contact you</h3>
                </div>
                <div className="col-md-4 text-center">
                    <FontAwesomeIcon icon="tags" className="HIW-icons"/>
                    <h3 className="HIW-title text-center">We show you the best <br></br>deals through email <br></br>in <u>1-2 days</u></h3>
                </div>
            </div>
            <div className="row HIW-row ">
                <div className="col-md-12 text-center">
                    <h2>No newsletter, no fuss. Just our recommended picks for you</h2> 
                </div>
            </div>
        </div>
    </Fragment>
)

export default Home;