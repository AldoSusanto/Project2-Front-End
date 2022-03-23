import React from "react";
import { Helmet } from "react-helmet";
import { Fragment } from "react";
import emailjs from "emailjs-com";
import Menubar from "../Menubar";
import axios from "axios";
import { Button, Icon, Item, Label, Popup } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CryptoJS from "crypto-js";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import shoppingCartPng from "../assets/shopping-cart.png";
import { HiX } from "react-icons/hi";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      number: "",
      result: this.props.location.state,
      highlight: this.highlightDefault,
      recommendations: {},
      highlightedIndex: 0,
      showModal: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  // Call Backend for recommendations
  componentDidMount() {
    var reqBody = this.state.result;

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

  // When user clicks on a laptop, we highlight that laptop
  changeHighlight(event, index) {
    this.setState({
      highlightedIndex: index,
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
    var itemList = [];
    var itemDescription = [];
    var itemImage = [];
    var highlightedItem = {};
    var resultsPage = [];
    var itemLinks = [];
    var insightsList = [];
    var prefix_wa =
      "Hello Propicks, saya ingin mencari laptop yang tepat untuk saya ! Code:\n\n";
    var prefix_url = "https://wa.me/6287868572240?text=";

    if (typeof recList !== "undefined") {
      // Encrypt
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(reqBody),
        "ppid"
      ).toString();

      prefix_url =
        "https://wa.me/6287868572240?text=" +
        encodeURIComponent(prefix_wa + ciphertext);

      if (recList.length > 0) {
        // Populate Laptop List on left side of page
        for (const [index, value] of recList.entries()) {
          itemList.push(
            <Item.Group divided>
              <Item
                className={`itemList ${
                  index === this.state.highlightedIndex ? "selectedItem" : ""
                }`}
                onClick={(e) => this.changeHighlight(e, index)}
              >
                <Item.Image src={value.imageLink[0]} />
                <Item.Content>
                  <Item.Header as="strong">{value.name}</Item.Header>
                  <Item.Meta>
                    <span className="price">
                      <CurrencyFormat
                        value={value.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </span>
                  </Item.Meta>
                  <Item.Extra></Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
          );
        }

        highlightedItem = recList[this.state.highlightedIndex];

        // Populate the links(green button) for the highlightedItem
        for (const [index, value] of highlightedItem.link.entries()) {
          if (value.link.trim() !== "") {
            //if link is empty
            // console.log("linkfrom", value.linkFrom);
            itemLinks.push(
              <a href={value.link} target="_blank" rel="noopener noreferrer">
                <Button className={`item-desc-btn ${value.linkFrom}`}>
                  {`Visit ${value.linkFrom}`}
                  <Icon name="right chevron" />
                </Button>
              </a>
            );
          }
        }

        for (const [index, value] of highlightedItem.insights.entries()) {
          insightsList.push(
            <Popup
              inverted
              content={value.description}
              trigger={
                <Label
                  className="insights-item insights-label"
                  size="large"
                  color={value.type === "Positive" ? "green" : "red"}
                >
                  <FontAwesomeIcon icon={value.icon} />
                  {" " + value.title}
                </Label>
              }
            />
          );
        }

        // Populate Laptop Description on right side of page
        itemDescription.push(
          <Item.Group key={highlightedItem.id} divided className="itemDesc">
            <Item>
              <Item.Content>
                <Item.Header as="a" className="title">
                  {highlightedItem.name}
                </Item.Header>
                <Item.Meta>
                  <span className="price">
                    <CurrencyFormat
                      value={highlightedItem.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                    />
                  </span>
                </Item.Meta>
                <Item.Description className="item-desc-box">
                  <b>Processor: </b> {highlightedItem.processor} <br />{" "}
                  <b>RAM: </b> {`${highlightedItem.ram} GB`} <br />{" "}
                  <b>Storage:</b> {`${highlightedItem.storageOne} GB`} <br />{" "}
                  <b>Graphics:</b> {highlightedItem.graphics}
                  <br /> <b>Display</b> {`${highlightedItem.size} "`} <br />{" "}
                  <b>Weight:</b> {`${highlightedItem.weightGrams} kg`}{" "}
                </Item.Description>
                <Item.Extra className="d-flex align-items-center justify-content-center">
                  {itemLinks}
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        );

        itemImage.push(
          <img
            className="laptop-img"
            src={highlightedItem.imageLink[0]}
            alt="Highlighted Laptop"
          />
        );

        // Compile all components
        resultsPage.push(
          <div id="result" className="row result-home">
            <div className="col-12 col-lg-5 order-2 order-lg-0 panel">
              <h1 className="d-none d-lg-block">
                Top 10 Laptops <br />
                Yang Sesuai Denganmu
              </h1>
              <hr className="hr-line d-none d-lg-block" />
              <div className="result-text">{itemList}</div>
            </div>
            <div className="mt-4 mb-5 my-lg-0 col-12 col-lg-7 order-1 order-lg-0">
              <div className="row mt-lg-5">
                <div className="col-6 d-flex justify-content-center align-items-center">
                  {itemImage}
                </div>
                <div className="itemDesc-container col-6 d-flex justify-content-center align-items-center">
                  {itemDescription}
                </div>
              </div>

              <div className="row insights-parent">
                <div className="insights-container col-12 col-lg-7 ml-md-0 ml-xl-4 pt-2 pt-xl-4 justify-content-start d-flex flex-wrap">
                  {insightsList}
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
              </div>
            </div>
          </div>
        );
      } else {
        // If BE returns empty list
        resultsPage.push(
          <div className="row loading-page">
            <h1>Oops, ini memalukan :(</h1>
            <h2>
              Kami tidak berhasil menemukan laptop yang cocok dengan pilihanmu
              <br /> Coba mengulang quiznya lagi
            </h2>
            <p>
              Tip: Coba naikan budgetmu sedikit untuk memperluas pilihan kamu
            </p>
          </div>
        );
      }
    } else {
      resultsPage.push(
        <div className="row loading-page">
          <h1>
            Mohon menunggu <br /> Sedang mencari hasil yang terbaik untukmu...
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
      );
    }

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
          Konsultasi dengan kami via WA dan dapatkan cashback hingga &nbsp;{" "}
          <strong> Rp. 500,000 !! </strong>
        </div>
        {resultsPage}
        <Modal
          centered
          size="md"
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
        >
          <ModalBody className="modal-main">
            <HiX className="icon-close" />
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
