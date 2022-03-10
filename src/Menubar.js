import React, { useState } from "react";
import { Nav } from "reactstrap";
import logoImage from "./assets/Logo/Original-Transparent.png";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";

const Menubar = (props) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <Nav
      className={`navbar navbar-expand-md navbar-light menubarStyle fixed-top bgBlue`}
    >
      <div className="container-fluid">
        <a href="/">
          <img
            href="/"
            className="logo ml-3 ml-md-5"
            src={logoImage}
            alt="Propicks logo"
          />
        </a>
        <div className="navbar-collapse d-none d-md-block">
          <div className="navbar-nav">
            <a className="menuBtn" href="/#howItWorks">
              Cara Kerja
            </a>
            <a className="menuBtn" href="/play">
              Mulai Quiz
            </a>
          </div>
        </div>
        <div onClick={() => setShowNav(!showNav)} className="d-md-none d-block">
          <MdOutlineMenu size="100%" className="menu-icons" />
        </div>
        <div
          className={`offcanvas d-md-none d-block ${
            showNav ? "show-nav" : "hidden-nav"
          }`}
        >
          <div className="offcanvas__nav d-flex flex-column justify-content-center pl-1">
            <span
              className="offcanvas__close align-self-end"
              href="/#howItWorks"
              onClick={() => setShowNav(!showNav)}
            >
              <MdOutlineClose size="100%" className="close-icons" />
            </span>
            <a className="offcanvas__link" href="/#howItWorks">
              Cara Kerja
            </a>
            <a className="offcanvas__link" href="/play">
              Mulai Quiz
            </a>
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default Menubar;
