import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {List,ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import Radiobutton from 'material-ui/RadioButton';
import Radiobuttongroup from 'material-ui/RadioButton/RadioButtonGroup';
import Lens from 'material-ui/svg-icons/image/lens';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import profil from '../images/ic_profil.png';
import technique from '../images/ic_technique.png';
import formation from '../images/ic_formation.png';
import document from '../images/png/ic_document.png';
import pdf from '../images/png/ic_pdfblanc.png';
import playB from '../images/png/youtubeB.png';
import ppt from '../images/png/ic_ppt.png';
import video from '../images/png/ic_video.png';
import storyline from '../images/png/ic_storyline.png';
import troiscentsoixante from '../images/png/ic_360.png';
import synoptique from '../images/png/ic_synoptique.png';
import troisD from '../images/png/ic_3d.png';
import clicked from '../images/png/clicked.png';
import unclicked from '../images/png/unclicked.png';

import './SideBar.css'

import {systeme} from '../fixtures/systeme';
import {sous_systeme} from '../fixtures/sous_systeme';
import {section} from '../fixtures/section';
import {documents} from '../fixtures/documents';
import {connect} from "react-redux";
import {changerSysteme} from "../../actions";
import {ajouterDocumentGauche,ajouterDocumentDroite} from "../../actions";

const mapStateToProps = state => {
    return{
        chemin:state.chemin
    }
}

const mapDispatchToProps = dispatch => {
        return {
            changerSysteme : systeme => {
                dispatch(changerSysteme(systeme))
            },
            ajouterDocumentGauche : idDoc => {
                dispatch(ajouterDocumentGauche(idDoc))
            },
            ajouterDocumentDroite: idDoc => {
                dispatch(ajouterDocumentDroite(idDoc))
            }
        }
}
class SideBar extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            systemes : this.props.systemes,
            section : this.props.section,
            sous_systemeActuel: 0,
            miseajourforce:true
        };
    }
    
    forceeUpdateHandler(){
        this.forceUpdate();
    }
    
    render(){
        
{/******Fonction qui renvoie une grappre ListItem avec le lien, le nom du systeme*******/}       
        const systemes = systeme.map((systeme)=>

            <Link 
                className="lienComposant" 
                to={systeme.nom_systeme}
                onClick={()=>{
                    this.props.pdfAfalse();
                    this.props.changerSysteme(systeme.nom_systeme);
                }
            }>
                <ListItem
                    primaryText={systeme.nom_systeme}
                    className="listeniveau2" 
                />
            </Link>
        );
{/******Fonction qui renvoie une grappre ListItem avec le lien, le nom du sousSyteme, Doc et RadioBox*******/}    
        const sous_systemes= sous_systeme.map((sous_systeme)=>                              
                                    
        sous_systeme.nom_systemes==this.props.id &&
            
            <ListItem 
                primaryText={sous_systeme.nom_sous_systeme} 
                className="listeniveau2"
                initiallyOpen={true}
                //open={this.props.chemin[1]==sous_systeme.id_sous_systeme?true: false}
                primaryTogglesNestedList={true}
                nestedItems={
                    
                    section.map((section)=>
                    section.id_sous_systemes == sous_systeme.id_sous_systeme &&
                        
                        <ListItem
                            primaryText={section.nom_section}
                            className="listeniveau5"
                            primaryTogglesNestedList={true}
                            initiallyOpen={false}
                            //open={this.props.chemin[2]==section.id_section && true}
                            nestedItems={

                                documents.map((documents)=> 
                                documents.id_section == section.id_section &&

                                <div className="documents">

                                    <ListItem
                                        primaryText={documents.nom_document}  
                                        className="listeniveau6"
                                        
                                        leftIcon={
                                            documents.format == "pdf" ?
                                                <img src={pdf}/>
                                                :
                                                <img src={playB}/>
                                        }     
                                    />

                                    {/*Affiche Clicked et unClicked en fonction de l'etat du bouton radio qui se trouve dans la variable
                                    document dans le fichier App. Represente le radio à GAUCHE*/}
                                    {documents.gauche==true ? 
                                    (
                                        //Si je unclick, l'identidiant du document cliqué est envoyé, change l'etat du radio et enleve la vue
                                        <a onClick={()=>this.props.radioAfalseGauche(documents.id_document)}>  
                                            <img className="radioGauche" src={clicked}/> 
                                        </a>    
                                    ):(
                                        //Si je click, l'identidiant du document cliqué est envoyé, change l'etat du radio et affiche la vue
                                        <a onClick={()=>{
                                                this.props.radioAtrueGauche(documents.id_document,documents.id_section);
                                                this.props.ajouterDocumentGauche(documents.id_document);
                                            }
                                        }>
                                            <img className="radioGauche" src={unclicked}/> 
                                        </a>    
                                    )}

                                    {/*Affiche Clicked et unClicked en fonction de l'etat du bouton radio qui se trouve dans la variable
                                    document dans le fichier App. Represente le radio à DROITE   */}         
                                    {documents.droite==true ? 
                                    (
                                        //Si je unclick, l'identidiant du document cliqué est envoyé, change l'etat du radio et enleve la vue
                                        <a onClick={()=>this.props.radioAfalseDroite(documents.id_document)}>   
                                            <img className="radioDroite" src={clicked}/> 
                                        </a>    
                                    ):(
                                        //Si je click, l'identidiant du document cliqué est envoyé, change l'etat du radio et affiche la vue
                                        <a onClick={()=>{
                                            this.props.radioAtrueDroite(documents.id_document,documents.id_section);
                                            this.props.ajouterDocumentDroite(documents.id_document);
                                            }
                                        }>
                                            <img className="radioDroite" src={unclicked}/> 
                                        </a>    
                                    )}
                                </div>
                                )                  
                            }
                        />
                    )
                }
            /> 
        );

        return(
            <div className="barrelaterale">    
                <List className="liste">        
{/*********ACCUEIL*******************************************************************************************************/}              
                    <Link to="/" onClick={()=> this.props.onClickRemove()}>
                        <ListItem 
                            primaryText="ACCUEIL"
                            className="listeniveau1"
                            key={1}
                        />
                    </Link>
{/*********SYSTEME*******************************************************************************************************/}  
                     {/*Ouvre le menu et affiche systeme qui contient un tableau de systeme*/}
                     <ListItem 
                         primaryText="SYSTÈME"
                         className="listeniveau1"
                         primaryTogglesNestedList={true}
                         key={2}
                         nestedItems={systemes}
                     />
                     {/*Le menu "contenu" pour le differencier par rapport aux autres menu (niveau CSS) présence de sous menu*/}
                    <div className="contenu">
{/*********CONTENU*******************************************************************************************************/}
                        <ListItem 
                            primaryText="CONTENU"
                            className="listeniveau1 contenu"
                            initiallyOpen={true}
                            primaryTogglesNestedList={true}
                            key={3}
                            nestedItems={[
                                <form className="filtreform">
                                    <input type="search" placeholder="Filtrer"/>
            
                                    <div className="checkboxfiltre">
                                        <input type="checkbox" value="Profils"/>  <img src={profil}/>   Profils

                                        <input type="checkbox" value="Profils"/> <img src={formation}/> Formation

                                        <input type="checkbox" value="Profils"/> <img src={technique}/> Technique
                                    </div>
            
                                </form>,
                            ,sous_systemes]
                                         
                            }
                            
                        />
                        
                    </div>
                </List>
                
            </div> 
        );
    }
}

const SidebarContainer = connect(mapStateToProps,mapDispatchToProps)(SideBar)

export default SidebarContainer