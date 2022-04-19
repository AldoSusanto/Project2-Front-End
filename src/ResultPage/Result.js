import React from "react";
import { Helmet } from "react-helmet";
import { Fragment } from "react";
import emailjs from "emailjs-com";
import Menubar from "../Menubar";
import axios from "axios";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CryptoJS from "crypto-js";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import shoppingCartPng from "../assets/shopping-cart.png";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MdCircle } from "react-icons/md";
import Carousel from "nuka-carousel";

class Result extends React.Component {
  constructor(props) {
    super(props);
    var resultJson = {
      priceRange: "10-15",
      pricePref: "medium",
      activities: ["videoConference"],
      operatingSystem: [],
      film: {
        method: "",
        hd: "",
      },
      imageGraphics: {
        software: [],
        image: {
          quality: "",
          hd: "",
        },
      },
      gaming: {
        software: [],
      },
      videoEditing: {
        software: [],
        hd: "",
      },
      threeDGraphics: {
        software: [],
      },
      size: "15",
      weight: ["light", "light"],
      touchScreen: "",
      brand: ["noPref"],
    };
    this.state = {
      name: "",
      email: "",
      number: "",
      result: this.props.location.state,
      highlight: this.highlightDefault,
      recommendations: {},
      highlightedIndex: 0,
      showModal: true,
      initialResult: resultJson,
      showDetail: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  // Call Backend for recommendations
  componentDidMount() {
    var reqBody;
    if (this.state.result == undefined) {
      reqBody = this.state.initialResult;
    } else {
      reqBody = this.state.result;
    }
    axios
      .post("https://api.propicks.id/v1/recommendation", reqBody)
      // axios
      //   .post("http://127.0.0.1:8080/v1/recommendation", reqBody)
      .then((res) => {
        this.setState({
          recommendations: res,
        });
      });
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    var recList = this.state.recommendations.data;
    var reqBody = this.state.result;
    var prefix_wa =
      "Hello Propicks, saya ingin mencari laptop yang tepat untuk saya ! Code:\n\n";
    var prefix_url = "https://wa.me/6287868572240?text=";
    var laptopImages = [];

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(reqBody),
      "ppid"
    ).toString();

    prefix_url =
      "https://wa.me/6287868572240?text=" +
      encodeURIComponent(prefix_wa + ciphertext);

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
        {/* {resultsPage} */}
        <div className="result-container">
          {typeof recList !== "undefined" ? (
            <div id="result" className="result">
              <aside className="result-sidebar">
                <h3 className="result-sidebar-title">Jawaban Kamu</h3>
                <div className="result-sidebar-body">
                  <div className="quizAnswer">
                    <h5 className="quizAnswer-title">Budget</h5>
                    <p className="quizAnswer-price">{`${
                      reqBody.priceRange !== "budgetUnknown"
                        ? `${reqBody.priceRange} Juta`
                        : `Belum tahu - ${
                            reqBody.pricePref === "LOW"
                              ? "Pilihkan laptop dengan spesifikasi budget friendly"
                              : reqBody.pricePref === "MEDIUM"
                              ? "Pilihkan laptop dengan spesifikasi recommended"
                              : "Pilihkan laptop dengan spesifikasi maximal"
                          }`
                    }`}</p>
                  </div>
                  <div className="quizAnswer">
                    <h5 className="quizAnswer-title">Aktivitas</h5>
                    <span className="quizAnswer-item">
                      {reqBody.activities.map((item) => {
                        return (
                          <p>
                            <MdCircle className="icon-circle" />{" "}
                            {item === "videoConference"
                              ? "Video Conference"
                              : ""}
                            {item === "surfInternet" ? "Browsing Internet" : ""}
                            {item === "watchFilm" ? "Nonton Film" : ""}
                            {item === "Microsoft Office"
                              ? "Microsoft Office"
                              : ""}
                            {item === "imageGraphics"
                              ? "Image Editing atau 2D Graphics Design"
                              : ""}
                            {item === "programming" ? "Programming" : ""}
                            {item === "gaming" ? "Gaming" : ""}
                            {item === "streaming" ? "Streaming to Public" : ""}
                            {item === "videoEdit" ? "Video Editing" : ""}
                            {item === "3dGraphics" ? "3D Graphics Design" : ""}
                          </p>
                        );
                      })}
                    </span>
                  </div>
                  <div className="quizAnswer">
                    <h5 className="quizAnswer-title">Brand Laptop</h5>
                    <span className="quizAnswer-item">
                      {reqBody.brand.map((item) => {
                        return (
                          <p>
                            <MdCircle className="icon-circle" />{" "}
                            {item === "noPref" ? "Brand Apa Saja" : item}
                          </p>
                        );
                      })}
                    </span>
                  </div>
                </div>
              </aside>
              <main className="result-main">
                <h1 className="result-main-title">
                  Top 10 Laptop Yang Sesuai Dengan Kamu
                </h1>
                <div className="result-main-body">
                  {recList !== undefined ? (
                    recList.map((item, idx) => {
                      return (
                        <div key={item.id} className="result-main-item">
                          <span className="laptop-num">{idx + 1}.</span>
                          <div className="result-main-item-img">
                            <h4 className="desc-name">{item.name}</h4>
                            {laptopImages.length > 1 ? (
                              <div className="slider-image-container">
                                <Carousel
                                  renderCenterLeftControls={({
                                    previousSlide,
                                  }) => (
                                    <button
                                      onClick={previousSlide}
                                      className="slider-prev-btn"
                                    >
                                      <HiChevronLeft className="icon-left" />
                                    </button>
                                  )}
                                  renderCenterRightControls={({
                                    nextSlide,
                                  }) => (
                                    <button
                                      onClick={nextSlide}
                                      className="slider-next-btn"
                                    >
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
                                    .map((item, index) => (
                                      <img
                                        key={`Slide ${index}`}
                                        src={item}
                                        alt="Highlighted Laptop"
                                        className="carousel-img"
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
                          <div className="result-main-item-desc">
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
                                <strong>Storage: </strong>{" "}
                                {`${item.storageOne} GB`}
                              </p>
                              <p>
                                <strong>Graphics: </strong> {item.graphics}
                              </p>
                              <p>
                                <strong>Display: </strong> {`${item.size} "`}
                              </p>
                              <p>
                                <strong>Weight: </strong>{" "}
                                {`${item.weightGrams} kg`}
                              </p>
                            </div>
                            <div className="desc-btn">
                              {item.link
                                .filter((link) => link.linkFrom !== "")
                                .map((originalLink) => {
                                  return (
                                    <a
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
                          <div className="result-main-item-insights">
                            {item.insights.map((insight) => {
                              return (
                                <Popup
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
              </main>
            </div>
          ) : (
            <>
              {typeof recList === "undefined" ? (
                <div className="loading-page">
                  <h1>
                    Mohon menunggu <br /> Sedang mencari hasil yang terbaik
                    untukmu...
                  </h1>
                  <Loader
                    className="loader"
                    type="TailSpin"
                    color="#fff"
                    height={100}
                    width={100}
                    timeout={100000}
                  />
                </div>
              ) : (
                <div className="loading-page">
                  <h1>Oops, ini memalukan :(</h1>
                  <h2>
                    Kami tidak berhasil menemukan laptop yang cocok dengan
                    pilihanmu
                    <br /> Coba mengulang quiznya lagi
                  </h2>
                  <p>
                    Tip: Coba naikan budgetmu sedikit untuk memperluas pilihan
                    kamu
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <Modal
          centered
          size="md"
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
        >
          <ModalBody className="modal-main">
            <HiX onClick={this.toggleModal} className="icon-close" />
            <p className="modal-main-top">
              Jangan lupa untuk menaruh laptop yang kamu suka di keranjang
              Tokopediamu
            </p>
            <img
              src={shoppingCartPng}
              alt="Masukkan ke Keranjang Belanja-mu"
              className="modal-main-mid"
            />
            <p className="modal-main-bottom">
              Setiap pembelanjaan laptop dari anda akan membantu Propicks
              bertumbuh di masa depan
            </p>
          </ModalBody>
          <ModalFooter>
            <button onClick={this.toggleModal} className="modal-footer-btn">
              OK
            </button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }

  // Deprecated
  handleChange(event) {
    switch (event.target.name) {
      case "name":
        this.setState({ name: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "phoneNumber":
        this.setState({ number: event.target.value });
        break;
      default:
        break;
    }
  }

  // Deprecated
  handleSubmit(event) {
    this.sendEmail();
    event.preventDefault();
    this.props.history.push("/");
  }

  // When user clicks on a laptop, we highlight that laptop
  // Deprecated
  changeHighlight(event, index) {
    this.setState({
      highlightedIndex: index,
    });
  }

  // Deprecated
  sendEmail() {
    var emailBody = {
      result: JSON.stringify(this.state, null, "\t"),
    };

    emailjs
      .send(
        "service_g809v3k",
        "template_zojc7es",
        emailBody,
        "user_oSPyVlq4AURjfm7xfmjl3"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
}

export default Result;
