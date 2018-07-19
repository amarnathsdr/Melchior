import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {
    
  confidentiel(){
      
      var tabConf = this.props.confidentiel.split("-");  
      var baliseConf = [];
      var nombreConfidentiel;
      /*Calcul du nombre de confientialité définissant le nom de la classe de la balise pour calculer la bonne taille des images */
      if(tabConf.length===2){
          nombreConfidentiel="deux";
      }else if(tabConf.length===3){
          nombreConfidentiel="trois";
      }else if(tabConf.length===4){
          nombreConfidentiel="quatre";
      }
      if(this.props.confidentiel==""){
          
      }
      else{
        for(var i=0; i<tabConf.length;i++){
            var imageLien='./'+tabConf[i]+'.png';
            baliseConf.push(<img src={imageLien} className={nombreConfidentiel}/>);
        }  
      }
      return baliseConf;      
  }
  
  render() {
      
      const copyright = "© Copyright Thales 2018"
      const date = "Avril 2018"
      
        return (
            <footer>
                <p className="copyright">{copyright}</p>
                {this.confidentiel()}
                <p className="date">{date}</p>
            </footer>
        );
    
  }
}
      


export default Footer