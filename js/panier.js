// ------ Début implémentation JS panier -----------

// Récupération des données du localStorage 
let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));

// Affichage des produits du localStorage dans le panier
const panierProduit = document.querySelector("#panier-contenu");
let structurePanierProduit = [];

// Constante qui contient les valeurs de notre objet
const produitValues = produitLocalStorage || [];

// Si le panier est vide : afficher le panier vide 
if (produitLocalStorage === null || produitLocalStorage == 0) {
    const panierVide = 
    `
    <tr>
        <td colspan="5" id="panier-produit-vide">
            <p>Le panier est vide</p>
        </td>
    </tr>
    `
    panierProduit.innerHTML = panierVide;
} else { // Si le panier n'est pas vide, afficher les produits du localStorage

    // Boucle sur les valeurs (produitValues)
    for (let i = 0; i < produitValues.length; i++) {
        structurePanierProduit = structurePanierProduit + 
        
        `
        <tr class="container-recapitulatif">
            <td class="recap-produit"> ${produitValues[i].name}</td>
            <td class="recap-objectif"> ${produitValues[i].objectif}</td>
            <td id="recap-quantite">
            <button class="moins" data-product-id="${produitValues[i]._id}" data-product-lense="${produitValues[i].objectif}">-</button>
            <span class="boutons-quantite" data-product-id="${produitValues[i]._id}" data-product-lense="${produitValues[i].objectif}">${produitValues[i].quantite}</span>
            <button class="plus" data-product-id="${produitValues[i]._id}" data-product-lense="${produitValues[i].objectif}">+</button>
            </td>
            <td class="recap-prix" data-product-id="${produitValues[i]._id}" data-product-lense="${produitValues[i].objectif}">${(produitValues[i].price* produitValues[i].quantite) /100}€</td> 
            <td><button class="btn-supprimer"><i class="fas fa-trash-alt"></i></button></td>
        </tr>  
        ` ;
    }   
        // Injection du code html dans le panier
        panierProduit.innerHTML = structurePanierProduit;
}

// ---------------------------------------------------------------------------------//

// Fonction qui me renvoi le total
function getTotal () {
    // Déclaration de la variable du prix total
    let prixTotalPanier = [];

    // Récupération des données de prix dans le localStorage
    for (let j = 0; j < produitValues.length; j++) {
        let prixProduitsPanier = (produitValues[j].price * produitValues[j].quantite)/100;
        // Ajout des données de prix dans la variable du prix total du panier
        prixTotalPanier.push(prixProduitsPanier);
    }

    // Calcul du prix global se trouvant dans la variable prixTotalPanier à l'aide de la méthode "reduce()"
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sommePanier = prixTotalPanier.reduce(reducer, 0);
    return sommePanier;
}

// Fonction qui affiche le total dans la dernière ligne du panier (ligne total)
function calculerTotal () {

    const sommePanier = getTotal ();

    // Affichage du résultat et sa valeur en euro avec l'objet Intl.NumberFormat dans la page html 
    document.getElementById("panier-prix").innerHTML = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(sommePanier); 
}

// ------------------------------------------------------------------------- // 

// Bouton supprimer un article
const deleteItem = document.querySelectorAll(".btn-supprimer");
deleteItem.forEach((btn, i) => {
    btn.addEventListener('click', e => {
        deleteItemSelected(i);
    });
});

    // Suppression de l'article sélectionné dans le localStorage
    function deleteItemSelected(index) {
        // Alerte suppresion d'un produit et refresh de la page en cas de validation
        if (confirm("Etes-vous sur de vouloir supprimer ce produit du panier ?")) {
        produitLocalStorage.splice(index, 1);
        localStorage.setItem('panier', JSON.stringify(produitLocalStorage));
            document.location.reload();
        structurePanierProduit(produitLocalStorage);}
    }

// -----------------------------------------------------------------------------//

// Déclaration boutons ajouter - supprimer produit dans le panier
let boutonsMoins = document.getElementsByClassName('moins');
let boutonsPlus = document.getElementsByClassName('plus');

// Fonction maj quantite suite à l'appel des boutons
function updateQuantite (id, objectif, quantite) {
    document.querySelector(`.boutons-quantite[data-product-id="${id}"][data-product-lense="${objectif}"]`).innerHTML = quantite;
}

// Fonction maj prix suite à l'appel des boutons
function updatePrix (id, objectif, prix) {
    document.querySelector(`.recap-prix[data-product-id="${id}"][data-product-lense="${objectif}"]`).innerHTML = prix + "€";
}

// Function mise à jour quantité panier 
function majQuantite (majType, productId, productLense) {
    for (let i = 0; i < produitValues.length; i++) {
        if (produitValues[i]._id === productId && produitValues[i].objectif === productLense)  { 
            if (majType === "increment") {
                produitValues[i].quantite++;
            }
            if (produitValues[i].quantite === 1) {  
                deleteItemSelected(i);
                return;
            }
            if (majType === "decrement") {
                produitValues[i].quantite--;
            } 
            updateQuantite(produitValues[i]._id, produitValues[i].objectif, produitValues[i].quantite);
            updatePrix(produitValues[i]._id, produitValues[i].objectif, (produitValues[i].price * produitValues[i].quantite)/100);
        }
    }
    localStorage.setItem('panier', JSON.stringify(produitLocalStorage));
    calculerTotal();
}

// Cas supression d'un article, bouton "-"
// Boucle sur le bouton pour récupérer le tableau des differents boutons
for (let j = 0; j < boutonsMoins.length; j++) {
    boutonsMoins[j].addEventListener('click', function (e) {
        majQuantite('decrement', e.target.dataset.productId, e.target.dataset.productLense);
    })
}
// Afficher le montant par l'appel de la fonction
calculerTotal();


// Cas d'ajout d'un article, bouton "+"
// Boucle sur le bouton pour récupérer le tableau des differents boutons
for (let j = 0; j < boutonsPlus.length; j++) {
    boutonsPlus[j].addEventListener('click', function (e) {
        majQuantite('increment', e.target.dataset.productId, e.target.dataset.productLense);
    })
}
// Afficher le montant par l'appel de la fonction
calculerTotal();

// -----------------------------------------------------------------------------//

// Bouton vider entièrement le panier 
document.getElementById("button-vider").addEventListener('click', function () {
    localStorage.removeItem('panier');
    window.location.reload();
})

// -----------------------------------------------------------------------------//


// Formulaire de confirmation d'achat 

// Fonction d'envoi des données du formulaire via la méthode API fetch POST
function sendFormData(data) { 

    fetch("https://oc-p5-api.herokuapp.com/api/cameras/order", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(response => {
        storeIdName(response); 
    })
    .catch(error => alert("Erreur : " + error));   
}

// Envoi des données avec cette même fonction 
const form = document.querySelector('form');
const formDeflt = document.getElementById('prevent-msg');

form.addEventListener('submit', function (e) {
    // Comportement par défaut qui empêche l'envoi du formulaire sans la validation préalable
    e.preventDefault(); 
    // Récupération des valeurs du client
    let contact = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value
    };
    // Récupération des données du panier (ids des produits séléctionnés)
    let products = produitValues.map(camera => camera._id);
    order = {contact, products};
    // si aucun article n'est présent dans le panier, afficher le bouton retour au choix des produits
    if (products.length == 0) {
        formDeflt.style.visibility = "visible";
        formDeflt.style.zIndex = "2000";
    // Sinon, envoie des données du formulaire via la fonction API fecth POST
    } else {
        sendFormData(order);
    }
});


// Validation préalable du formulaire
const inputs = document.querySelectorAll("input");

const infosClient = {
    contact: {},
    products: [],
}

const checkValidity = (input) => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault()
        if (!e.target.validity.valid) {
            e.target.parentElement.classList.add('error')
        }
    })
    input.addEventListener('input', (e) => {
        if (e.target.validity.valid) {
            e.target.parentElement.classList.remove('error')
            return (infosClient.contact = {
                firstName: prenom.value,
                lastName: nom.value,
                address: adresse.value,
                city: ville.value,
                email: email.value,
            })
        }
    })
}

Array.from(inputs).forEach(checkValidity);

// Function qui confirme la commande 
async function storeIdName(data) {
    localStorage.setItem("orderId", data.orderId);
    localStorage.setItem("orderName", data.contact.firstName);
    localStorage.setItem("orderTotal", getTotal ());
    // Vider le panier une fois la confirmation faite
    localStorage.removeItem('panier');
    // Renvoie vers la page de confirmation de commande, avec le prix total en memoire dans l url
    window.location.href = "confirmation.html";
}





