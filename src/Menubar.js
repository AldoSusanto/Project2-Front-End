import React, { useState } from "react";
import { Nav } from "reactstrap";
import logoImage from "./assets/Logo/Original-Transparent.png";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import { FaTiktok, FaInstagram, FaWhatsapp } from "react-icons/fa";

const prefix_url =
  "https://wa.me/6287868572240?text=Hello%20Propicks%2C%20saya%20ingin%20mencari%20laptop%20yang%20tepat%20untuk%20saya%20%21%20%3AD";

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
        <div className="navbar-collapse justify-content-between align-items-center d-none d-md-block">
          <div className="navbar-nav">
            <a className="menuBtn" href="/#howItWorks">
              Cara Kerja
            </a>
            <a className="menuBtn" href="/play">
              Mulai Quiz
            </a>
          </div>
          <div className="navbar-nav socmed-list">
            <a href={prefix_url} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="wa-icons" />
            </a>
            <a
              href="https://instagram.com/propicks.id"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="ig-icons" />
            </a>
            <a
              href="https://www.tiktok.com/@propicksid"
              target="_blank"
              rel="noreferrer"
            >
              <FaTiktok className="tt-icons" />
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
          <div className="offcanvas__nav d-flex flex-column justify-content-between pl-1">
            <div className="d-flex flex-column">
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
            <div className="d-flex justify-content-between align-items-center px-3 pb-3">
              <a
                className="offcanvas__sclink"
                href={prefix_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="wa-icons" />
              </a>
              <a
                className="offcanvas__sclink"
                href="https://instagram.com/propicks.id"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="ig-icons" />
              </a>
              <a
                className="offcanvas__sclink"
                href="https://www.tiktok.com/@propicksid"
                target="_blank"
                rel="noreferrer"
              >
                <FaTiktok className="tt-icons" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default Menubar;
