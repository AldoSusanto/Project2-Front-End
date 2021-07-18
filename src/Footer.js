import React, { Component } from 'react';
import logoImage from './assets/Logo/Original-Transparent.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Footer extends React.Component{
    render() {
        return (
            <div className="footer">
                <div className="footer-content row">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 text-left footer-left">
                        <img src={logoImage} className="logo-footer"></img>
                        <p>ProPicks adalah web application yang bertujuan untuk memberikan rekomendasi laptop yang terbaik untukmu.</p>
                        <p><FontAwesomeIcon icon="phone" className="footer-icons"/>  (+62) 812-9927-5403</p>
                        <p><FontAwesomeIcon icon="envelope" className="footer-icons"/>  aldosusanto@hotmail.com</p>
                        <p>Copyright &copy; ProPicks | 2020</p>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-4 text-left footer-mid">
                        <h2>Quick Links:</h2>
                        <ul>
                            <a className="menuBtn" href="/play"><li>Take the quiz</li></a>
                            <a className="menuBtn" href="/"><li>Homepage</li></a>
                            <a className="menuBtn" href="/"><li>Contact Us</li></a>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;
