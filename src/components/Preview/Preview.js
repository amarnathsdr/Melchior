import React, { Component } from 'react';
import {connect} from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import zoom from '../images/png/ic_etendre.png';
import unzoom from '../images/png/ic_retrecir.png';
import cross from '../images/png/ic_fermer.png';
import pdf from '../images/pdf.png';
import play from '../images/png/youtube.png';
import precedent from '../images/png/ic_precedent.png';
import suivant from '../images/png/ic_suivant.png';
import './Preview.css'
import {changerVideoPrincipaleGauche} from "../../actions";
import {changerVideoPrincipaleDroite} from "../../actions";
import {videoMiniatureDroite} from "../../actions";
import {lienMiniatureDroite} from "../../actions";
import {videoMiniatureGauche} from "../../actions";
import {lienMiniatureGauche} from "../../actions";
import {indexVMg} from "../../actions";
import {indexVMd} from "../../actions";
import {ajouterDocumentGauche} from "../../actions";


import {documents} from '../fixtures/documents';
import {section} from '../fixtures/section';


const mapStateToProps = state => {
        return {
            nomDocGauche : state.nomDocGauche,
            lienDocGauche: state.lienDocGauche,
            nomDocDroite : state.nomDocDroite,
            lienDocDroite: state.lienDocDroite,
            formatGauche: state.formatGauche,
            formatDroite : state.formatDroite,
            videoMiniature: state.videoMiniature,
            lienMiniature:state.lienMiniatureDroite,
            videoMiniatureg: state.videoMiniatureg,
            lienMiniatureg: state.lienMiniatureGauche,
            indexVMGauche:state.indexVMGauche,
            indexVMDroite:state.indexVMDroite
        }
}

const mapDispatchToProps = dispatch => {
        return {
            changerVideoPrincipaleGauche : idDocument => {
                dispatch(changerVideoPrincipaleGauche(idDocument))
            },
            changerVideoPrincipaleDroite : idDocument => {
                dispatch(changerVideoPrincipaleDroite(idDocument))
            },
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
            ajouterDocumentGauche: idDoc => {
                dispatch(ajouterDocumentGauche(idDoc))
            }
        }
}

const styles = theme => ({
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#5FBFD4',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 37,
    height: 19,
    marginTop: -25,
    marginLeft: -19,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    marginTop: -30,
    width: 18,
    height: 18,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});

class Preview extends Component{
    
    constructor(props){
        super(props);
        this.state={
            checkedButton:false,
            lienVideoPrincipale:""
        }
    }   

    handleChange = name => event =>{
        this.setState({[name]:event.target.checked});
    };

    nomVideoMiniature = (idVideo) =>{
        return(documents.map((documents)=>
            documents.id_section==this.props.idSection &&
                documents.id_document == idVideo && 
                    documents.nom_document
        ));
    }

    miniatureSuivantDroite = () => {
        if(this.props.indexVMDroite+2<this.props.videoMiniature.length-1){
            this.props.indexVMd(this.props.indexVMDroite+1);
        }
    }
    
    miniatureSuivantGauche = () => {
        if(this.props.indexVMGauche+2<this.props.videoMiniatureg.length-1){
            this.props.indexVMg(this.props.indexVMGauche+1);
        }
    }
    
    miniaturePrecedentGauche = () => {
        if(this.props.indexVMGauche>0){
            this.props.indexVMg(this.props.indexVMGauche-1);
        }
    }
    
    miniaturePrecedentDroite = () => {
        if(this.props.indexVMDroite>0){
            this.props.indexVMd(this.props.indexVMDroite-1);
        }
    }
    
    nomSection = (idSection) => {
        return(
            section.map((section)=>
                section.id_section==idSection &&
                    section.nom_section   
        ));
    }
    
    lectureAutoGauche = () => {
        if(this.state.checkedButton==true){
            this.props.changerVideoPrincipaleGauche(this.props.videoMiniature[this.props.videoMiniature.indexOf(this.props.idDoc)+1])
            this.props.changerDoc(this.props.videoMiniature[this.props.videoMiniature.indexOf(this.props.idDoc)+1])
        }
    }
    
    lectureAutoDroite = () => {
        if(this.state.checkedButton==true){
            this.props.changerVideoPrincipaleDroite(this.props.videoMiniature[this.props.videoMiniature.indexOf(this.props.idDoc)+1])
            this.props.changerDoc(this.props.videoMiniature[this.props.videoMiniature.indexOf(this.props.idDoc)+1])
        }
    }
    
    componentWillMount(){
            if(this.props.cote=="droite"){
                const videoMiniaturee=[];
                const lienMiniatureDroite=[];
                
                documents.map((documents)=>
                documents.id_section == this.props.idSection && (
                    documents.format=="mp4" &&
                        videoMiniaturee.push(documents.id_document)
                )  
                );
                documents.map((documents)=>
                    documents.id_section == this.props.idSection && (
                        documents.format=="mp4" &&
                            lienMiniatureDroite.push(documents.lien_document)
                    )  
                );
                this.props.videoMiniatureDroite(videoMiniaturee);
                this.props.lienMiniatureDroite(lienMiniatureDroite);
            }
        
            if(this.props.cote=="gauche"){
                const videoMiniatureg=[];
                const lienMiniatureGauche=[];
        
                documents.map((documents)=>
                    documents.id_section == this.props.idSection && (
                        documents.format=="mp4" &&
                            videoMiniatureg.push(documents.id_document)
                    )  
                );
                documents.map((documents)=>
                    documents.id_section == this.props.idSection && (
                        documents.format=="mp4" &&
                            lienMiniatureGauche.push(documents.lien_document)
                    )  
                );
                this.props.videoMiniatureGauche(videoMiniatureg);
                this.props.lienMiniatureGauche(lienMiniatureGauche);
            }
            
        
    }
    render(){
        
        const {classes} = this.props;
        
        //renvoie une classe en fonction du type de preview (gauche/droite) (sideBar ouvert/fermé) (ligne separateur ou non)
        const classeNom = this.props.cote=="gauche" ? (this.props.etatSidebar==true ? "containerSidebar": "container")
                                                     :(this.props.fullPreview==true ? (this.props.etatSidebar==true ? "containerSidebar": "container"): "container ligneSeparateur")

        return(
            <div className={classeNom}>
            
                <div className="entete">
                    <div className="iconeGaucheTitre">
                            {this.props.cote=="gauche" ?(
                                    this.props.formatGauche[this.props.idDoc-1]=="pdf" ?
                                    <img className="icone" src={pdf}/>
                                    :
                                    <img className="icone" src={play}/>
                                ):(
                                     this.props.formatDroite[this.props.idDoc-1]=="pdf" ?
                                    <img className="icone" src={pdf}/>
                                    :
                                    <img className="icone" src={play}/>
                                )
                            }
                            
                            {this.props.cote=="gauche" ? (
                                this.props.formatGauche[this.props.idDoc-1]=="pdf" ?
                                <p className="chemin">{this.props.nomDocGauche} </p>
                                :
                                <p className="chemin">{this.nomSection(this.props.idSection)} </p>
                                ):(
                                this.props.formatDroite[this.props.idDoc-1]=="pdf" ?
                                <p className="chemin">{this.props.nomDocDroite}</p>
                                :
                                <p className="chemin">{this.nomSection(this.props.idSection)} </p>
                                )
                            }
                    </div> 
                    <div className="iconeDroiteNavigation">
            
                            {/*Affiche ZOOM ou UNZOOM en fonction de letat du preview GAUCHE (full OU half)*/}
                            {this.props.cote=="gauche" && (this.props.nbPreview==2 && (this.props.fullPreview==true ? 
                                    <img className="icone" src={unzoom} onClick={()=>this.props.previewZoomClick()}/>
                                    :
                                    <img className="icone" src={zoom} onClick={()=>this.props.previewZoomClick()}/>))
                            }
                            {/*Affiche ZOOM ou UNZOOM en fonction de letat du preview DROITE (full OU half)*/}
                            {this.props.cote=="droite" && (this.props.nbPreview==1 ? (this.props.fullPreview==false ?
                                 <img className="icone" src={zoom} onClick={()=>this.props.previewZoomClick()}/>
                                    :
                                <img className="icone" src={unzoom} onClick={()=>this.props.previewUnZoomClick()}/>)
                                :
                                 (this.props.fullPreview==false ?
                                 <img className="icone" src={zoom} onClick={()=>this.props.previewZoomClick()}/>
                                    :
                                 <img className="icone" src={unzoom} onClick={()=>this.props.previewUnZoomClick()}/>)
                                )
                            }
                            {/*Affiche la croix */}
                            <img className="icone" onClick={()=>this.props.pdfAfalse()} src={cross}/>
                    </div>
                </div>
                          
                <div className="contain1">
                        {this.props.cote=="gauche" ?(
                         
                         this.props.formatGauche[this.props.idDoc-1]=="pdf" ? 
                            
                            <iframe className="pdfp" src={process.env.PUBLIC_URL+this.props.lienDocGauche[this.props.idDoc-1]} align="middle"></iframe> 
                            
                            :
                            <div className={this.props.fullPreview==true?"videoGrandFull":"videoGrand"}>
                                
                                {this.state.checkedButton==true ? (
                                   
                                      this.props.videoMiniatureg[this.props.videoMiniatureg.length-1]==this.props.idDoc ? (
                                          <video controls autoplay="true" className="videoGrand" src={process.env.PUBLIC_URL+this.props.lienDocGauche[this.props.idDoc-1]}>
                                          </video>
                                      ):(
                                           <video controls autoplay="true" className="videoGrand" src={process.env.PUBLIC_URL+this.props.lienDocGauche[this.props.idDoc-1]} onEnded={this.lectureAutoGauche}>
                                            </video>
                                      )     
                                ):(
                                    <video controls className="videoGrand" src={process.env.PUBLIC_URL+this.props.lienDocGauche[this.props.idDoc-1]} onEnded={this.lectureAutoGauche}>
                                    </video>
                                )}
                            
                                <div className="info">
                                <p className="titreVideo"> {this.props.nomDocGauche} </p>
                                <p className="lectureAuto"> Lecture automatique </p>
                                </div>
                                
                                  <Switch
                                    className="switch"
                                    classes={{
                                        switchBase: classes.iOSSwitchBase,
                                        bar: classes.iOSBar,
                                        icon: classes.iOSIcon,
                                        iconChecked:classes.iOSIconChecked,
                                        checked:classes.iOSChecked,
                                    }}
                                    disableRipple
                                    checked={this.state.checkedButton}
                                    onChange={this.handleChange('checkedButton')}
                                    value="checkedButton"
                                />
                                <div className={this.props.fullPreview==true?"videoSuivanteFull":"videoSuivante"}>
                                    <a onClick={()=>this.miniaturePrecedentGauche()}>
                                        <img src={precedent}/>
                                    </a>
                                        
                                    <div>
                                        {this.props.videoMiniatureg.length>0 ? (
                                            <a onClick={()=>{ this.props.radioAtrue(this.props.videoMiniatureg[this.props.indexVMGauche],this.nomSection(this.props.idSection));
                                                this.props.changerVideoPrincipaleGauche(this.props.videoMiniatureg[this.props.indexVMGauche]);
                                                this.props.changerDoc(this.props.videoMiniatureg[this.props.indexVMGauche]);
                                                }
                                            }>

                                            <video className="videoPetit" src={process.env.PUBLIC_URL+this.props.lienMiniatureg[this.props.indexVMGauche]}>
                                            </video>
                                            <p>{this.nomVideoMiniature(this.props.videoMiniatureg[this.props.indexVMGauche])} </p>
                                            </a>
                                        ):(
                                            <video className="videoPetitSansHover"></video>
                                        )}
                                    </div>
                                        
                                    <div>
                                        {this.props.videoMiniatureg.length>1 ? (
                                            <a onClick={()=>{ this.props.radioAtrue(this.props.videoMiniatureg[this.props.indexVMGauche+1],this.nomSection(this.props.idSection));
                                                this.props.changerVideoPrincipaleGauche(this.props.videoMiniatureg[this.props.indexVMGauche+1])
                                                this.props.changerDoc(this.props.videoMiniatureg[this.props.indexVMGauche+1])     
                                                }
                                            }>
                                            <video className="videoPetit" src={process.env.PUBLIC_URL+this.props.lienMiniatureg[this.props.indexVMGauche+1]}></video>
                                            <p>{this.nomVideoMiniature(this.props.videoMiniatureg[this.props.indexVMGauche+1])}</p>
                                            </a>
                                        ):(
                                            <video className="videoPetitSansHover"></video>
                                        )}
                                    </div>
                                            
                                    <div>
                                        {this.props.videoMiniatureg.length>2 ? (
                                            <a onClick={()=>{ this.props.radioAtrue(this.props.videoMiniatureg[this.props.indexVMGauche+2],this.nomSection(this.props.idSection));
                                                this.props.changerVideoPrincipaleGauche(this.props.videoMiniatureg[this.props.indexVMGauche+2])
                                                this.props.changerDoc(this.props.videoMiniatureg[this.props.indexVMGauche+2])
                                                }
                                            }>
                                            <video className="videoPetit" src={process.env.PUBLIC_URL+this.props.lienMiniatureg[this.props.indexVMGauche+2]}></video>
                                            <p>{this.nomVideoMiniature(this.props.videoMiniatureg[this.props.indexVMGauche+2])} </p>
                                            </a>
                                        ):(
                                              <video className="videoPetitSansHover"></video>
                                        )}
                                    </div>
                                            
                                    <a onClick={()=>this.miniatureSuivantGauche()}>
                                        <img src={suivant} />
                                    </a>
                                </div>
                                
                            </div>
                        ):(
                        this.props.formatDroite[this.props.idDoc-1]=="pdf" ? 
                        
                            <iframe className="pdfp"  src={process.env.PUBLIC_URL+this.props.lienDocDroite[this.props.idDoc-1]} align="middle"></iframe>
                            :
                            <div className={this.props.fullPreview==true?"videoGrandFull":"videoGrand"}>
                            
                            {this.state.checkedButton==true ? (
                            
                                this.props.videoMiniature[this.props.videoMiniature.length-1]==this.props.idDoc ? (
                                        <video controls autoplay="true" className="videoGrand" src={process.env.PUBLIC_URL+this.props.lienDocDroite[this.props.idDoc-1]}>
                                        </video>
                                    ):(
                                        <video controls autoplay="true" className="videoGrand" src={process.env.PUBLIC_URL+this.props.lienDocDroite[this.props.idDoc-1]} onEnded={this.lectureAutoDroite}>
                                        </video>
                                    )
                                    
                            ):(
                                <video controls className="videoGrand" src={process.env.PUBLIC_URL+this.props.lienDocDroite[this.props.idDoc-1]} onEnded={this.lectureAutoDroite}>
                                </video>
                            )}
                            
                            <div className="info">
                                <p className="titreVideo"> {this.props.nomDocDroite} </p>
                                <p className="lectureAuto"> Lecture automatique </p>
                            </div>
                            
                                <Switch
                                    className="switch"
                                    classes={{
                                        switchBase: classes.iOSSwitchBase,
                                        bar: classes.iOSBar,
                                        icon: classes.iOSIcon,
                                        iconChecked:classes.iOSIconChecked,
                                        checked:classes.iOSChecked,
                                    }}
                                    disableRipple
                                    checked={this.state.checkedButton}
                                    onChange={this.handleChange('checkedButton')}
                                    value="checkedButton"
                                />
                                        
                                <div className={this.props.fullPreview==true?"videoSuivanteFull":"videoSuivante"}>
                                    <a onClick={()=>this.miniaturePrecedentDroite()}>
                                        <img src={precedent}/>
                                    </a>
                                        
                                    <div>
                                        {this.props.videoMiniature.length>0 ? (
                                            <a onClick={()=>{ this.props.radioAtrue(this.props.videoMiniature[this.props.indexVMDroite],this.nomSection(this.props.idSection));
                                                this.props.changerVideoPrincipaleDroite(this.props.videoMiniature[this.props.indexVMDroite])
                                                this.props.changerDoc(this.props.videoMiniature[this.props.indexVMDroite])     
                                                }
                                            }>

                                            <video className="videoPetit" src={process.env.PUBLIC_URL+this.props.lienMiniature[this.props.indexVMDroite]}>
                                            </video>
                                            <p>{this.nomVideoMiniature(this.props.videoMiniature[this.props.indexVMDroite])} </p>
                                            </a>
                                        ):(
                                            <video className="videoPetitSansHover"></video>
                                        )}
                                    </div>
                                        
                                    <div>
                                        {this.props.videoMiniature.length>1 ? (
                                         
                                            <a onClick={()=>{           this.props.radioAtrue(this.props.videoMiniature[this.props.indexVMDroite+1],this.nomSection(this.props.idSection));
                                                this.props.changerVideoPrincipaleDroite(this.props.videoMiniature[this.props.indexVMDroite+1])
                                                this.props.changerDoc(this.props.videoMiniature[this.props.indexVMDroite+1])     
                                                }
                                            }>
                                            <video className="videoPetit" src={process.env.PUBLIC_URL+this.props.lienMiniature[this.props.indexVMDroite+1]}></video>
                                            <p>{this.nomVideoMiniature(this.props.videoMiniature[this.props.indexVMDroite+1])} </p>
                                            </a>
                                        ):(
                                            <video className="videoPetitSansHover"></video>
                                        )}
                                    </div>
                                            
                                    <div>
                                        {this.props.videoMiniature.length>2 ? (
                                         
                                            <a onClick={()=>{
                                                this.props.radioAtrue(this.props.videoMiniature[this.props.indexVMDroite+2],this.nomSection(this.props.idSection));
                                                this.props.changerVideoPrincipaleDroite(this.props.videoMiniature[this.props.indexVMDroite+2])
                                                this.props.changerDoc(this.props.videoMiniature[this.props.indexVMDroite+2])
                                                }
                                            }>
                                            <video className="videoPetit" src={process.env.PUBLIC_URL+this.props.lienMiniature[this.props.indexVMDroite+2]}></video>
                                            <p>{this.nomVideoMiniature(this.props.videoMiniature[this.props.indexVMDroite+2])} </p>
                                            </a>
                                        ):(
                                            <video className="videoPetitSansHover"></video>
                                        )}
                                    </div>
                                            
                                    <a onClick={()=>this.miniatureSuivantDroite()}>
                                        <img src={suivant} />
                                    </a>
                                </div>
                            </div>
                        )
                        }
                </div>
            </div>                    
        );
    }
    
}
const PreviewCustomized = withStyles(styles)(Preview);

const PreviewContainer = connect(mapStateToProps,mapDispatchToProps)(PreviewCustomized);

export default PreviewContainer;