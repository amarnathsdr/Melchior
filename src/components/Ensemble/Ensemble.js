import React, {Component} from 'react';
import SystemeContainer from '../Systemes/Systeme'
import {systeme} from '../fixtures/systeme';
    
import './Ensemble.css';

//Ce composant contient une liste de composant Systeme
//Ce composant permet d'afficher une liste de composant Systeme bien structuré

class Ensemble extends Component{
    //Ce constructeur permet de récuperer le props systeme et de l'inserer dans son état local
    //Grace à cet etat local, le render pourra lire les données necessaires
    constructor(props){
        super(props);
    }
    
    render(){
        //Associe une grappe HTML de type Systeme à chaque élement de la liste
        const systemes = systeme.map((systeme)=>
                systeme.home==true &&
                     <SystemeContainer  nom={systeme.nom_systeme}
                                        lienImage={systeme.lien_image} 
                    />
        );
        
        return(
            <div className="ensemble">
                {systemes}
            </div>
        );
    }
}

export default Ensemble