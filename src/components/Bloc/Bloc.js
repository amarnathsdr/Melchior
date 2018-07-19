import React, {Component} from 'react';

import './Bloc.css'
import image from '../images/png/frame-landscape.png';
import pdf from '../images/pdf.png';
import video from '../images/video.png';

class Bloc extends Component {
    
    constructor(props){
        super(props);
    }
    render(){
        return(
              <div className="bloc">
                    
                    {
                        this.props.image==false ? (     
                                this.props.format!="0" &&(
                                    this.props.format=="pdf" ?(
                                        <img src={pdf}/>
                                    ):(
                                        <img src={video}/>
                                    )
                                )
                            ):(
                            <img src={this.props.image}/>
                    )}
                    <p>{this.props.nom}</p>
              </div>
        );
    }
}

export default Bloc;