import React from 'react';
import {Helmet} from 'react-helmet';
import { Fragment } from 'react';
import emailjs from 'emailjs-com';
import Menubar from '../Menubar';
import axios from 'axios';
import { Button, Icon, Item, Label } from 'semantic-ui-react'
import CurrencyFormat from 'react-currency-format';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

class Result extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            number: '',
            result: this.props.location.state,
            highlight: this.highlightDefault,
            recommendations: {},
            highlightedIndex: 0,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Call Backend for recommendations
    componentDidMount() {
        var reqBody = this.state.result;

        axios.post('https://api.propicks.id/v1/recommendation', reqBody)
        // axios.post('http://127.0.0.1:8080/v1/recommendation', reqBody)
        .then(res => {
            this.setState({
                recommendations: res
            })    
            // console.log(res.data);
        })
    }

    // When user clicks on a laptop, we highlight that laptop
    changeHighlight(event, index) {
        this.setState({
            highlightedIndex: index
        })
    }

    render() {
        var recList = this.state.recommendations.data;
        var itemList = [];
        var itemDescription = [];
        var itemImage = [];
        var highlightedItem = {};
        var resultsPage = [];
        var itemLinks = [];

        if(typeof(recList) !== 'undefined'){
            console.log("reclist: " + recList.length);
            if(recList.length > 0){
                // Populate Laptop List on left side of page
                for(const[index, value] of recList.entries()){
                    itemList.push(
                        <Item.Group divided >
                            <Item className={`itemList ${index == this.state.highlightedIndex ? "selectedItem" : "" }`} onClick={(e) => this.changeHighlight(e, index)}>
                                <Item.Image src={value.imageLink[0]} />
                                <Item.Content>
                                    <Item.Header as='string'>{value.name}</Item.Header>
                                    <Item.Meta>
                                    <span className='price'><CurrencyFormat value={value.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></span>
                                    </Item.Meta>
                                    <Item.Extra>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    )
                }

                highlightedItem = recList[this.state.highlightedIndex];

                // Populate the links(green button) for the highlightedItem
                for(const[index, value] of highlightedItem.link.entries()){
                    if(value.link.trim() != "" ){ //if link is empty
                        // console.log("linkfrom", value.linkFrom);
                        itemLinks.push(
                            <a href={value.link} target="_blank">
                            <Button floated='right' className={`item-desc-btn ${value.linkFrom}`}>
                                {`Visit ${value.linkFrom}`}
                                <Icon name='right chevron' />
                            </Button>
                        </a>
                        );
                    }
                }

                // Populate Laptop Description on right side of page
                itemDescription.push(
                    <Item.Group divided className="itemDesc">
                        <Item>
                            <Item.Content>
                                <Item.Header as='a' className="title">{highlightedItem.name}</Item.Header>
                                <Item.Meta>
                                    <span className='price'><CurrencyFormat value={highlightedItem.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></span>
                                </Item.Meta>
                                <Item.Description className="item-desc-box"><b>Processor: </b> {highlightedItem.processor} <br/> <b>RAM: </b> {highlightedItem.ram}GB <br /> <b>Graphics Card:</b> {highlightedItem.graphics} </Item.Description>
                                <Item.Extra>
                                <Label icon='gamepad' content='Powerful for gaming' />
                                <Label icon='briefcase' content='Suitable for Travel' />
                                {itemLinks}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                )

                itemImage.push(
                    <img className="laptop-img" src={highlightedItem.imageLink[0]} alt="Highlighted Laptop"/>    
                )
                
                // Compile all components 
                resultsPage.push(
                    <div id="result" className="row result-home">
                        <div className="col-lg-5 panel">
                            <h1>Here are <br />Our top 10 picks for you</h1>
                            <hr className="hr-line"/>
                            <div className="result-text">
                                {itemList}
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="row">
                                {itemImage}
                            </div>
                            <div className="row">
                                {itemDescription}
                            </div>
                        </div>
                    </div>
                )
            } else { // If BE returns empty list
                resultsPage.push(
                    <div className="row loading-page">
                        <h1>Oops, ini memalukan :(</h1>
                        <h2>Kami tidak berhasil menemukan laptop yang cocok dengan pilihanmu<br /> Coba mengulang quiznya lagi</h2>
                        <p>Tip: Coba naikan budgetmu sedikit untuk memperluas pilihan kamu</p>
                    </div>
                )
            }
        }else {
            resultsPage.push(
                <div className="row loading-page">
                    <h1>Mohon menunggu <br/> Sedang mencari hasil yang terbaik untukmu...</h1>
                    <Loader className="loader" type="TailSpin" color="#fff" height={100} width={100} timeout={100000} />
                </div>
            )
        }

        return(
            <Fragment>
                <Helmet><title>ProPicks - Results</title></Helmet>
                <Menubar />
                {resultsPage}
            </Fragment>
        )
    }

    // Deprecated
    handleChange(event) {
        switch (event.target.name){
            case 'name':
                this.setState({name: event.target.value})
                break;
            case 'email':
                this.setState({email: event.target.value})
                break;
            case 'phoneNumber':
                this.setState({number: event.target.value})
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
            result: JSON.stringify(this.state, null, "\t")
        }

        emailjs.send('service_g809v3k', 'template_zojc7es', emailBody, 'user_oSPyVlq4AURjfm7xfmjl3')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }
}

export default Result;
