import React, {Component} from 'react';

import './RechercheResultat.css';

import recherche from '../images/ic_recherche.png';


class RechercheResultat extends Component{
    render(){
        
        //Récupere un tableau avec les resultats de la recherche, retourne une grappe HTML
        const resultats = resultat.map((resultats)=>
                <div>
                    <p className="titreResultatRecherche">{resultats.titreResultatRecherche}</p>   
                    <p className="sousTitreResultat">{resultats.sousTitreResultat}</p> 
                    <p className="contenuResultatRecherche">{resultats.contenuResultatRecherche}</p> 
                </div>
        );
    
        return(
            
           <div className="rechercheResultat"> 
            
                {/*Zone bleu contenant le champs de recherche + le nombre de resultat trouvé + le nom de la recherche*/}
                <div className="zoneRecherche">
                    {/*Formulaire de recherche*/}
                    <form className="champRecherche">
                        <input type="search"/>

                        <input src={recherche} type="image" value="submit"/>
                    </form>
                    <p className="texteResultat1"> Résultat de la recherche pour : </p>
                    <p className="texteResultat2"> résultats trouvés. </p>
                </div>
                
                {/*Appelle le tableau de resultat*/}
                <div className="resultat">
                    {resultats}
                </div>
            
           </div> 
        );
    }
}

const resultat=[
    {titreResultatRecherche:"Ministere de la défense", sousTitreResultat:"Chemin/Chemin/Chemin", contenuResultatRecherche:"Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem sed ad lenitatem propensior, consulens in commune advocatos palatinarum primos scholarum adlocutus est mollius docens nec decere haec fieri nec prodesse addensque vocis obiurgatorio sonu quod si id placeret, post statuas Constantii deiectas super adimenda vita praefecto conveniet securius cogitari."},
    
    {titreResultatRecherche:"Ministere de la défense", sousTitreResultat:"Chemin/Chemin/Chemin", contenuResultatRecherche:"Quam ob rem circumspecta cautela observatum est deinceps et cum edita montium petere coeperint grassatores, loci iniquitati milites cedunt. ubi autem in planitie potuerint reperiri, quod contingit adsidue, nec exsertare lacertos nec crispare permissi tela, quae vehunt bina vel terna, pecudum ritu inertium trucidantur."},
    
    {titreResultatRecherche:"Ministere de la défense", sousTitreResultat:"Chemin/Chemin/Chemin", contenuResultatRecherche:"Et Epigonus quidem amictu tenus philosophus, ut apparuit, prece frustra temptata, sulcatis lateribus mortisque metu admoto turpi confessione cogitatorum socium, quae nulla erant, fuisse firmavit cum nec vidisset quicquam nec audisset penitus expers forensium rerum; Eusebius vero obiecta fidentius negans, suspensus in eodem gradu constantiae stetit latrocinium illud esse, non iudicium clamans."}
]

export default RechercheResultat
    


