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
    charge_couleurs();
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

function anniv_get_nb_anniv() {
    nb_anniv = localStorage.getItem('nb_anniv');
    if (typeof nb_anniv == "undefined" || nb_anniv == null) {
        nb_anniv = 0;
    }
    return nb_anniv;
}

function charge_couleurs() {
    nb_anniv = anniv_get_nb_anniv();
    // On vide la div contenant les couleurs si elle en contient pour recréer les couleurs.
    couleur_div = document.querySelector('#couleurs_proposees');
    couleur_div.innerHTML = '';

    couleur_list = Array();
    for (i=0;i<nb_anniv;i++) {
        anniversaire = JSON.parse(localStorage.getItem(i.toString()));
        couleur_list.push(anniversaire.couleur);
    }
    couleur_list_unique = couleur_list.filter(function(elem, pos) {
        return couleur_list.indexOf(elem) == pos;
    })
    // Génération et affichage des boutons
    couleur_list.filter(function(elem, pos) {
        couleur_div.innerHTML = couleur_div.innerHTML +
            '<button style="color:#'+elem+'">'+elem+'</button>';
    })
    // Ecouteurs de boutons pour remplir la couleur choisie
    $("#couleurs_proposees button").bind("click", function() {
        $('#couleur').val($(this).text());
    });
}

function masque_couleur(color) {
    $('#couleurs_proposees button').each(function( index ) {
        if ($(this).html().indexOf(color) > -1) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
}

$(document).ready(function() {
    charge_couleurs();
});

$("#couleur").bind( "keyup", function() {
    masque_couleur($(this).val());
});

