import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {connect} from "react-redux";
import {changerSysteme} from "../../actions";

import './NavigationContenu.css'
import  Vue_image from '../Vue_image/Vue_image'
import  Vue_360 from '../Vue_360/Vue_360'
import  Vue_liste from '../Vue_liste/Vue_liste'

import rotation from '../images/png/rotating-circular-arrow.png';
import image from '../images/png/frame-landscape.png';
import liste from '../images/png/listing-option.png';
import rotationB from '../images/png/rotating-circular-arrowB.png';
import imageB from '../images/png/frame-landscapeB.png';
import listeB from '../images/png/listing-optionB.png';

import suivant from '../images/png/ic_suivant.png';

import {sous_systeme} from '../fixtures/sous_systeme';
import {section} from '../fixtures/section';
import {documents} from '../fixtures/documents';


//syntaxe validé 
const mapStateToProps = state => {
        return {
            systeme : state.systeme,
            chemin:state.chemin
        }
}

const mapDispatchToProps = dispatch => {
        return {
            changerSysteme : systeme => {
                dispatch(changerSysteme(systeme))
              }
        }
}
class NavigationContenuContainer extends Component {
    
      constructor(props){
          super(props);
          this.state={
              vue_image:true,
              vue_360:false,
              vue_liste:false
          }
      }
      
      onchangeVue = vue => {
            if(vue=="image"){
                this.setState({vue_image:true, vue_360:false,vue_liste:false});
            }
            if(vue=="360"){
                this.setState({vue_image:false,vue_360:true,vue_liste:false});
            }
            if(vue=="liste"){
                this.setState({vue_image:false,vue_360:false,vue_liste:true});
            }
      }
     
      nomSection = (id) => {
        return(
            section.map((section)=>
                section.id_section==id &&
                    section.nom_section   
        ));
      }
      nomSousSysteme = (id) => {
        return(
            sous_systeme.map((sous_systeme)=>
                sous_systeme.id_sous_systeme==id &&
                    sous_systeme.nom_sous_systeme   
        ));
      }
      render(){
          return(
              <div className={this.props.etatSidebar==true ? "sidebarOuvert" : "sidebarFerme"}>

                <div className="navigation">
                        {/*Le chemin qui nous affiche l'emplacement*/}
                        
                        <div className="contenuGauche">
                            <p className="chemin">{this.props.match.params.id}</p>
              
              
                            {   this.state.vue_image==true &&
                                this.props.chemin.length>1 &&
                                this.props.chemin[1]!=-1 &&
                                <div className="iconeChemin">
                                    <img className="iconeFleche" src={suivant}/> 
                                    <p className="chemin">{this.nomSousSysteme(this.props.chemin[1])}</p>  
                                </div>
                            }
                            
                            {   this.state.vue_image==true &&
                                this.props.chemin.length>2 &&
                                this.props.chemin[2]!=-1 &&
                                 <div className="iconeChemin">
                                    <img className="iconeFleche" src={suivant}/> 
                                    <p className="chemin">{this.nomSection(this.props.chemin[2])}</p>
                                 </div>
                            }
                        </div>

                        {/*Les icones de droite avec les fonctionnalités comme ...*/}
                        <div className="iconeDroite">
                            <img onClick={()=>this.onchangeVue("image")} className="icone" src={this.state.vue_image==true ? imageB : image}/>  
                            <img onClick={()=>this.onchangeVue("360")} className="icone" src={this.state.vue_360==true ? rotationB : rotation}/>
                            <img onClick={()=>this.onchangeVue("liste")} className="icone" src={this.state.vue_liste==true ? listeB : liste}/>
                        </div>
                </div>
            
                <div className="contain">
                    {this.state.vue_image==true && 
                      <Vue_image systeme={this.props.match.params.id} 
                                 radioAtrueDroite={(idDoc,idSection)=>this.props.radioAtrueDroite(idDoc,idSection)}/>}
                    {this.state.vue_360==true && <Vue_360 systeme={this.props.match.params.id} />}
                    {this.state.vue_liste==true && <Vue_liste systeme={this.props.match.params.id} />}
                </div>
            </div>
          );
      }       
}

const NavigationContenu = connect(mapStateToProps,mapDispatchToProps)(NavigationContenuContainer);

export default NavigationContenu;