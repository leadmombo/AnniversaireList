function anniv_ajout() {  
    anniv_personne = document.querySelector('#anniv_personne').value;  
    anniv_date = document.querySelector('#anniv_date').value;  
    anniversaire = {  
        'anniv_personne': anniv_personne,  
        'anniv_date': anniv_date  
    };  
    nb_anniv = anniv_get_nb_anniv();  
    localStorage.setItem(nb_anniv.toString(), JSON.stringify(anniversaire)); 
    nb_anniv++;  
    localStorage.setItem('nb_anniv', JSON.stringify(nb_anniv)); 
    document.querySelector('#anniv_personne').value = "";  
    document.querySelector('#anniv_date').value     = "";  
    anniv_liste();  
}  
  
function anniv_liste() {  
    nb_anniv = anniv_get_nb_anniv();  
    result = "";  
    if (nb_anniv == 0) {  
        result = '<h3>Aucun anniversaire enregistré<h3>';  
    }  
    for (i=0;i<nb_anniv;i++) {  
        anniversaire = JSON.parse(localStorage.getItem(i.toString()));  
        result+='<br />'+anniversaire.anniv_date+' : '+  
        anniversaire.anniv_personne;  
    }  
    document.querySelector('#anniv_liste').innerHTML = result;  
    return nb_anniv;  
}  
  
function anniv_get_nb_anniv() {  
    nb_anniv = localStorage.getItem('nb_anniv');  
    if (typeof nb_anniv == "undefined" || nb_anniv == null) {  
        nb_anniv = 0;  
    }  
    return nb_anniv;  
} 
