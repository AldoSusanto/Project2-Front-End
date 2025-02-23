import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Fragment } from "react";
import emailjs from "emailjs-com";
import Menubar from "../Menubar";
import axios from "axios";
import { Popup } from "semantic-ui-react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import CryptoJS from "crypto-js";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import shoppingCartPng from "../assets/shopping-cart.png";
import { HiX } from "react-icons/hi";
import officialIcon from "../assets/official-store.png";
import ResultAnswer from "../components/result/ResultAnswer";
import EmailFeatured from "../components/result/EmailFeatured";
import ToastAlert from "../components/result/ToastAlert";
import LaptopList from "../components/result/LaptopList";
import FeedbackModal from "../components/FeedbackModal";

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
      showToastSuccess: false,
      showToastFailed: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleToastSuccess = this.toggleToastSuccess.bind(this);
    this.toggleToastFailed = this.toggleToastFailed.bind(this);
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
      //  .post("http://127.0.0.1:8080/v1/recommendation", reqBody)
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

  toggleToastSuccess() {
    this.setState({
      showToastSuccess: !this.state.showToastSuccess,
    });
  }

  toggleToastFailed() {
    this.setState({
      showToastFailed: !this.state.showToastFailed,
    });
  }

  render() {
    var recList = this.state.recommendations.data;
    var reqBody = this.state.result;
    var prefix_wa =
      "Hello Propicks, saya ingin mencari laptop yang tepat untuk saya ! Code:\n\n";
    var prefix_url = "https://wa.me/6287868572240?text=";

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
        <FeedbackModal reqBody={reqBody} />
        <div
          className="alert alert-success promo-banner col-xs-1 text-center"
          role="alert"
        >
          Masih bingung? Ngobrol dengan kami via WA secara gratis dan dapatkan
          cashback hingga &nbsp; <strong> Rp. 500,000 !! </strong>
        </div>
        <div className="result-container">
          {typeof recList !== "undefined" ? (
            <div id="result" className="result">
              <div className="sidebar">
                <ResultAnswer reqBody={reqBody} />
                <EmailFeatured
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
                <ToastAlert
                  toggleToastSuccess={this.toggleToastSuccess}
                  toggleToastFailed={this.toggleToastFailed}
                  showToastSuccess={this.state.showToastSuccess}
                  showToastFailed={this.state.showToastFailed}
                />
              </div>
              <main className="result-main">
                <h1 className="result-main-title">
                  Top 10 Laptop Yang Sesuai Dengan Kamu
                </h1>
                <LaptopList reqBody={reqBody} recList={recList} />
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

  handleSubmit(event) {
    event.preventDefault();

    try {
      this.sendEmail();
      this.setState({ showToastSuccess: !this.state.showToastSuccess });
    } catch (error) {
      this.setState({ showToastFailed: !this.state.showToastFailed });
      console.error(error);
    }
    // toast
  }

  // When user clicks on a laptop, we highlight that laptop
  // Deprecated
  changeHighlight(event, index) {
    this.setState({
      highlightedIndex: index,
    });
  }

  sendEmail() {
    var email = [];
    var emailHTML =
      "<!DOCTYPE html><html lang='en' xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:v='urn:schemas-microsoft-com:vml'><head><title></title><meta content='text/html; charset=utf-8' http-equiv='Content-Type'/><meta content='width=device-width, initial-scale=1.0' name='viewport'/><link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Abril+Fatface' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Merriweather' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Nunito' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Bitter' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Permanent+Marker' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Cabin' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Droid+Serif' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Playfair+Display' rel='stylesheet' type='text/css'/><link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet' type='text/css'/><style>*{box-sizing: border-box;}body{margin: 0;padding: 0;}a[x-apple-data-detectors]{color: inherit !important;text-decoration: inherit !important;}#MessageViewBody a{color: inherit;text-decoration: none;}p{line-height: inherit}@media (max-width:700px){.fullMobileWidth,.row-content{width: 100% !important;}.image_block img.big{width: auto !important;}.column .border{display: none;}table{table-layout: fixed !important;}.stack .column{width: 100%;display: block;}}</style></head><body style='background-color: #fafafa; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;'><table border='0' cellpadding='0' cellspacing='0' class='nl-container' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fafafa;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-1' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><div class='spacer_block' style='height:10px;line-height:10px;font-size:1px;'> </div></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-2' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1da1f2; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;'><div align='center' style='line-height:10px'><img src='https://propicks-assets.s3.ap-southeast-1.amazonaws.com/Original-wide-2.PNG' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' width='204'/></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-3' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;'><div align='center' style='line-height:10px'><img class='big' src='https://propicks-assets.s3.ap-southeast-1.amazonaws.com/Email-Hero-3.png' style='display: block; height: auto; border: 0; width: 680px; max-width: 100%;' width='680'/></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-4' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='50%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;'><div align='center' style='line-height:10px'><a href='1_LINK' style='outline:none' tabindex='-1' target='_blank'><img alt='Laptops' class='fullMobileWidth big' src='1_IMAGE' style='display: block; height: auto; border: 0; width: 221px; max-width: 100%;' title='Laptops' width='221'/></a></div></td></tr></table></td><td class='column column-2' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 30px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='50%'><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-top:20px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #1da1f2; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 30px;'><span style='font-size:20px;'><a href='1_LINK' rel='noopener' style='text-decoration: none; color: #0076da;' target='_blank'><strong>1_TITLE</strong></a></span></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #ffa500; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: left;'><strong><span style='font-size:20px;'><span class='tinyMce-placeholder' style=''><span class='tinyMce-placeholder' style=''>Rp. 1_PRICE</span></span></span></strong></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:15px;padding-right:10px;padding-top:10px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 21.6px; color: #636363; line-height: 1.8; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: left;'><strong>Processor: </strong>PROCESSOR_1<br/><strong>RAM: </strong>RAM_1<br/><strong>Storage:</strong> STORAGE_1<br/><strong>Graphics:</strong> GRAPHICS_1</p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-5' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f2f2f2; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 25px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='0' cellspacing='0' class='heading_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='text-align:center;width:100%;'><h1 style='margin: 0; color: #1da1f2; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 30px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;'><span class='tinyMce-placeholder'>AMAN DALAM MEMBELI</span></h1></td></tr></table><table border='0' cellpadding='20' cellspacing='0' class='paragraph_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='color:#393d47;direction:ltr;font-family:Poppins, Arial, Helvetica, sans-serif;font-size:20px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;'><p style='margin: 0;'>Untuk menjaga keamanan dalam membeli, semua rekomendasi berasal dari <span style='color: #1da1f2;'><strong>Tokopedia Official Stores</strong></span></p></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-6' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='33.333333333333336%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;'><div align='center' style='line-height:10px'><a href='2_LINK' style='outline:none' tabindex='-1' target='_blank'><img alt='Laptops' class='fullMobileWidth big' src='2_IMAGE' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' title='Laptops' width='204'/></a></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #1da1f2; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center;'><a href='2_LINK' rel='noopener' style='text-decoration: none; color: #0076da;' target='_blank'><span style='font-size:14px;'>2_TITLE</span></a></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:5px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #ffa500; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;'><span style='font-size:14px;'><strong><span style=''><span class='tinyMce-placeholder' style=''><span class='tinyMce-placeholder' style=''>Rp. 2_PRICE</span></span></span></strong></span></p></div></div></td></tr></table></td><td class='column column-2' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='33.333333333333336%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;'><div align='center' style='line-height:10px'><a href='3_LINK' style='outline:none' tabindex='-1' target='_blank'><img alt='Laptops' class='fullMobileWidth big' src='3_IMAGE' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' title='Laptops' width='204'/></a></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #1da1f2; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center;'><a href='3_LINK' rel='noopener' style='text-decoration: none; color: #0076da;' target='_blank'><span style='font-size:14px;'>3_TITLE</span></a></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:5px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #ffa500; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;'><span style='font-size:14px;'><strong><span style=''><span class='tinyMce-placeholder' style=''><span class='tinyMce-placeholder' style=''>Rp. 3_PRICE</span></span></span></strong></span></p></div></div></td></tr></table></td><td class='column column-3' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='33.333333333333336%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;'><div align='center' style='line-height:10px'><a href='4_LINK' style='outline:none' tabindex='-1' target='_blank'><img alt='Laptops' class='fullMobileWidth big' src='4_IMAGE' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' title='Laptops' width='204'/></a></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #1da1f2; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center;'><a href='4_LINK' rel='noopener' style='text-decoration: none; color: #0076da;' target='_blank'><span style='font-size:14px;'>4_TITLE</span></a></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:5px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #ffa500; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;'><span style='font-size:14px;'><strong><span style=''><span class='tinyMce-placeholder' style=''><span class='tinyMce-placeholder' style=''>Rp. 4_PRICE</span></span></span></strong></span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-7' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='10' cellspacing='0' class='divider_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td><div align='center'><table border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td class='divider_inner' style='font-size: 1px; line-height: 1px; border-top: 3px solid #BBBBBB;'><span> </span></td></tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-8' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='33.333333333333336%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;'><div align='center' style='line-height:10px'><a href='5_LINK' style='outline:none' tabindex='-1' target='_blank'><img alt='Laptops' class='fullMobileWidth big' src='5_IMAGE' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' title='Laptops' width='204'/></a></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #1da1f2; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center;'><a href='5_LINK' rel='noopener' style='text-decoration: none; color: #0076da;' target='_blank'><span style='font-size:14px;'>5_TITLE</span></a></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:5px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #ffa500; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;'><span style='font-size:14px;'><strong><span style=''><span class='tinyMce-placeholder' style=''><span class='tinyMce-placeholder' style=''>Rp. 5_PRICE</span></span></span></strong></span></p></div></div></td></tr></table></td><td class='column column-2' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='33.333333333333336%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;'><div align='center' style='line-height:10px'><a href='6_LINK' style='outline:none' tabindex='-1' target='_blank'><img alt='Laptops' class='fullMobileWidth big' src='6_IMAGE' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' title='Laptops' width='204'/></a></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #1da1f2; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center;'><a href='6_LINK' rel='noopener' style='text-decoration: none; color: #0076da;' target='_blank'><span style='font-size:14px;'>6_TITLE</span></a></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:5px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #ffa500; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;'><span style='font-size:14px;'><strong><span style=''><span class='tinyMce-placeholder' style=''><span class='tinyMce-placeholder' style=''>Rp. 6_PRICE</span></span></span></strong></span></p></div></div></td></tr></table></td><td class='column column-3' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='33.333333333333336%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;'><div align='center' style='line-height:10px'><a href='7_LINK' style='outline:none' tabindex='-1' target='_blank'><img alt='Laptops' class='fullMobileWidth big' src='7_IMAGE' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' title='Laptops' width='204'/></a></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #1da1f2; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center;'><a href='7_LINK' rel='noopener' style='text-decoration: none; color: #0076da;' target='_blank'><span style='font-size:14px;'>7_TITLE</span></a></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:5px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #ffa500; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;'><span style='font-size:14px;'><strong><span style=''><span class='tinyMce-placeholder' style=''><span class='tinyMce-placeholder' style=''>Rp. 7_PRICE</span></span></span></strong></span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-9' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='10' cellspacing='0' class='divider_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td><div align='center'><table border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td class='divider_inner' style='font-size: 1px; line-height: 1px; border-top: 3px solid #BBBBBB;'><span> </span></td></tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-10' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='33.333333333333336%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;'><div align='center' style='line-height:10px'><a href='8_LINK' style='outline:none' tabindex='-1' target='_blank'><img alt='Laptops' class='fullMobileWidth big' src='8_IMAGE' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' title='Laptops' width='204'/></a></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #1da1f2; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center;'><a href='8_LINK' rel='noopener' style='text-decoration: none; color: #0076da;' target='_blank'>8_TITLE</a></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:5px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #ffa500; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;'><span style='font-size:14px;'><strong><span style=''><span class='tinyMce-placeholder' style=''><span class='tinyMce-placeholder' style=''>Rp. 8_PRICE</span></span></span></strong></span></p></div></div></td></tr></table></td><td class='column column-2' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='33.333333333333336%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;'><div align='center' style='line-height:10px'><a href='9_LINK' style='outline:none' tabindex='-1' target='_blank'><img alt='Laptops' class='fullMobileWidth big' src='9_IMAGE' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' title='Laptops' width='204'/></a></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #1da1f2; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center;'><a href='9_LINK' rel='noopener' style='text-decoration: none; color: #0076da;' target='_blank'>9_TITLE</a></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:5px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #ffa500; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;'><span style='font-size:14px;'><strong><span style=''><span class='tinyMce-placeholder' style=''><span class='tinyMce-placeholder' style=''>Rp. 9_PRICE</span></span></span></strong></span></p></div></div></td></tr></table></td><td class='column column-3' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='33.333333333333336%'><table border='0' cellpadding='0' cellspacing='0' class='image_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='width:100%;padding-right:0px;padding-left:0px;padding-top:5px;'><div align='center' style='line-height:10px'><a href='10_LINK' style='outline:none' tabindex='-1' target='_blank'><img alt='Laptops' class='fullMobileWidth big' src='10_IMAGE' style='display: block; height: auto; border: 0; width: 204px; max-width: 100%;' title='Laptops' width='204'/></a></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #1da1f2; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center;'><a href='10_LINK' rel='noopener' style='text-decoration: none; color: #0076da;' target='_blank'>10_TITLE</a></p></div></div></td></tr></table><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:5px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; mso-line-height-alt: 18px; color: #ffa500; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;'><p style='margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;'><span style='font-size:14px;'><strong><span style=''><span class='tinyMce-placeholder' style=''><span class='tinyMce-placeholder' style=''>Rp. 10_PRICE</span></span></span></strong></span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-11' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='10' cellspacing='0' class='divider_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td><div align='center'><table border='0' cellpadding='0' cellspacing='0' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td class='divider_inner' style='font-size: 1px; line-height: 1px; border-top: 3px solid #BBBBBB;'><span> </span></td></tr></table></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-12' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f2f2f2; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 25px; padding-bottom: 15px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='0' cellspacing='0' class='heading_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td style='padding-bottom:10px;padding-top:10px;text-align:center;width:100%;'><h1 style='margin: 0; color: #1da1f2; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 30px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;'><span class='tinyMce-placeholder' style='color: #43a877;'>Masih Bingung pilih yang mana?</span></h1></td></tr></table><table border='0' cellpadding='20' cellspacing='0' class='paragraph_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td><div style='color:#393d47;direction:ltr;font-family:Poppins, Arial, Helvetica, sans-serif;font-size:20px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;'><p style='margin: 0;'>Kontak kami via Whatsapp untuk konsultasi dengan kami secara <strong><span style='color: #43a877;'>gratis !</span></strong></p></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-13' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='0' cellspacing='0' class='text_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;' width='100%'><tr><td style='padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:15px;'><div style='font-family: sans-serif'><div class='txtTinyMce-wrapper' style='font-size: 12px; font-family: Poppins, Arial, Helvetica, sans-serif; mso-line-height-alt: 18px; color: #000000; line-height: 1.5;'><p style='margin: 0; font-size: 10px; text-align: center; mso-line-height-alt: 18px;'> </p><p style='margin: 0; font-size: 10px; text-align: center; mso-line-height-alt: 15px;'><span style='font-size:10px;'><span style=''>Email ini dibuat dan dikirim secara otomatis dari Propicks ID. </span></span><span style='font-size:10px;'><span style=''>Jika ada kendala, mohon hubungi: <a href='mailto:propicksid@gmail.com' rel='noopener' style='text-decoration: underline; color: #0076da;' target='_blank'>propicksid@gmail.com</a></span></span></p><p style='margin: 0; font-size: 10px; text-align: center; mso-line-height-alt: 15px;'><span style='font-size:10px;'><span style=''>Copyright © ProPicks | 2021.</span></span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table align='center' border='0' cellpadding='0' cellspacing='0' class='row row-14' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tbody><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' class='row-content stack' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;' width='680'><tbody><tr><td class='column column-1' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;' width='100%'><table border='0' cellpadding='0' cellspacing='0' class='empty_block' role='presentation' style='mso-table-lspace: 0pt; mso-table-rspace: 0pt;' width='100%'><tr><td><div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>";

    // ---- START Replace variables -----
    var recList = this.state.recommendations.data;

    emailHTML = emailHTML.replace("PROCESSOR_1", recList[0].processor);
    emailHTML = emailHTML.replace("RAM_1", recList[0].ram + " GB");
    emailHTML = emailHTML.replace("STORAGE_1", recList[0].storageOne + " GB");
    emailHTML = emailHTML.replace("GRAPHICS_1", recList[0].graphics);

    for (const [index, value] of recList.entries()) {
      var newVal = index + 1;
      emailHTML = emailHTML.replace(
        newVal + "_TITLE",
        "#" + newVal + " " + value.name
      );
      emailHTML = emailHTML.replace(newVal + "_PRICE", value.price);
      emailHTML = emailHTML.replaceAll(newVal + "_LINK", value.link[0].link);
      emailHTML = emailHTML.replace(newVal + "_IMAGE", value.imageLink[0]);
    }

    // ---- END Replace Variables -----
    email.push(emailHTML);
    var emailBody = {
      result: email[0],
      emailTo: this.state.email,
    };

    emailjs
      .send(
        "service_tmt7ecl",
        "template_zojc7es",
        emailBody,
        "user_oSPyVlq4AURjfm7xfmjl3"
      )
      .then(
        (result) => {
          console.log("Email sent: " + result.text);
        },
        (error) => {
          console.log("Email failed to send: " + error.text);
        }
      );
  }
}

export default Result;
