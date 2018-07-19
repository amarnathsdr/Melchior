import React, {Component} from 'react';

import Bloc from '../Bloc/Bloc'
import {connect} from "react-redux";
import {changerChemin} from "../../actions";
import {ajouterChemin} from "../../actions";

import {sous_systeme} from '../fixtures/sous_systeme';
import {section} from '../fixtures/section';
import {documents} from '../fixtures/documents';
import {ajouterDocumentDroite} from "../../actions";

    
import './Vue_image.css'


const mapStateToProps = state => {
    return{
        chemin: state.chemin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ajouterChemin : chemin => {
            dispatch(ajouterChemin(chemin))
        },
        changerChemin : (chemin) => {
            dispatch(changerChemin(chemin))
        },
        ajouterDocumentDroite: idDoc => {
            dispatch(ajouterDocumentDroite(idDoc))
        }
    }
}

class Vue_imageContainer extends Component {
    
    constructor(props){
        super(props);
    }
    
    ouvrirChemin = (idSousSysteme,index) => {
        if(this.props.chemin.length==index){
            this.props.ajouterChemin(idSousSysteme);
        }else{
            const test=this.props.chemin;
            const test2=test.fill(idSousSysteme,index,index+1);
            const test3=test2.fill(-1,index+1,this.props.chemin.length);
            const test4=[...test3];
            this.props.changerChemin(test4);
        }
    }
   
    componentWillMount(){
         if(this.props.chemin.length==0){
            this.props.ajouterChemin(this.props.systeme);
        }
    }
   
    render(){
          
        const renvoie = sous_systeme.map((sous_systeme)=>
                                         
            sous_systeme.nom_systemes==this.props.systeme &&
                                         
                <a onClick={()=>{this.ouvrirChemin(sous_systeme.id_sous_systeme,1);
                                }}>         
                    <Bloc nom={sous_systeme.nom_sous_systeme} image={sous_systeme.lien_image} format="0"/>
                </a>
        );
        
        return(
            <div className="niveau">
                <div>
                    {renvoie}
                </div>
                   
                <div>
                    {section.map((section)=>
                     section.id_sous_systemes==this.props.chemin[1] &&
                        <a onClick={()=>this.ouvrirChemin(section.id_section,2)}>         
                            <Bloc nom={section.nom_section} image={section.lien_image} format="0"/>  
                        </a>
                    )}
                </div>
                
                <div>
                    {documents.map((documents)=>
                     documents.id_section==this.props.chemin[2] &&
                        <a onClick={()=>{this.props.radioAtrueDroite(documents.id_document,documents.id_section);
                                         this.props.ajouterDocumentDroite(documents.id_document);
                                        }
                                    }>
                        <Bloc nom={documents.nom_document} image={documents.lien_image} format={documents.format}/>
                        
                        </a>
                    )}
                     
                </div>
                
            </div>
        );
    }
}

const Vue_image = connect(mapStateToProps,mapDispatchToProps)(Vue_imageContainer);

export default Vue_image;