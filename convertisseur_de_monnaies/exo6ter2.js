
class Monnaie {
    constructor(nom, ligneMonnaie, val) {
    this.nom = nom;
    this.ligneMonnaie = ligneMonnaie;
    this.val = val;
    }
}

//entrée des 5 monnaies de base
const euro = new Monnaie (
    "euro",
    document.getElementById("euro"),
    1
)
const dollar = new Monnaie (
    "dollar",
    document.getElementById("dollar"),
    1.22
)
const rouble = new Monnaie (
    "rouble",
    document.getElementById("rouble"),
    91.14
)
const yen = new Monnaie (
    "yen",
    document.getElementById("yen"),
    7.89
)
const livre = new Monnaie (
    "livre",
    document.getElementById("livre"),
    0.89
)

let liste_monnaies = [euro, dollar ,rouble, yen, livre];
let monnaie_entree;//pour cibler sur quel btn montant l'utilisateur click et donc la valeur de référence pour la convertion
let btn;//pour stocker this et le faire passer à la fonction d'après
let montant_user;
let nb_nouvelles_monnaies = 0;//pour "nommer" différemment les nouvelles monnaies dans liste_monnaies

for (let i = 0; i < liste_monnaies.length; i++) {
    ((liste_monnaies[i].ligneMonnaie).children[0].children[0]).addEventListener("click", entrerMonnaie);
}

const tableau = document.getElementById("table_convertion");

const btn_convertion = document.getElementById("btn_convertion");
btn_convertion.addEventListener("click", convertion);

const btn_ajout_devise = document.getElementById("btn_ajout_devise");
btn_ajout_devise.addEventListener("click", ajoutDevise);

///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////      BOUTONS "MONTANT"      ///////////////////////////////////////////////
function entrerMonnaie() {
    clear();
    //affectation de la valeur de référence (selon btn cliqué)
    for (let i = 0; i < liste_monnaies.length; i++) {
        if (this.parentNode.parentNode.id == liste_monnaies[i].nom) {
            monnaie_entree = liste_monnaies[i].val;
        }
    }
    btn = this;
    setTimeout(demanderMontant, 500);//pour que le prompt ne s'active pas avant le reste sur chrome
}

//efface tout et recommence (sans ça, on réaffiche un nouveau tableau en dessous de l'ancien)
function clear() {
    for (let i = 0; i < liste_monnaies.length; i++) {
        ((liste_monnaies[i].ligneMonnaie).children[1]).textContent = "";
        ((liste_monnaies[i].ligneMonnaie).children[1]).classList.remove("purple");
    }
}

function demanderMontant() {
    montant_user = parseFloat(prompt("Quel montant?"));
    while (isNaN(montant_user) || montant_user < 0) {
        montant_user = parseFloat(prompt("Quel montant?"));
    }
    btn.parentNode.parentNode.children[1].textContent = montant_user;
    btn.parentNode.parentNode.children[1].classList.add("purple");//met en évidence la monnaie choisie
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////     BOUTON "CONVERTION"         ///////////////////////////////////////////
function convertion() {
    for (let i = 0; i < liste_monnaies.length; i++) { 
        ((liste_monnaies[i].ligneMonnaie).children[1]).textContent = (montant_user * liste_monnaies[i].val / monnaie_entree).toFixed(2);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////      BOUTON "AJOUT DEVISE"           ///////////////////////////////////////
function ajoutDevise() {
    clear();
    setTimeout(ajoutDevise2, 500);//pour que le prompt ne s'active pas avant le reste sur chrome
}

//on demande les infos à l'utilisateur
function ajoutDevise2() {
    let nom_devise = prompt("Indiquez le nom de la nouvelle devise");
    let taux_devise = parseFloat(prompt("Combien vaut-elle pour 1€?"));
    let icone = prompt("Voulez-vous y assigner un symbole?");
    insertionTableau(nom_devise, icone, taux_devise);
}

//création de la nouvelle ligne dans le tableau
function insertionTableau(nom, icone, valeur) {
    let tr = document.createElement("tr");
    tableau.appendChild(tr);
    tr.setAttribute("id", nom);
    let td1 = document.createElement("td");
    tr.appendChild(td1);
    let btn = document.createElement("button");
    if (icone == undefined) {
        icone = "?";
    }
    btn.textContent = "Montant en " + icone ;
    btn.addEventListener("click", entrerMonnaie);
    td1.appendChild(btn);
    let td2 = document.createElement("td");
    tr.appendChild(td2);
    td2.classList.add("montant");
    let td3 = document.createElement("td");
    tr.appendChild(td3);
    td3.classList.add("devise");
    td3.textContent = icone;
    let td4 = document.createElement("td");
    tr.appendChild(td4);
    td4.textContent = nom;
    creationObjetMonnaie(nom, valeur);
}

//création du nouvel objet et push dans liste_monnaies
function creationObjetMonnaie (nom, valeur) {
    nb_nouvelles_monnaies++;
    let nouvelle_monnaie = [];
    nouvelle_monnaie[nb_nouvelles_monnaies] = new Monnaie;
    nouvelle_monnaie[nb_nouvelles_monnaies].nom = nom;
    nouvelle_monnaie[nb_nouvelles_monnaies].ligneMonnaie = document.getElementById(nom);
    nouvelle_monnaie[nb_nouvelles_monnaies].val = valeur;
    liste_monnaies.push(nouvelle_monnaie[nb_nouvelles_monnaies]);
}