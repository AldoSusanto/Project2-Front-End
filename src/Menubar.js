import React from 'react';
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
                    <a href="/">
                        <img href="/" className="logo" src={logoImage} alt="Propicks logo"/>
                    </a>
                    <div className="navbar-collapse">
                        <div className="navbar-nav">
                            <a className="menuBtn" href="/#howItWorks">Cara Kerja</a>
                            <a className="menuBtn" href="/play">Mulai Quiz</a>
                        </div>
                    </div>
                </div>
            </Nav>
        )
    }
}



export default Menubar;