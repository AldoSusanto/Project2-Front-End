import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import logoImage from './assets/Logo/Original-Transparent.png'


class Menubar extends React.Component{

    constructor(props){
      super();
      this.state = {
          courses: [],
          reload: false
      }
    }

    render(){
        return (
            <Nav className="navbar navbar-expand-md navbar-light menubarStyle fixed-top">
                <div className="container-fluid">
                    {/* <a className="navbar-brand logo" href="/">LOGO</a> */}
                    <a href="/">
                        <img href="/" className="logo" src={logoImage} />
                    </a>
                    <div className="navbar-collapse">
                        <div className="navbar-nav">
                            <a className="menuBtn" href="/#howItWorks">How It Works</a>
                            <a className="menuBtn" href="/play">Take the Quiz</a>
                            
                        </div>
                    </div>
                </div>
            </Nav>
        )
    }
}



export default Menubar;