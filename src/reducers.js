import {documents} from './components/fixtures/documents';
import {systeme} from './components/fixtures/systeme';

const initialState = {
    systeme:'',
    nomDocGauche:'',
    lienDocGauche:'',
    nomDocDroite:'',
    lienDocDroite:'',
    formatGauche:'',
    formatDroite:'',
    videoMiniature:[],
    lienMiniatureDroite:[],
    videoMiniatureg:[],
    lienMiniatureGauche:[],
    indexVMGauche:0,
    indexVMDroite:0,
    chemin:[],
    putaindetest:0
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CHANGE_SYSTEME':
            return Object.assign({},state,{systeme:action.systeme,chemin:[...state.chemin,action.systeme]})
        case 'ADD_DOC_GAUCHE':
            return Object.assign({},state,{
                nomDocGauche: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.nom_document
                }),
                lienDocGauche: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.lien_document
                }),
                formatGauche: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.format
                })
            })    
        case 'ADD_DOC_DROITE':
            return Object.assign({},state,{
                nomDocDroite: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.nom_document
                }),
                lienDocDroite: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.lien_document
                }),
                formatDroite: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.format
                })
            })
        case 'CHANGE_DOC_DROITE':
             return Object.assign({},state,{
                nomDocDroite: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.nom_document
                }),
                lienDocDroite: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.lien_document
                }),
                formatDroite: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.format
                })
            })
        case 'CHANGE_DOC_GAUCHE':
             return Object.assign({},state,{
                nomDocGauche: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.nom_document
                }),
                lienDocGauche: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.lien_document
                }),
                formatGauche: documents.map((documents)=> {
                    if(documents.id_document == action.idDoc)
                        return documents.format
                })
            })
        case 'VIDEO_MINIATURE_LISTE':
            return Object.assign({},state,{
                videoMiniature:action.listeVideo
            })
        case 'LIEN_MINIATURE_DROITE':
            return Object.assign({},state,{
                lienMiniatureDroite:action.lienVideo
            })
        case 'VIDEO_MINIATURE_LISTE_GAUCHE':
            return Object.assign({},state,{
                videoMiniatureg:action.listeVideo
            })
        case 'LIEN_MINIATURE_GAUCHE':
            return Object.assign({},state,{
                lienMiniatureGauche:action.lienVideo
            })
        case 'INDEX_VM_G':
            return Object.assign({},state,{
                indexVMGauche:action.i
            })
        case 'INDEX_VM_D':
            return Object.assign({},state,{
                indexVMDroite:action.i
            })
        case 'AJOUTER_CHEMIN':
            return Object.assign({},state,{
                chemin:[...state.chemin,action.chemin]
            })
        case 'CHANGER_CHEMIN':
            return Object.assign({},state,{
                chemin:action.chemin
            })
        default:
            return state
    }
};

export default rootReducer;

