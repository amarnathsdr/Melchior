import React, {Component} from 'react';

import './Vue_liste.css'
import {documents} from '../fixtures/documents';
import pdf from '../images/pdf.png';
import video from '../images/video.png';

class Vue_liste extends Component {
    
    constructor(props){
        super(props);
        this.state={
            bloctest:false
        }
    }
    render(){
        return(
            <div className="index">
              <div className={this.state.bloctest==true ? "bloctest" : "bloctest50"}>
                    <p className="titre">Titre et référence de la documentation</p>
                                
                    <div className="nomTableau">
                                <div className="format"> Format </div>
                                <p> Titre </p>
                                <p> Edition </p>
                                <p> Reference </p>
                                <p> Classification </p>
                            </div>
            
                    {documents.map((documents)=>
                        documents.systeme==this.props.systeme &&
                            <div className="tableau">
                                <div className="imageTab">
                                {documents.format=="pdf" ?(
                                        <a href={documents.lien_document} target="_blank"><img src={pdf}/></a>
                                    ):(
                                        <img src={video}/>
                                    )}
                                </div>
                                <p> {documents.nom_document}</p>
                                <p> {documents.reference}</p>
                                <p> {documents.edition}</p>
                                <p> {documents.classification}</p>
                            </div>
                    )}
              </div> 
            </div>
        );
    }
}
export default Vue_liste;