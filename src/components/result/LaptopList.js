import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Icon, Label, Popup, Loader } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import Carousel from "nuka-carousel";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const LaptopList = (props) => {
  return (
    <div className="laptopList">
      {props.recList !== undefined ? (
        props.recList.map((item, idx) => {
          return (
            <div key={item.id} className="laptopList-item">
              <span className="laptop-num">{idx + 1}.</span>
              <div className="laptopList-item-img">
                <h4 className="desc-name">{item.name}</h4>
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
                    .filter((link) => link.linkFrom !== "")
                    .map((originalLink, index) => {
                      return (
                        <a
                          key={`${originalLink}-${index}`}
                          href={originalLink.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            className={`item-desc-btn ${originalLink.linkFrom}`}
                          >
                            {`Visit ${originalLink.linkFrom}`}
                            <Icon name="right chevron" />
                          </Button>
                        </a>
                      );
                    })}
                </div>
              </div>
              <div className="laptopList-item-insights">
                {item.insights.map((insight, index) => {
                  return (
                    <Popup
                      key={`${insight.description}-${index}`}
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
