import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";



import './Navbar.css';
import '../NavRecherche/NavRecherche.css'; // A ENLEVER DES QUE POSSIBLE !!! POUR LE FORM RECHERCHE


import logo from '../images/logo.png';

//Le composant qui affiche la navbar sans la barre de recherche
class Navbar extends Component {

  render() {
     
        return(
            // Barre de navigation
                <header>
                    {/* Logo Thales, lien vers la page principale*/}
                    <Link to="/">
                        <img className="logo-thales" src={logo}/> 
                    </Link>

                    {/* Ligne qui sépare le logo et le titre */}
                    <div className="separateur"></div>
            
                    {/* Nom de l'application qui est fourni via les props par le component App */}
                    <p className="nom-application">{this.props.titreApplication}</p>
                </header>       
        );
  }
}

export default Navbar