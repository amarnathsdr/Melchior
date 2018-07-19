import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import './NavRecherche.css';
import '../Navbar/Navbar.css';
import {connect} from "react-redux";
import {changerSysteme} from "../../actions";

import recherche from '../images/ic_recherche.png';
import logo from '../images/logo.png';
import menu from '../images/menu.png';

const mapDispatchToProps = dispatch => {
        return {
            changerSysteme : systeme => {
                dispatch(changerSysteme(systeme))
              }
        }
}


//Le composant qui affiche la barre de recherche dans la navbar
class NavRecherche extends Component{
  
    render(){
     
        return(   
           <header>
                <div className="container-icone-menu">
                    <a onClick={()=> this.props.onClick()}>
                        <img className="icone-menu" src={menu}/> 
                    </a>
                </div>
            
                 <Link to="/" onClick={()=> this.props.onClickRemove()}>
                       <img className="logo-thales" src={logo}/> 
                 </Link>

                {/* Ligne qui sépare le logo et le titre */}
                <div className="separateur"></div>
            
                {/* Nom de l'application qui est fourni via les props par le component App */}
                    <a onClick={()=> this.props.changerSysteme("test")}>
                        <p className="nom-application">{this.props.titreApplication}</p>
                    </a>
                <form className="recherche">
                    <input type="search" placeholder="Rechercher.."/>
                    <input src={recherche} type="image" value="submit"/>
                </form>  
            
            </header>    
        );
    }
}

const NavRechContainer = connect(null,mapDispatchToProps)(NavRecherche)

export default NavRechContainer
