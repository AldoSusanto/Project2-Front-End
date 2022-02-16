import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Menubar from "../Menubar";
import Footer from "../Footer";
import { MdSearch } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formIcon from "../assets/form-icon-nobg.png";
import smileIcon from "../assets/smile-nobg.png";
import addInformationPng from "../assets/add-information.png";
import programmingPng from "../assets/programming.png";
import checkingBoxesPng from "../assets/checking-boxes.png";
import partnersPng from "../assets/partners.png";
import homeImg from "../assets/image-1.png";

const Home = () => {
  const [isVisible, setIsVisible] = useState(0);

  useEffect(() => {
    if (isVisible >= 0 && isVisible !== 4) {
      setTimeout(() => {
        setIsVisible(isVisible + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setIsVisible(0);
      }, 2000);
    }
  }, [isVisible]);

  return (
    <Fragment>
      <Helmet>
        <title>ProPicks - Home</title>
      </Helmet>
      <Menubar featuredNav />

      {/* Cover Page */}
      <div className="main">
        <div id="home" className="row">
          <div className="col-12 col-md-6 col-xl-8 text-center">
            <h1 className="headline">
              Cari Laptop Untuk <br />
              <span className="headline-highlight">
                <span class={`${isVisible === 0 ? "is-visible" : "is-hidden"}`}>
                  Pelajar
                </span>
                <span
                  class={`slide-2 ${
                    isVisible === 1 ? "is-visible" : "is-hidden"
                  }`}
                >
                  Gaming
                </span>
                <span
                  class={`slide-3 ${
                    isVisible === 2 ? "is-visible" : "is-hidden"
                  }`}
                >
                  Programming
                </span>
                <span
                  class={`slide-4 ${
                    isVisible === 3 ? "is-visible" : "is-hidden"
                  }`}
                >
                  Streaming
                </span>
                <span
                  class={`slide-5 ${
                    isVisible === 4 ? "is-visible" : "is-hidden"
                  }`}
                >
                  Video Editing
                </span>
              </span>
            </h1>
            <div className="d-block d-md-none">
              <img
                className="hero-img"
                src={homeImg}
                alt="ProPicks welcome cari laptop"
              />
            </div>
            <p>
              Propicks akan merekomendasikan laptop{" "}
              <br className="d-none d-sm-block"></br> yang tepat untukmu
            </p>
            <Link to={`/play`}>
              <button type="button" name="button" className="btn btn-success">
                Mulai Quiz
              </button>
            </Link>
          </div>
          <div className="col-12 col-md-4 position-relative d-none d-md-block">
            <img
              className="hero-img position-absolute"
              src={homeImg}
              alt="ProPicks welcome cari laptop"
            />
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
            <div className="col-12 col-md-3 text-center mb-2 mb-md-0">
              <h3 className="text-ce">Step 1</h3>
              <img
                className="iconImage ml-3 ml-md-0"
                src={formIcon}
                alt=""
              ></img>
              <h3 className="HIW-title text-center">
                Beritahu kebutuhan <br /> laptop kamu
              </h3>
            </div>
            <div className="col-12 col-md-4 text-center my-5 my-md-0">
              <h3 className="text-center">Step 2</h3>
              <FontAwesomeIcon icon="search-dollar" className="HIW-icons" />
              <h3 className="HIW-title text-center">
                Kami rekomendasikan <br /> laptop terbaik untukmu
              </h3>
            </div>
            <div className="col-12 col-md-3 text-center mt-2 mt-md-0">
              <h3 className="text-center">Step 3</h3>
              <img className="iconImage" src={smileIcon} alt=""></img>
              <h3 className="HIW-title text-center">
                Explore dan pilih <br /> laptop kesukaanmu
              </h3>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>

        {/* Partner Propicks Page */}
        <div className="partner-propicks row">
          <div className="col-12 col-lg-6 partner-propicks-info">
            <h5>Partner Propicks</h5>
            <p>
              Propicks telah membangun kerja sama dengan beberapa partner
              terpercaya agar kamu dapat mencari laptop dengan aman dan nyaman.
            </p>
          </div>
          <div className="col-12 col-lg-6 partner-propicks-img">
            <img src={partnersPng} alt="" />
          </div>
        </div>

        {/* About Page */}
        <div className="about">
          <h5 className="">
            <MdSearch className="icon-search" />
            Yuk mengenal lebih dalam tentang Propicks
          </h5>
          <div className="row about-row">
            <div className="col-12 col-lg-6 about-header d-flex flex-column justify-content-center align-items-center">
              <h4 className="d-none d-sm-block">
                Apa itu <span className="border-blue">Propicks?</span>
              </h4>
              <img src={addInformationPng} alt="" />
              <h4 className="d-block d-sm-none">
                Apa itu <span className="border-blue">Propicks?</span>
              </h4>
            </div>
            <div className="col-12 col-lg-6 about-description">
              <p>
                Propicks adalah quiz tentang aktivitas harian kamu untuk mencari
                laptop/notebook yang paling bagus, murah dan terbaik untukmu.
                Cukup isi quiz kami dan sistem kami akan memberikan rekomendasi
                laptop yang tepat untukmu. Tidak perlu membuat akun dan tidak
                ada data yang dilacak karena anda tidak memberikan informasi
                kontak apapun.
              </p>
            </div>
          </div>
          <div className="row about-row flex-column-reverse flex-lg-row">
            <div className="col-12 col-lg-6 about-description">
              <p>
                Propicks terinspirasi dari banyaknya pelajar, gamers, desainer,
                editor yang cenderung membeli laptop/notebook yang tidak cocok
                untuk keperluan mereka. Banyak dari mereka yang membeli laptop
                yang terlalu mahal, performa kurang bagus, kurang ringan, atau
                tidak tahan lama. Propicks bertujuan untuk membantu kamu mencari
                dan merekomendasikan laptop tipe apapun dengan harga laptop yang
                murah dan lebih terjangkau. Laptop yang dapat ditujukan untuk
                desainer, laptop untuk editor, laptop gaming murah terbaik, dan
                lain-lain.
              </p>
            </div>
            <div className="col-12 col-lg-6 about-header d-flex flex-column justify-content-center align-items-center">
              <h4 className="d-none d-sm-block">
                Visi <span className="border-red">Propicks</span>
              </h4>
              <img src={programmingPng} alt="" />
              <h4 className="d-block d-sm-none">
                Visi <span className="border-red">Propicks</span>
              </h4>
            </div>
          </div>
          <div className="row about-row">
            <div className="col-12 col-lg-6 about-header d-flex flex-column justify-content-center align-items-center">
              <h4 className="d-none d-sm-block">
                Rekomendasi & Review{" "}
                <span className="border-green">Propicks</span>
              </h4>
              <img src={checkingBoxesPng} alt="" />
              <h4 className="d-block d-sm-none text-center">
                Rekomendasi & Review{" "}
                <span className="border-green">Propicks</span>
              </h4>
            </div>
            <div className="col-12 col-lg-6 about-description">
              <p>
                Propicks mempunyai banyak rekomendasi dan review terbaik untuk
                banyak laptop: Lenovo Ideapad, Lenovo Thinkpad, Lenovo Legion,
                Lenovo Yoga Slim, HP Pavillion Gaming, HP 14s, Asus Vivobook.
                Asus Zenbook, Asus ROG Strix. Asus a409, Asus TUF Gaming, Acer
                Nitro, Acer Aspire, Dell Inspiron, Dell Vostro, Dell XPS, MSI
                GF63, MSI GF65, MSI Prestige, MSI Stealth, Xiaomi Redmibook,
                Infinix Inbook, Axioo, Mybook dan lain-lain.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
