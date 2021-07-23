import React from 'react';
import {Helmet} from 'react-helmet';
import { Fragment } from 'react';
import emailjs from 'emailjs-com';
import homeImage from '../assets/laptop-result.png';
import Menubar from '../Menubar';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            number: '',
            result: this.props.location.state,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
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
                    </div>
                    <div className="col-lg-4 position-relative">
                        {/* <img className="laptop-img position-absolute bottom-10 end-10" src={homeImage} /> */}
                        <img className="laptop-img" src={homeImage} />
                    </div>
                </div>
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