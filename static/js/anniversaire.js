function anniv_ajout() {
    anniv_personne = document.querySelector('#anniv_personne').value;
    anniv_date     = document.querySelector('#anniv_date').value;
    couleur     = document.querySelector('#couleur').value;
    anniversaire = {
        'anniv_personne': anniv_personne,
        'anniv_date': anniv_date,
        'couleur': couleur
    };
    nb_anniv = anniv_get_nb_anniv();
    localStorage.setItem(nb_anniv.toString(), JSON.stringify(anniversaire));
    nb_anniv++;
    localStorage.setItem('nb_anniv', JSON.stringify(nb_anniv));
    document.querySelector('#anniv_personne').value = "";
    document.querySelector('#anniv_date').value     = "";
    document.querySelector('#couleur').value     = "";
    anniv_liste();
}

/* Cette fonction affiche sur la page la liste des anniversaires stockés dans le localstorage du navigateur */
function anniv_liste() {
    nb_anniv = anniv_get_nb_anniv();
    result = "";
    if (nb_anniv == 0) {
        result = '<h3>Aucun anniversaire enregistré<h3>';
    }
    for (i=0;i<nb_anniv;i++) {
        anniversaire = JSON.parse(localStorage.getItem(i.toString()));
        result+='<br /><span style="background-color:#'+anniversaire.couleur+'">'+anniversaire.anniv_date+' : '+
        anniversaire.anniv_personne+'</span>';
    }
    document.querySelector('#anniv_liste').innerHTML = result;
    return nb_anniv;
}