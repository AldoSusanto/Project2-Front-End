import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Menubar from "../Menubar";
import Footer from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formIcon from "../assets/form-icon-nobg.png";
import smileIcon from "../assets/smile-nobg.png";
import addInformationPng from "../assets/add-information.png";
import programmingPng from "../assets/programming.png";
import checkingBoxesPng from "../assets/checking-boxes.png";
import partnersPng from "../assets/partners.png";
import homeImg from "../assets/image-1.png";
import { Popup } from "semantic-ui-react";
import HeadlineHighlight from "../components/HeadlineHighlight";
import { TiShoppingCart } from "react-icons/ti";

var prefix_url =
  "https://wa.me/6287868572240?text=Hello%20Propicks%2C%20saya%20ingin%20mencari%20laptop%20yang%20tepat%20untuk%20saya%20%21%20%3AD";

const Home = () => {
  const [isVisible, setIsVisible] = useState(0);

  useEffect(() => {
    if (isVisible >= 0 && isVisible !== 5) {
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
      <Menubar />

      {/* Cover Page */}
      <div className="main">
        <div
          className="alert alert-success position-absolute promo-banner col-12 text-center"
          role="alert"
        >
          Ngobrol dengan kami via WA secara gratis dan dapatkan cashback hingga &nbsp;{" "}
          <strong> Rp. 500,000 !! </strong>
        </div>
        <div id="home" className="row">
          <div className="col-12 col-md-6 col-xl-8 text-center">
            <h1 className="headline">
              Cari Laptop Untuk <br />
              <HeadlineHighlight />
            </h1>
            <div className="d-block d-md-none">
              <img
                className="hero-img"
                src={homeImg}
                alt="Rekomendasi Laptop dari Propicks"
              />
            </div>
            <p>
              Isi quiz kami dan dapatkan rekomendasi{" "}
              <br className="d-none d-sm-block"></br> laptop yang tepat untukmu
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
              alt="Rekomendasi Laptop dari Propicks"
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
            <div className="col-12 col-md-3 text-center my-5 my-md-0">
              <h3 className="text-center">Step 2</h3>
              <FontAwesomeIcon icon="search-dollar" className="HIW-icons" />
              <h3 className="HIW-title text-center">
                Kami rekomendasikan <br /> laptop terbaik untukmu
              </h3>
            </div>
            <div className="col-12 col-md-3 text-center mt-2 mb-5 mt-md-0">
              <h3 className="text-center">Step 3</h3>
              <TiShoppingCart className="HIW-icons" />
              <h3 className="HIW-title text-center">
                Tambahkan laptop <br /> di keranjang
              </h3>
            </div>
            <div className="col-12 col-md-3 text-center mt-2 mt-md-0">
              <h3 className="text-center">Step 4</h3>
              <img className="iconImage" src={smileIcon} alt=""></img>
              <h3 className="HIW-title text-center">
                Beli laptop impianmu <br /> dan enjoy !
              </h3>
            </div>
          </div>
        </div>

        {/* Partner Propicks Page */}
        <div className="partner-propicks row">
          <div className="col-12 col-lg-6 partner-propicks-info">
            <h5>Affiliate Partner Propicks</h5>
            <p>
              Propicks telah membangun kerja sama affiliate dengan beberapa
              partner terpercaya agar kamu dapat mencari laptop dengan aman dan
              nyaman.
            </p>
          </div>
          <div className="col-12 col-lg-6 partner-propicks-img">
            <img src={partnersPng} alt="Rekomendasi Laptop terbaik untukmu" />
          </div>
        </div>

        {/* About Page */}
        <div className="about">
          <h5 className="">
            <FontAwesomeIcon icon="search" className="icon-search" />
            Yuk mengenal lebih dalam tentang Propicks
          </h5>
          <div className="row about-row">
            <div className="col-12 col-lg-6 about-header d-flex flex-column-reverse flex-lg-column justify-content-center align-items-center">
              <h4>
                Apa itu <span className="border-blue">Propicks?</span>
              </h4>
              <img
                src={addInformationPng}
                alt="Pelajar, gamers, desainer, editor cari laptop"
              />
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
            <div className="col-12 col-lg-6 about-header d-flex flex-column-reverse flex-lg-column justify-content-center align-items-center">
              <h4>
                Visi <span className="border-red">Propicks</span>
              </h4>
              <img src={programmingPng} alt="" />
            </div>
          </div>
          <div className="row about-row">
            <div className="col-12 col-lg-6 about-header d-flex flex-column-reverse flex-lg-column justify-content-center align-items-center">
              <h4 className="text-center">
                Rekomendasi & Review{" "}
                <span className="border-green">Propicks</span>
              </h4>
              <img
                src={checkingBoxesPng}
                alt="Rekomendasi Laptop terbaik 2022"
              />
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

        {/* Call To Action */}
        <div className="call-to-action d-flex flex-column flex-md-row justify-content-center align-items-center">
          <h5>Sudah siap mencari laptop impianmu?</h5>
          <Link to={`/play`}>
            <button type="button" name="button" className="btn btn-success">
              Mulai Quiz
            </button>
          </Link>
        </div>
        <Footer />
        <Popup
          inverted
          content="Dapatkan konsultasi gratis dari tim professional kami dari Whatsapp !"
          trigger={
            <a
              href={prefix_url}
              className="whatsapp-float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-whatsapp whatsapp-icon"></i>
            </a>
          }
        />
      </div>
    </Fragment>
  );
};

export default Home;
