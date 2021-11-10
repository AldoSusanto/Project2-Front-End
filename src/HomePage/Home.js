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
                <div className="col-md-5 text-center">
                    <p className="">Step 1</p>
                    <img className="iconImage" src={formIcon} alt=""></img>
                    <h3 className="HIW-title text-center">Isi Quiz</h3>
                    <p>Beri tahu kami kriteria laptop<br></br>yang kamu inginkan</p>
                </div>
                <div className="col-md-5 text-center">
                    <p className="text-center">Step 2</p>
                    <FontAwesomeIcon icon="laptop" className="HIW-icons"/>
                    <h3 className="HIW-title text-center">Cek Email</h3>
                    <p>Dapatkan rekomendasi laptop<br></br> yang terbaik untukmu</p>
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
        <Footer/>
    </Fragment>
)

export default Home;
