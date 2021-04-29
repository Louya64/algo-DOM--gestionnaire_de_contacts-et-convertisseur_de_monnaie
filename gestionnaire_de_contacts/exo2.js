class Contact {
    constructor(nom, prenom, tel) {
        this.nom = nom
        this.prenom = prenom
        this.tel = tel
    }
}

const toto = new Contact("Flipi", "Toto", "06-65-57-34-78");
const hercule = new Contact("Legros", "Hercule", "06-65-57-34-78");

let liste_contacts = [toto, hercule];
let nb_nouveau_contact = 0;
let contacts_visibles = false; 
let btn_affiche_click = false;

const nb_contacts = document.getElementById("nb_contacts");
const repertoire = document.getElementById("repertoire");
const tableau_contacts = document.getElementById("tableau_contacts");
const btn_ouvrir = document.getElementById("btn_ouvrir");
btn_ouvrir.addEventListener("click", ouvrirRepertoire);

function ouvrirRepertoire() {

    repertoire.textContent = null;

    nbContacts();

    //création des boutons du répertoire
    const btn_affiche_contacts = document.createElement("button");
    repertoire.appendChild(btn_affiche_contacts);
    btn_affiche_contacts.addEventListener("click", bntClick);
    btn_affiche_contacts.addEventListener("click", afficheContacts);
    btn_affiche_contacts.textContent = "Afficher les contacts";
    const btn_ajout_contact = document.createElement("button");
    repertoire.appendChild(btn_ajout_contact);
    btn_ajout_contact.addEventListener("click", ajoutContact);
    btn_ajout_contact.textContent = "Ajouter un contact";
    const btn_supprime_contact = document.createElement("button");
    repertoire.appendChild(btn_supprime_contact);
    btn_supprime_contact.addEventListener("click", supprimeContact);
    btn_supprime_contact.textContent = "Supprimer un contact";
    const btn_fermer = document.createElement("button");
    repertoire.appendChild(btn_fermer);
    btn_fermer.addEventListener("click", fermerRepertoire);
    btn_fermer.textContent = "Quitter";
}

function nbContacts() {
    nb_contacts.textContent = "";
    nb_contacts.textContent = "Il y a " + liste_contacts.length + " contacts dans le répertoire";
}

////////  fonctions des boutons internes //////////////////////
function bntClick() {
    btn_affiche_click = true;
}

function afficheContacts() {

    //en cliquant sur le btn,
    //si tableau contact déjà affiché, on ferme,
    if (contacts_visibles == true && btn_affiche_click == true) {
        contacts_visibles = false;
        tableau_contacts.textContent = "";
    } 
    //sinon on affiche 
    else {
        contacts_visibles = true;

        //création du tableau et ligne des en-têtes
        tableau_contacts.textContent = "";
        let table = document.createElement("table");
        tableau_contacts.appendChild(table);
        let tr = document.createElement("tr");
        table.appendChild(tr);
        let td1 = document.createElement("th");
        tr.appendChild(td1);
        td1.textContent = "Nom";
        let td2 = document.createElement("th");
        tr.appendChild(td2);
        td2.textContent = "Prénom";
        let td3 = document.createElement("th");
        tr.appendChild(td3);
        td3.textContent = "n° téléphone";
    
        //création 1 ligne du tableau par contact
        for (let i = 0; i < liste_contacts.length; i++) {
            let tr = document.createElement("tr");
            table.appendChild(tr);
            let td1 = document.createElement("td");
            tr.appendChild(td1);
            td1.textContent = liste_contacts[i].nom
            let td2 = document.createElement("td");
            tr.appendChild(td2);
            td2.textContent = liste_contacts[i].prenom;
            let td3 = document.createElement("td");
            tr.appendChild(td3);
            td3.textContent = liste_contacts[i].tel;
        }
    }
    btn_affiche_click = false;
}

function ajoutContact() {

    //tableau de nouveaux contacts pour les différencier par le n° de leur index
    let nouveau_contact = [];

    nouveau_contact[nb_nouveau_contact] = new Contact;
    nouveau_contact[nb_nouveau_contact].nom = prompt("Nom :");
    nouveau_contact[nb_nouveau_contact].prenom = prompt("Prénom :");
    nouveau_contact[nb_nouveau_contact].tel = "";

    //vérification que le n°tel a bien 10 chiffres (suppression de tout carctère autre que Number)
    while (nouveau_contact[nb_nouveau_contact].tel.length != 10) {
        let num_tel = prompt("N° de téléphone (10 chiffres):");
        num_tel.split(num_tel, "");
        for (let i = 0; i < num_tel.length; i ++) {
            parseInt(num_tel[i]);

            if (!isNaN(num_tel[i])) {
                nouveau_contact[nb_nouveau_contact].tel += num_tel[i];
            }
        }
    }

    //mise en forme n°tel avec des - entre nombres
    nouveau_contact[nb_nouveau_contact].tel = 
    nouveau_contact[nb_nouveau_contact].tel[0] +
    nouveau_contact[nb_nouveau_contact].tel[1] + "-" +
    nouveau_contact[nb_nouveau_contact].tel[2] +
    nouveau_contact[nb_nouveau_contact].tel[3] + "-" +
    nouveau_contact[nb_nouveau_contact].tel[4] +
    nouveau_contact[nb_nouveau_contact].tel[5] + "-" +
    nouveau_contact[nb_nouveau_contact].tel[6] +
    nouveau_contact[nb_nouveau_contact].tel[7] + "-" +
    nouveau_contact[nb_nouveau_contact].tel[8] +
    nouveau_contact[nb_nouveau_contact].tel[9];

    //ajout nouveau contact dans liste_contact
    liste_contacts.push(nouveau_contact[nb_nouveau_contact]);
    nb_nouveau_contact++; // prêt pour futur ajout contact

    //actualisation visuelle du tableau de contacts
    if (contacts_visibles == true) {
        afficheContacts();
    }
    nbContacts();
}

function supprimeContact() {

    let suppression = prompt("Quel contact supprimer? (nom ou prénom)");
    let present = false;

    //parcours des contacts pour supprimer si il existe
    for (let i = 0; i < liste_contacts.length; i++) {
        if (suppression == liste_contacts[i].nom || suppression == liste_contacts[i].prenom) {
            liste_contacts.splice(i, 1);
            present = true;

            //actualisation visuelle du tableau de contacts en cas de suppression
            if (contacts_visibles == true) {
                afficheContacts();
            }
            nbContacts();
        }
    }
    if (!present) {  //si il n'existe pas ==> message erreur
        alert("Personne de ce nom n'est présent dans le répertoire (attention au respect des majuscules)");
    }
}

function fermerRepertoire() {
    repertoire.textContent = "";
    tableau_contacts.textContent = "";
    nb_contacts.textContent = "";
    contacts_visibles = false;
}