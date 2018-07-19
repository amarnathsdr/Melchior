import React, { Component } from 'react';
import './Recherche.css';

import Ensemble from '../Ensemble/Ensemble'

import recherche from '../images/ic_recherche.png';


//Le composant qui affiche le main du Homepage (Logo + barre de recherche + differents blocs)
 class Recherche extends Component{
     
     render(){
         
         return (
                <div className="main">
                    <img src={require("../"+this.props.logo)} className="logoPrincipal"/>
             
                    <p className="accroche">{this.props.accroche}</p>
             
                    {/*Formulaire de recherche*/}
                    <form className="rechercheprincipal">
                        <input type="search" placeholder="Rechercher.."/>
                        
                        <input src={recherche} type="image" value="submit"/>
                            
                    </form>
             
                    <Ensemble/>
             
                </div> 
         );
     }
 }   
    
export default Recherche