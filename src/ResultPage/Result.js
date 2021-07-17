import React from 'react';
import {Helmet} from 'react-helmet';
import { Fragment } from 'react';
import emailjs from 'emailjs-com';
import homeImage from '../assets/laptop-result.png';
import Menubar from '../Menubar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        this.retryQuiz = this.retryQuiz.bind(this);
    }

    render() {
        return(
            <Fragment>
                <Helmet><title>Quiz App - Home</title></Helmet>
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


        // return (
        //     <Fragment>
        //             <Helmet><title>Hasil </title></Helmet>
        //         <div className="quiz-summary">
        //             <Fragment>
        //                 <div className="container stats">
        //                     <h1>Thank you !</h1>
        //                     <h3>Last step: Silahkan tulis email/nomor kamu di form ini </h3>
        //                     <p></p>
        //                     <p>Sampai sekarang, fitur rekomendasi instan masih dalam tahap development.<br></br> 
        //                     Silahkan masukan email/nomor kamu dan tunggu notifikasi dari kami untuk mendapatkan rekomendasi laptop terbaik !<br></br>
        //                     Hasil rekomendasi akan terbit sekitar <b>1-2 hari</b> dari sekarang.</p>
        //                     <button id="prev-button" onClick={this.retryQuiz} className="retry-button"> Retry Quiz </button>
        //                 </div>
        //                 <div className="wrapper">
        //                     <div className="title">Contact Form</div>
        //                     <form onSubmit={this.handleSubmit} className="form">
        //                         <div className="input_field">
        //                             <label className="">Name</label>
        //                             <input type="text" className="input" name="name" type="text" onChange={this.handleChange}/>
        //                         </div>
        //                         <div className="input_field">
        //                             <label className="">Email</label>
        //                             <input type="text" className="input" name="email" type="email" onChange={this.handleChange}/>
        //                         </div>
        //                         <div className="input_field">
        //                             <label className="">Whatsapp Number</label>
        //                             <input type="text" className="input" name="phoneNumber" pattern="[0-9]*" onChange={this.handleChange}/>
        //                         </div>
        //                         <div className="input_field">
        //                             <input type="submit" className="btn" value="Submit"/>
        //                         </div>
        //                     </form>
        //                 </div>     
        //             </Fragment>
        //         </div>
        //     </Fragment>
        // )
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
        alert("Thank you ! Kami akan memberikan rekomendasi untuk anda dalam 1-2 hari kedepan");
        this.props.history.push("/");
    }
    
    retryQuiz(){
        this.props.history.push("/play");
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