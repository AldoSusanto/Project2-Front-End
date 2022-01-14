import React from "react";
import logoImage from "./assets/Logo/Original-Transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-content row d-flex flex-column flex-md-row">
          <div className="col-md-1"></div>
          <div className="col-md-5 col-lg-4 text-left footer-left">
            <img
              src={logoImage}
              className="logo-footer"
              alt="ProPicks Footer Logo"
            ></img>
            <p>
              ProPicks adalah web application yang bertujuan untuk memberikan
              rekomendasi laptop yang terbaik untukmu.
            </p>
            {/* <p><FontAwesomeIcon icon="phone" className="footer-icons"/>  (+62) 812-9927-5403</p> */}
            <p className="footer-email">
              <FontAwesomeIcon icon="envelope" className="footer-icons" />{" "}
              aldosusanto@hotmail.com
            </p>
            <p>Copyright &copy; ProPicks | 2021</p>
          </div>
          <div className="col-md-1 col-lg-2"></div>
          <div className="col-md-5 col-lg-4 text-left footer-mid">
            <h2>Links:</h2>
            <ul>
              <a className="menuBtn" href="/play">
                <li>Mulai quiz</li>
              </a>
              <a className="menuBtn" href="/">
                <li>Homepage</li>
              </a>
              <a className="menuBtn" href="/">
                <li>Kontak Kami</li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
