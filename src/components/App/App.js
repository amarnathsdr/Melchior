import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from "react-redux";

import  Navbar from '../Navbar/Navbar'
import  Recherche from '../Recherche/Recherche'
import  SidebarContainer from '../SideBar/SideBar'
import  NavRechContainer from '../NavRecherche/NavRecherche'
import  Footer from '../Footer/Footer'
import  PreviewContainer from '../Preview/Preview'
import  RechercheResultat from '../RechercheResultat/RechercheResultat'
import  NavigationContenu from '../NavigationContenu/NavigationContenu'
import {videoMiniatureDroite} from "../../actions";
import {lienMiniatureDroite} from "../../actions";
import {videoMiniatureGauche} from "../../actions";
import {lienMiniatureGauche} from "../../actions";
import {indexVMg} from "../../actions";
import {indexVMd} from "../../actions";
import {changerSysteme} from "../../actions";

import './App.css'
import {systeme} from '../fixtures/systeme';
import {documents} from '../fixtures/documents';



const mapDispatchToProps = dispatch => {
        return {
            videoMiniatureDroite : listeVideo => {
                dispatch(videoMiniatureDroite(listeVideo))
            },
            lienMiniatureDroite : lienVideo => {
                dispatch(lienMiniatureDroite(lienVideo))
            },
            videoMiniatureGauche : listeVideo => {
                dispatch(videoMiniatureGauche(listeVideo))
            },
            lienMiniatureGauche : lienVideo => {
                dispatch(lienMiniatureGauche(lienVideo))
            },
            indexVMg : i => {
                dispatch(indexVMg(i))
            },
            indexVMd : i => {
                dispatch(indexVMd(i))
            },
            changerSysteme : systeme => {
                dispatch(changerSysteme(systeme))
            }
        }
}

//Le composant mère qui appelle tous les autres composants
class App extends Component {
    
    constructor(props){
        super(props);
        this.state={
            sidebarOpen:true,
            navigationContenu:true,
            vueGauche:false,
            vueDroite:false,
            fullPreviewGauche:false,
            fullPreviewDroite:false,
            nbPreview:0,
            idDocumentGauche:0,
            idDocumentDroite:0,
            idSectionGauche:0,
            idSectionDroite:0
        }
    }   
    //Modifie l'état du sidebar : ouvert ou fermé
    handleClick(){
        this.setState({
            sidebarOpen:!this.state.sidebarOpen
        });
    }
    //Retire le sidebar : false
    onClickRemove(){
        this.setState({
            sidebarOpen:false
        });
    }

    
    //Met l'etait du radio à false et enleve l'affichage du PDF à GAUCHE
    radioAfalseGauche = idDoc =>{
        this.setState({
            vueGauche:false,
            navigationContenu:true
        });
        this.enlevepreview();
        documents.map((documents)=>
            documents.id_document==idDoc ? (documents.gauche=false):(documents.gauche=documents.gauche)
        );
    }
    
    //Met l'etait du radio à TRUE et le reste des radios à FALSE et affiche le pdf à GAUCHE
    radioAtrueGauche = (idDoc,idSection) =>{
        if(this.state.vueGauche==false){
            this.ajoutPreview();
        }
        if(this.state.vueDroite==false){
            this.setState({fullPreviewGauche:true});
        }
        this.setState({
            vueGauche:true,
            navigationContenu:false,
            idDocumentGauche:idDoc,
            idSectionGauche:idSection
        });
        documents.map((documents)=>
            documents.id_document==idDoc ? (documents.gauche=true):(documents.gauche=false)
        );
        
        const videoMiniatureg=[];
        documents.map((documents)=>
            documents.id_section == idSection && (
                documents.format=="mp4" &&
                    videoMiniatureg.push(documents.id_document)
            )  
        );
        this.props.videoMiniatureGauche(videoMiniatureg);
        
        const lienMiniatureGauche=[];
        documents.map((documents)=>
            documents.id_section == idSection && (
                documents.format=="mp4" &&
                    lienMiniatureGauche.push(documents.lien_document)
            )  
        );
        this.props.lienMiniatureGauche(lienMiniatureGauche);
        
        this.props.indexVMg(0);
       
    }
    
    //Changement de radio en fonction des videos miniatures...
    radioAtrueG = (idDoc,idSection) =>{
        if(this.state.vueGauche==false){
            this.ajoutPreview();
        }
        this.setState({
            vueGauche:true,
            navigationContenu:false,
            idDocumentGauche:idDoc
        });
        documents.map((documents)=>
            documents.id_document==idDoc ? (documents.gauche=true):(documents.gauche=false)
        );
    }
    
    //Met l'etait du radio à false et enleve l'affichage du PDF à DROITE
    radioAfalseDroite = idDoc =>{
        this.setState({
            vueDroite:false
        });
        if(this.state.vueGauche==true){
            this.setState({fullPreviewGauche:true});
        }
        this.enlevepreview();
        //trouve document de la radio mis a false(grace à l'id),mettre son etat a false
        documents.map((documents)=>
            documents.id_document==idDoc ? (documents.droite=false):(documents.droite=documents.droite)
        );
    }
    //Met l'etait du radio à TRUE et le reste des radios à FALSE et affiche le pdf à DROITE
    radioAtrueDroite = (idDoc,idSection) =>{
        if(this.state.vueDroite==false){
            this.ajoutPreview();
        }
        if(this.state.vueGauche==true){
            this.setState({fullPreviewGauche:false});
        }
        this.setState({
            vueDroite:true,
            idDocumentDroite:idDoc,
            idSectionDroite:idSection
        });
        
        this.state.nbPreview==1 && this.setState({
            fullPreviewGauche:false,
            fullPreviewDroite:false
        });
        //trouve document de la radio mis a true(grace à l'id),mettre son etat de droite a true et le reste a false (pour les radios)
        documents.map((documents)=>
            documents.id_document==idDoc ? (documents.droite=true):(documents.droite=false)
        );
        
        const videoMiniaturee=[];
        documents.map((documents)=>
            documents.id_section == idSection && (
                documents.format=="mp4" &&
                    videoMiniaturee.push(documents.id_document)
            )  
        );
        this.props.videoMiniatureDroite(videoMiniaturee);
        
        const lienMiniatureDroite=[];
        documents.map((documents)=>
            documents.id_section == idSection && (
                documents.format=="mp4" &&
                    lienMiniatureDroite.push(documents.lien_document)
            )  
        );
        this.props.lienMiniatureDroite(lienMiniatureDroite);
        
        this.props.indexVMd(0);
    }
    //Changement de radio en fonction des videos miniatures...
    radioAtrueD = (idDoc,idSection) =>{
        if(this.state.vueDroite==false){
            this.ajoutPreview();
        }
        this.setState({
            vueDroite:true,
            idDocumentDroite:idDoc
        });
        
        documents.map((documents)=>
            documents.id_document==idDoc ? (documents.droite=true):(documents.droite=false)
        );
    }
    
    //Met l'etat de la taille du preview a jour et met inverse l'etat a droite. Si gauche full alors droite inverse. Si gauche half alors droite inverse
    previewZoomClickGauche(){
        this.setState({
            fullPreviewGauche:!this.state.fullPreviewGauche,
            vueDroite:!this.state.vueDroite
        });
    }
     //Met l'etat de la taille du preview a true (ZOOM) si a gauche nous avons un preview alors vueGauche a false, si navigationContenu alors false aussi
    previewZoomClickDroite(){
        this.setState({
            fullPreviewDroite:true
        }); 
        this.state.nbPreview==2 ? this.setState({vueGauche:false}) : this.setState({navigationContenu:false});
    }
    //Met l'etat de la taille du preview a false (UnZOOM). si nbPreview à 2 alors vueGauche a true ou alors navigationcontenu a true
    previewUnZoomClickDroite(){
        this.setState({
            fullPreviewDroite:false
        });  
        this.state.nbPreview==2 ? this.setState({vueGauche:true}) : this.setState({navigationContenu:true});
    }
    //Met le preview gauche a false. enleve 1 sur le nbPreview. Si plein ecran alors remettre le reste sinon remettre navigationContenu (ecran par defaut)
    pdfGaucheAfalse(){
        this.setState({
            vueGauche:false
        });
        this.enlevepreview();
        this.state.fullPreviewGauche==true ? (this.state.nbPreview==2 ? this.setState({vueDroite:true,fullPreviewGauche:false,navigationContenu:true}): this.setState({navigationContenu:true,fullPreviewDroite:false})): this.setState({navigationContenu:true});
        //Va trouver le document de gauche a true et va le mettre a false ( pour les radios )
        documents.map((documents)=>
            documents.gauche==true ? (documents.gauche=false):(documents.gauche=false)
        );
    }
    //Met le preview droite a false. enleve 1 sur le nbPreview. Si plein ecran alors remettre le reste sinon remettre navigationContenu (ecran par defaut)
    pdfDroiteAfalse(){
        this.setState({vueDroite:false});
        this.enlevepreview();
        this.state.fullPreviewDroite==true &&(this.state.nbPreview==2 ? this.setState({vueGauche:true,fullPreviewDroite:false}): this.setState({navigationContenu:true,fullPreviewDroite:false}));
        //Va trouver le document de droite a true et va le mettre a false ( pour les radios )
        documents.map((documents)=>
            documents.droite==true ? (documents.droite=false):(documents.droite=false)
        );
    }
    pdfAfalse(){
        this.setState({
            vueDroite:false,
            vueGauche:false,
            nbPreview:0,
            navigationContenu:true
        });
        this.pdfDroiteAfasle();
        this.pdfGaucheAfalse();
    }
    //un state qui contient le nombre de preview affiché(gauche et droite). il prend la valeur de 0, 1 et 2
    //celui ci ajoute de 1 lorsque un preview est demandé (clique sur radio)
    ajoutPreview(){
        this.state.nbPreview<=1 && this.setState({nbPreview:this.state.nbPreview+1});
        this.state.nbPreview==1 && this.setState({
            fullPreviewGauche:false,
            fullPreviewDroite:false
        });
    }
    //celui ci enleve de 1 lorsque un preview est enlevé (Unclick sur radio et croix sur preview)
    enlevepreview(){
        this.setState({nbPreview:this.state.nbPreview-1});
    }
    changerDocGauche = (idDoc) => {
        this.setState({idDocumentGauche:idDoc});
    }
    changerDocDroite = (idDoc) => {
        this.setState({idDocumentDroite:idDoc});
    }
    
    
  render() {
      //Nous créeons une constante qui appelle un composant avec les props necessaires
      //puis nous appelons cette constante dans le <Route> du return() 
      //****************************************************NAVBAR*********************************************
      const renderNavbar = (props) =>{
      return(
        <Navbar
            titreApplication={titre}
            {...props}
          />
            );
      }
      //****************************************************NAVBAR RECHERCHE*********************************************
      const renderNavRecherche = (props) =>{
      return(
        <NavRechContainer
            titreApplication={titre}
            etatSidebar={this.state.sidebarOpen}
            onClick={()=>this.handleClick()}
            {...props}
          />
            );
      }
      //****************************************************RECHERCHE*********************************************
      const renderRecherche = (props) =>{
      return(
        <Recherche
            accroche={accroche}
            logo={logoPrincipal}
            {...props}
          />
            );
      }
      //****************************************************NAVIGATION ET CONTENU*********************************************
      const renderNavigationContenu = (props) =>{
      return(
        <NavigationContenu
            etatSidebar={this.state.sidebarOpen}
            url={this.state.match}
            radioAtrueDroite={(idDoc,idSection)=>this.radioAtrueDroite(idDoc,idSection)}
            {...props}
          />
        );
      }
      //****************************************************PREVIEW appelé à gauche*********************************************
      const renderPreviewGauche = (props) =>{
      return(
        <PreviewContainer
            etatSidebar={this.state.sidebarOpen}
            navigationContenu={this.state.navigationContenu}
            previewZoomClick={()=>this.previewZoomClickGauche()}
            pdfAfalse={()=>this.pdfGaucheAfalse()}
            cote="gauche"
            vueDroite={this.state.vueDroite}
            nbPreview={this.state.nbPreview}
            fullPreview={this.state.fullPreviewGauche}
            idDoc={this.state.idDocumentGauche}
            idSection={this.state.idSectionGauche}
            changerDoc={(idDoc)=>this.changerDocGauche(idDoc)}
            radioAtrue={(idDoc,idSection)=>this.radioAtrueG(idDoc,idSection)}
            {...props}
          />
        );
      }
      //****************************************************PREVIEW appelé à droite*********************************************
      const renderPreviewDroite = (props) =>{
      return(
        <PreviewContainer
            etatSidebar={this.state.sidebarOpen}
            navigationContenu={this.state.navigationContenu}
            previewZoomClick={()=>this.previewZoomClickDroite()}
            previewUnZoomClick={()=>this.previewUnZoomClickDroite()}
            pdfAfalse={()=>this.pdfDroiteAfalse()}
            cote="droite"
            vueGauche={this.state.vueGauche}
            nbPreview={this.state.nbPreview}
            fullPreview={this.state.fullPreviewDroite}
            idDoc={this.state.idDocumentDroite}
            idSection={this.state.idSectionDroite}
            changerDoc={(idDoc)=>this.changerDocDroite(idDoc)}
            radioAtrue={(idDoc,idSection)=>this.radioAtrueD(idDoc,idSection)}
            {...props}
          />
        );
      }
      
      const renderSidebar = (props) =>{
          return(
            <SidebarContainer  
              onClickRemove={()=>this.handleRemove()} 
              onClick={()=>this.handleClick()}
              radioAfalseDroite={(idDoc)=>this.radioAfalseDroite(idDoc)} radioAtrueDroite={(idDoc,idSection)=>this.radioAtrueDroite(idDoc,idSection)}
              radioAfalseGauche={(idDoc)=>this.radioAfalseGauche(idDoc)} radioAtrueGauche={(idDoc,idSection)=>this.radioAtrueGauche(idDoc,idSection)}
              vueGauche={this.state.vueGauche} vueDroite={this.state.vueDroite}
              pdfAfalse={()=>this.pdfAfalse()}
              id={props.match.params.id}
            />
          );
      }
      return(
         <Router>
             <MuiThemeProvider>
         
                {/*Appelle les components lorsque l'url est '/'*/}
                {/**************************************************HOME PAGE**********************************/}
                <Route exact path='/' component={renderNavbar}/>
                <Route exact path='/' render={renderRecherche}/>
         
                 
                {/**************************************************SYSTEME************************************/}
                <Route path='/:id' component={renderNavRecherche}/>
                <div className="pageSysteme">
                    {/**************************************************SIDE BAR************************************/}
          
                    {this.state.sidebarOpen && <Route exact path="/:id" render={renderSidebar}/>}
          
                    {/**************************************************NAVIGATION CONTENU************************************/}
          
          
                    {this.state.navigationContenu && <Route exact path="/:id" render={renderNavigationContenu}/>}
          
          
                    {/**************************************************PREVIEW************************************/}
                    {this.state.vueGauche==true && <Route exact path="/:id" render={renderPreviewGauche}/>}
                    {this.state.vueDroite==true && <Route exact path="/:id" render={renderPreviewDroite}/>}
                    
                </div>
                    
                {/********************************************RESULTAT RECHERCHE**************************/}
                <Route exact path="/resultat/test" component={RechercheResultat}/>
                <Route exact path="/resultat/test" component={renderNavbar}/>

                
                {/*Toutes les pages*/}
                <Footer confidentiel={confidentiel}/>
             </MuiThemeProvider>
        </Router>
    );
  }
}
                     

/************************************************DONNÉES***********************************************/
/* Toutes les données de tous les composants seront ici */
/* Nous passerons chaque données via les props aux composants concernés */
const confidentiel=""

const titre='Portail Station HF Melchior'

const logoPrincipal="images/logoMelchior.png"

const accroche = "Portail Melchior vous donnant accès à plus de xxx documents et contenus"

const AppContainer = connect(null,mapDispatchToProps)(App); 

export default AppContainer;

