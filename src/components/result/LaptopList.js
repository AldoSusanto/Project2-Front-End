import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Icon, Label, Popup, Loader } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import Carousel from "nuka-carousel";
import { HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { BsShieldFillCheck } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const LaptopList = (props) => {
  const history = useHistory();

  // Route to details page
  // const handleLaptopDetails = (reqBody, data) => {
  //   history.push({
  //     pathname: `/laptop/${data.sponsorId}`,
  //     state: reqBody,
  //   });
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  const SponsorshipLabel = (props) => (
    <>
      {props.isSponsored ? (
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
    <div className="laptopList">
      {props.recList !== undefined ? (
        props.recList.map((item, idx) => {
          return (
            <div
              key={item.id}
              className={`laptopList-item ${
                //If current item is sponsored or the next item is sponsored, then we add orange border
                item.isSponsored ||
                (props.recList[idx + 1]
                  ? props.recList[idx + 1].isSponsored
                  : false)
                  ? "border-orange"
                  : ""
              } ${item.isSponsored ? "sponsorship-padding" : ""}`}
            >
              <span
                className={`laptop-num ${
                  item.isSponsored ? "sponsorship-num" : ""
                }`}
              >
                {idx + 1}.
              </span>
              <SponsorshipLabel isSponsored={item.isSponsored} />
              <div className="laptopList-item-img">
                <span
                  className={`desc-name ${
                    item.isSponsored ? "highlight-name" : ""
                  }`}
                >
                  <h4>{item.name}</h4>
                </span>
                {item.imageLink.length > 1 ? (
                  <div className="slider-image-container">
                    <Carousel
                      renderCenterLeftControls={({ previousSlide }) => (
                        <button
                          onClick={previousSlide}
                          className="slider-prev-btn"
                        >
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
                      {item.imageLink
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
                    src={item.imageLink[0]}
                    alt="Highlighted Laptop"
                  />
                )}
              </div>
              <div className="laptopList-item-desc">
                <p className="desc-price">
                  <CurrencyFormat
                    value={item.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                  />
                </p>
                <div className="desc-specs">
                  <p>
                    <strong>Processor: </strong> {item.processor}
                  </p>
                  <p>
                    <strong>RAM: </strong> {`${item.ram} GB`}
                  </p>
                  <p>
                    <strong>Storage: </strong> {`${item.storageOne} GB`}
                  </p>
                  <p>
                    <strong>Graphics: </strong> {item.graphics}
                  </p>
                  <p>
                    <strong>Display: </strong> {`${item.size} "`}
                  </p>
                  <p>
                    <strong>Weight: </strong> {`${item.weightGrams} kg`}
                  </p>
                </div>
                <div className="desc-btn">
                  {item.link
                    .filter((link) => link.link !== "" || link.linkFrom !== "")
                    .map((originalLink, linkIdx) => {
                      return (
                        <Fragment key={linkIdx}>
                          <a
                            href={originalLink.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              id={item.sponsorId}
                              className={
                                "item-desc-btn " +
                                (item.isSponsored ? "sponsor-button" : "")
                              }
                            >
                              {item.buttonMessage}
                              <Icon name="right chevron" />
                            </Button>
                          </a>
                        </Fragment>
                      );
                    })}
                </div>
              </div>
              <div className="laptopList-item-insights">
                {item.insights.map((insight, insightIdx) => {
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
              <div className="laptopList-item-review">
                {item.reason && item.isSponsored ? (
                  <div className="laptopList-item-review-reason">
                    <p>
                      <b>Alasan: </b>
                      {item.reason}
                    </p>
                  </div>
                ) : null}
                {item.review !== "-" ? (
                  <div className="laptopList-item-review-comments">
                    <Accordion className="accordion">
                      <AccordionSummary
                        expandIcon={<HiChevronDown className="icon-down" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="laptopList-item-review-comments-title"
                      >
                        <h6>Propicks Comments</h6>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className="laptopList-item-review-comments-content">
                          {item.review}
                        </p>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })
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
    </div>
  );
};

export default LaptopList;
