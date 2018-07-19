import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {connect} from "react-redux"
import {changerSysteme} from "../../actions"
    
import './Systeme.css';

//Syntaxe validé...
const mapDispatchToProps = dispatch => {
        return{
            changerSysteme: systeme =>{
                dispatch(changerSysteme(systeme))
            } 
        }
}

const Systeme = ({lienImage,nom,changerSysteme}) => {
   
        return(
            
            <div className="systeme">
                   
                <Link to={nom} onClick={()=>changerSysteme(nom)} className="lienComposant">
                    <img src={process.env.PUBLIC_URL+lienImage} className="imageSysteme"/>
                </Link>
        
                <a onClick={()=>changerSysteme(nom)} href={nom} className="lienSysteme">
                <p className="label">{nom}</p>  
                </a>
            </div>
        )
}



const SystemeContainer = connect(null, mapDispatchToProps)(Systeme);

export default SystemeContainer;