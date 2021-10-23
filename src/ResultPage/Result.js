import React from 'react';
import {Helmet} from 'react-helmet';
import { Fragment } from 'react';
import emailjs from 'emailjs-com';
import homeImage from '../assets/laptop-result.png';
import Menubar from '../Menubar';
import axios from 'axios';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            number: '',
            result: this.props.location.state,

            recommendations: {}
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var reqBody = this.state.result;

        console.log("calling BE");
        axios.post('http://localhost:8080/v1/recommendation', reqBody)
        .then(res => {
            this.setState({
                recommendations: res
            })    
            console.log("Finished calling BE");
            console.log(res);
        })
    }


    render() {
        var recList = this.state.recommendations.data;
        console.log("Reclist: ")
        console.log(recList);
        var itemList = [];

        if(typeof(recList) !== 'undefined'){
            for(const[index, value] of recList.entries()){
                itemList.push(
                    <Item.Group key={index} divided>
                        <Item>
                            <Item.Image src={value.imageLink} />
                            <Item.Content>
                                <Item.Header as='a'>{value.name}</Item.Header>
                                <Item.Meta>
                                <span className='cinema'> Rp. {value.price} </span>
                                </Item.Meta>
                                <Item.Description>Processor: {value.processor} <br/> RAM: {value.ram}GB <br /> Graphics Card: {value.graphics} </Item.Description>
                                <Item.Extra>
                                {/* <Label icon='gamepad' content='Powerful for gaming' />
                                <Label icon='briefcase' content='Suitable for Travel' />
                                <Label icon='users' content='Highly Reviewed' /> */}
                                <a href={value.link}>
                                    <Button primary floated='right'>
                                        Buy
                                        <Icon name='right chevron' />
                                    </Button>
                                </a>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                )
            }
        }

        // console.log(recList[0].imageLink);
        return(
            <Fragment>
                <Helmet><title>ProPicks - Results</title></Helmet>
                <Menubar />
                <div id="result" className="row">
                    <Menubar/>
                    <div className="col-lg-8 result-text">
                        <h1>Last step !</h1>
                        <div className="wrapper">
                            <form onSubmit={this.handleSubmit} class="form-inline form-custom">
                                <div class="form-group mx-sm-3 mb-2">
                                    <input type="email" name="email" class="form-control email-field" placeholder="Enter your email address" onChange={this.handleChange} />
                                </div>
                                <button type="submit" class="btn btn-outline-light mb-2">Send</button>
                            </form>
                        </div>  
                        <h3>Silahkan tulis emailmu agar kami bisa <br></br>mengirim rekomendasi laptop yang tepat<br></br>untukmu dalam 1-2 hari</h3>
                        <p>*Email anda tidak akan digunakan untuk keperluan lain diluar rekomendasi laptop</p>
                    </div>
                    <div className="col-lg-4 position-relative">
                        <img className="laptop-img" src={homeImage} alt="Email sent from propicks for laptop recommendation"/>
                    </div>
                </div>

                {typeof(recList) !== 'undefined' && 
                    <div className="results" id="results">
                        <div className="row HIW-row ">
                            <div className="col-md-12 text-center">
                                <h1>Results</h1> 
                            </div>
                        </div>
                        <div className="row HIW-row result-list">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                {itemList}
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    </div>
                }
            </Fragment>
        )
    }

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
    
    handleSubmit(event) {
        this.sendEmail();
        event.preventDefault();
        this.props.history.push("/");
    }

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