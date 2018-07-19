export const changerSysteme = systeme => ({
        type:'CHANGE_SYSTEME',
        systeme
})

export const ajouterDocumentGauche = idDoc => ({
        type:'ADD_DOC_GAUCHE',
        idDoc
})
    
export const ajouterDocumentDroite = idDoc => ({
        type:'ADD_DOC_DROITE',
        idDoc
})
export const changerVideoPrincipaleDroite = idDoc =>({
        type:'CHANGE_DOC_DROITE',
        idDoc
})
export const changerVideoPrincipaleGauche = idDoc =>({
        type:'CHANGE_DOC_GAUCHE',
        idDoc
})

export const videoMiniatureDroite = listeVideo =>({
        type:'VIDEO_MINIATURE_LISTE',
        listeVideo
})

export const lienMiniatureDroite = lienVideo =>({
        type:'LIEN_MINIATURE_DROITE',
        lienVideo
})

export const videoMiniatureGauche = listeVideo =>({
        type:'VIDEO_MINIATURE_LISTE_GAUCHE',
        listeVideo
})

export const lienMiniatureGauche = lienVideo =>({
        type:'LIEN_MINIATURE_GAUCHE',
        lienVideo
})

export const indexVMg = i =>({
        type:'INDEX_VM_G',
        i
})
export const indexVMd = i =>({
        type:'INDEX_VM_D',
        i
})

export const ajouterChemin = chemin =>({
        type:'AJOUTER_CHEMIN',
        chemin
})
export const changerChemin = chemin =>({
        type:'CHANGER_CHEMIN',
        chemin
})
