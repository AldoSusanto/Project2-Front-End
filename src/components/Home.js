import React from 'react';
import {Helmet} from 'react-helmet';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/woman-laptop.png';
import logoImage from '../assets/Logo/Original-Transparent.png';

const Home = () => (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home" className="row">
            <div className="col-md-8 text-center">
                <h1>Bingung cari laptop yang tepat ?</h1>
                <p>Isi quiz berikut untuk mendapatkan rekomendasi<br></br>laptop yang tepat untukmu</p>
                <Link to={`/play`}><button type="button" name="button" className="btn btn-success">Mulai Quiz</button></Link>
            </div>
            <div className="col-sm-4 position-relative">
                {/* <div className="img-container"> */}
                    <img className="fixed-bottom position-absolute bottom-0 end-0" src={homeImage} />
                {/* </div> */}
            </div>
        </div>
    </Fragment>
)

export default Home;