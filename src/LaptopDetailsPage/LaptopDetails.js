import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Icon, Label, Loader, Popup } from "semantic-ui-react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Carousel from "nuka-carousel";
import Menubar from "../Menubar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import { BsShieldFillCheck } from "react-icons/bs";

const LaptopDetails = (props) => {
  const { slug } = useParams();
  const reqBody = props.location.state;
  const [laptopDetail, setLaptopDetail] = useState({});

  useEffect(() => {
    const fetchLaptopDetail = async (body) => {
      if (body) {
        const { data } = await axios.post(
          `https://api.propicks.id/v1/sponsor-laptops/${slug}`,
          body
        );
        setLaptopDetail(data);
      } else {
        const { data } = await axios.post(
          `https://api.propicks.id/v1/sponsor-laptops/${slug}`
        );
        setLaptopDetail(data);
      }
    };
    if (reqBody) {
      fetchLaptopDetail(reqBody);
    } else {
      fetchLaptopDetail();
    }
  }, [reqBody, slug]);

  const SponsorshipLabel = (props) => (
    <>
      {!props.isSponsored ? (
        <div className="sponsorshipLabel">
          <BsShieldFillCheck className="sponsorshipLabel-icon" />
          <span className="sponsorshipLabel-info">
            <span className="sponsorshipLabel-title">Trusted Partner</span>
          </span>
        </div>
      ) : null}
    </>
  );

  return (
    <Fragment>
      <Helmet>
        <title>ProPicks - Top 10 Laptop khusus untukmu</title>
      </Helmet>
      <Menubar />
      <div
        className="alert alert-success promo-banner col-xs-1 text-center"
        role="alert"
      >
        Masih bingung? Ngobrol dengan kami via WA secara gratis dan dapatkan
        cashback hingga &nbsp; <strong> Rp. 500,000 !! </strong>
      </div>
      {Object.keys(laptopDetail).length !== 0 ? (
        <div className="laptopDetails">
          <div className="laptopDetails-img">
            <span className="desc-name">
              <h4>{laptopDetail.laptop.name}</h4>
            </span>
            {laptopDetail.laptop.imageLink.length > 1 ? (
              <div className="slider-image-container">
                <Carousel
                  renderCenterLeftControls={({ previousSlide }) => (
                    <button onClick={previousSlide} className="slider-prev-btn">
                      <HiChevronLeft className="icon-left" />
                    </button>
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <button onClick={nextSlide} className="slider-next-btn">
                      <HiChevronRight className="icon-right" />
                    </button>
                  )}
                  defaultControlsConfig={{
                    pagingDotsClassName: "dots-custom",
                  }}
                  width="100%"
                  dragging
                  swiping
                >
                  {laptopDetail.laptop.imageLink
                    .filter((url) => url !== "")
                    .map((img, index) => (
                      <img
                        key={`Slide ${index}`}
                        src={img}
                        alt="Highlighted Laptop"
                        className="carousel-img"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                </Carousel>
              </div>
            ) : (
              <img
                className="laptop-img"
                src={laptopDetail.laptop.imageLink[0]}
                alt="Highlighted Laptop"
              />
            )}
          </div>
          <div className="laptopDetails-desc">
            <p className="desc-price">
              <CurrencyFormat
                value={laptopDetail.laptop.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp. "}
              />
            </p>
            <div className="desc-specs">
              <p>
                <strong>Processor: </strong> {laptopDetail.laptop.processor}
              </p>
              <p>
                <strong>RAM: </strong> {`${laptopDetail.laptop.ram} GB`}
              </p>
              <p>
                <strong>Storage: </strong>{" "}
                {`${laptopDetail.laptop.totalStorage} GB`}
              </p>
              <p>
                <strong>Graphics: </strong> {laptopDetail.laptop.graphics}
              </p>
              <p>
                <strong>Display: </strong> {`${laptopDetail.laptop.size} "`}
              </p>
              <p>
                <strong>Weight: </strong>{" "}
                {`${laptopDetail.laptop.weightGrams} kg`}
              </p>
            </div>
            <div className="desc-btn">
              {laptopDetail.laptop.link
                .filter((link) => link.linkFrom !== "")
                .map((originalLink, linkIdx) => {
                  return (
                    <Fragment key={linkIdx}>
                      <a
                        href={originalLink.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          className={`item-desc-btn ${originalLink.linkFrom}`}
                        >
                          {`${laptopDetail.buttonMessage}`}
                          <Icon name="right chevron" />
                        </Button>
                      </a>
                    </Fragment>
                  );
                })}
            </div>
          </div>
          <div className="laptopDetails-insights">
            {laptopDetail.laptop.insights !== null &&
              laptopDetail.laptop.insights.map((insight, insightIdx) => {
                return (
                  <Popup
                    key={insightIdx}
                    inverted
                    content={insight.description}
                    trigger={
                      <Label
                        className={`insights-item insights-label ${
                          insight.type === "Positive"
                            ? "insights-positive"
                            : "insights-negative"
                        }`}
                        size="medium"
                      >
                        <FontAwesomeIcon icon={insight.icon} />
                        {" " + insight.title}
                      </Label>
                    }
                  />
                );
              })}
          </div>
          <div className="laptopDetails-review">
            <SponsorshipLabel isSponsored={laptopDetail.laptop.isSponsored} />
            {laptopDetail.laptop.reason ? (
              <div className="laptopDetails-review-reason">
                <p>
                  <b>Alasan: </b>
                  {laptopDetail.laptop.reason}
                </p>
              </div>
            ) : null}
            {laptopDetail.laptop.review !== "-" ? (
              <div className="laptopDetails-review-comments">
                <span className="laptopDetails-review-comments-title">
                  <h6>Propicks Comments</h6>
                </span>
                <p className="laptopDetails-review-comments-content">
                  {laptopDetail.laptop.review}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <Loader
          className="loader"
          type="TailSpin"
          color="#fff"
          height={100}
          width={100}
          timeout={100000}
        />
      )}
    </Fragment>
  );
};

export default LaptopDetails;
