import React from 'react';
import {Helmet} from 'react-helmet';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import homeImage from '../assets/woman-laptop.png';
import Menubar from '../Menubar'
import Footer from '../Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import formIcon from '../assets/form-icon-nobg.png';
import smileIcon from '../assets/smile-nobg.png';


const Home = () => (
    <Fragment>
        <Helmet><title>ProPicks - Home</title></Helmet>
        <Menubar />

        {/* Cover Page */}
        <div id="home" className="row">
            <div className="col-md-8 text-center">
                <h1>Bingung cari laptop yang tepat ?</h1>
                <p>Isi pertanyaan berikut untuk mendapatkan rekomendasi<br></br>laptop yang tepat untukmu</p>
                <Link to={`/play`}><button type="button" name="button" className="btn btn-success">Cari Tahu</button></Link>
            </div>
            <div className="col-sm-4 position-relative">
                <img className="fixed-bottom position-absolute bottom-0 end-0" src={homeImage} alt="ProPicks welcome cari laptop" />
            </div>
        </div>

        {/* How it works Page */}
        <div className="howItWorks" id="howItWorks">
            <div className="row HIW-row ">
                <div className="col-md-12 text-center">
                    <h1>Cara Kerja</h1> 
                </div>
            </div>
            <div className="row HIW-row">
                <div className="col-md-1"></div>
                <div className="col-md-3 text-center">
                    <h3 className="text-ce">Step 1</h3>
                    <img className="iconImage" src={formIcon} alt=""></img>
                    <h3 className="HIW-title text-center">Beritahu kebutuhan <br /> laptop kamu</h3>
                </div>
                <div className="col-md-4 text-center">
                    <h3 className="text-center">Step 2</h3>
                    <FontAwesomeIcon icon="search-dollar" className="HIW-icons"/>
                    <h3 className="HIW-title text-center">Kami rekomendasikan <br /> laptop terbaik untukmu</h3>
                </div>
                <div className="col-md-3 text-center">
                    <h3 className="text-center">Step 3</h3>
                    <img className="iconImage" src={smileIcon} alt=""></img>
                    <h3 className="HIW-title text-center">Explore dan pilih <br /> laptop kesukaanmu</h3>
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
        <Footer/>
    </Fragment>
)

export default Home;
