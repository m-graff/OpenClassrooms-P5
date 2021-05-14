// ------ Début implémentation JS panier -----------

// Récupération des données du localStorage 
let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(produitLocalStorage);

// Affichage des produits du localStorage dans le panier
const panierProduit = document.querySelector("#panier-contenu");
let structurePanierProduit = [];

// Constante qui contient les valeurs de notre objet
const produitValues = produitLocalStorage;

// Si le panier est vide : afficher le panier vide 
if (produitLocalStorage === null || produitLocalStorage == 0) {
    const panierVide = 
    `
        <div id="panier-produit-vide">
            <p>Le panier est vide</p>
        </div>
    `
    panierProduit.innerHTML = panierVide;
    console.log(panierProduit);
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
            <button value="+" class="plus">+</button>
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

// Fonction calcul total
function calculerTotal () {

// Déclaration de la variable du prix total
let prixTotalPanier = [];

// Récupération des données de prix dans le localStorage
for (let j = 0; j < produitValues.length; j++) {
    let prixProduitsPanier = (produitValues[j].price * produitValues[j].quantite)/100;
    // Ajout des données de prix dans la variable du prix total du panier
    prixTotalPanier.push(prixProduitsPanier);
    console.log(prixTotalPanier);
}

// Calcul du prix global se trouvant dans la variable prixTotalPanier à l'aide de la méthode "reduce()"
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const sommePanier = prixTotalPanier.reduce(reducer, 0);
console.log(sommePanier);

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
let boutonPlus = document.getElementById('plus');

// Fonction maj quantite suite à l'appel des boutons
function updateQuantite (id, objectif, quantite) {
    document.querySelector(`.boutons-quantite[data-product-id="${id}"][data-product-lense="${objectif}"]`).innerHTML = quantite;
}

// Fonction maj prix suite à l'appel des boutons
function updatePrix (id, objectif, prix) {
    document.querySelector(`.recap-prix[data-product-id="${id}"][data-product-lense="${objectif}"]`).innerHTML = prix + "€";
}

// Cas supression d'un article, bouton "-"
// Boucle sur le bouton pour récupérer le tableau des differents boutons
for (let j = 0; j < boutonsMoins.length; j++) {

    boutonsMoins[j].addEventListener('click', function (e) {
        console.log(e.target.dataset);
        for (let i = 0; i < produitValues.length; i++) {
            if (produitValues[i]._id === e.target.dataset.productId &&  produitValues[i].objectif === e.target.dataset.productLense)  { 
                produitValues[i].quantite--;
                updateQuantite(produitValues[i]._id, produitValues[i].objectif, produitValues[i].quantite);
                updatePrix(produitValues[i]._id, produitValues[i].objectif, (produitValues[i].price * produitValues[i].quantite)/100);
            }
            console.log(produitValues);
        }
        localStorage.setItem('panier', JSON.stringify(produitLocalStorage));
        calculerTotal();
    })
}

// Afficher le montant par l'appel de la fonction
calculerTotal();




















// -----------------------------------------------------------------------------//

/*
// Formulaire de confirmation d'achat

// Récupération de la saisie du client
const form = document.getElementsByClassName(".form-panier");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const adresse = document.getElementById("adresse");
const ville = document.getElementById("ville");
const email = document.getElementById("email");

// Déclaration des REGEX
let regexText = /^[A-Za-zçàêéèîïÀÊÉÈÎÏ\s-]{2,}$/;
let regexAdresse = /^[A-Za-zçàêéèîïÀÊÉÈÎÏ0-9\s-]{2,}$/;
let regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;

// Ecoute de l'évènement lors de l'envoi du formulaire
document.querySelector(".form-panier").addEventListener('submit', function (e) {

    // Assignation par défaut du texte d'errur
    document.getElementById("error").textContent = "";
    e.preventDefault();

    // Vérification des champs du formulaire
    formCheck();

    // Assignation des inputs à l'object client
    let client = {
        prenom: document.getElementById("prenom").value,
        nom: document.getElementById("nom").value,
        adresse: document.getElementById("adresse").value,
        ville: document.getElementById("ville").value,
        email: document.getElementById("email").value,
    }

    // Si le panier n'existe pas ou qu'il est vide, signaler que le panier est vide 
    if (produitLocalStorage === null || Object.keys(produitLocalStorage)[0] === undefined) {
        let cartError = document.getElementById("error");
        cartError.textContent = "Attention, votre panier est vide !"
        console.log("Vous n'avez pas de produits dans votre panier")

        // Si les champs du formulaire ne sont pas respectés, appel aux REGEX pour signaler que le test de validations n'est pas rempli
    } else if (!regexEmail.test(email.value)
        || !regexText.test(prenom.value)
        || !regexText.test(nom.value)
        || !regexAdresse.test(adresse.value)
        || !regexText.test(ville.value)
    ) {
        console.log("Il y a une erreur lors du test de validation des inputs")
        // Sinon, créer le tableau contenant les id des objets
    } else {
            // Initialisation du tableau
            let productsToPost = [];
            // Pour tous les objets dans produitLocalStorage
            for (let camera in produitLocalStorage) {
                // Pour la longueur de la quantité
                for (let i = 0; i < produitLocalStorage[camera].quantity; i++) {
                    // Ajouter l'id de l'objet autant de fois ce même objet dans produitLocalStorage
                    productsToPost.push(produitLocalStorage[camera]._id);
                }
            }

            // Assignation de userContact et productsToPost pour l'envoyer au backend
            let allObjectsToPost = {
                contact : client,
                camera : productsToPost
            }

            // Méthode POST pour envoyer l'objet allObjectsToPost
            fetch('https://oc-p5-api.herokuapp.com/api/cameras/order', {
                method : 'POST',
                body : JSON.stringify(allObjectsToPost),
                headers : {
                    'Content-type' : 'application/json'
                }
            })

            // Récupération de la réponse du backend
            .then(response => response.JSON())
            .then(JSON => {
                console.log(json);

                // Dépuis l'objet retournée par le backend
                let orderPrice = localStorage.getItem('sommePanier')
                let order = json;
                order.prix = orderPrice;
                // Suppression du localStorage pour ne plus avoir de panier après validation
                localStorage.clear();
                // Ajout de l'objet order dans le localStorage qui contient la réponse du backend ainsi que le prix total
                localStorage.setItem('order', JSON.stringify(order));
            
                // Laisser le temps au navigateur d'indiquer que tout est bon, puis rediriger vers la page de remerciement
                setTimeout(redirection, 2000);
            })
        }
    })

    // Fonction vérifiant les inputs du formulaire
    function formCheck() {
        const prenomValue = prenom.value;
        const nomValue = nom.value;
        const adresseValue = adresse.value;
        const villeValue = ville.value;
        const emailValue = email.value

        // Vérifications Prénom
        if (prenomValue === '') {
            setErroFor(prenom, 'Veuillez entrer votre prénom');
        } else {
            setSuccessFor(prenom, '');
        }

        // Vérifications nom
        if (nomValue === '') {
            setErroFor(nom, 'Veuillez entrer votre nom');
        } else {
            setSuccessFor(nom, '');
        }

        // Vérifications Adresse
        if (adresseValue === '') {
            setErroFor(adresse, 'Veuillez entrer votre adresse');
        } else {
            setSuccessFor(adresse, '');
        }

        // Vérifications Ville 
        if (villeValue === '') {
            setErroFor(ville, 'Veuillez entrer votre ville');
        } else {
            setSuccessFor(ville, '');
        }

        // Vérifications email
        if (emailValue === '') {
            setErroFor(email, 'Veuillez entrer votre email');
        } else if (!regexEmail.test(emailValue)) {
            console.log(email, 'Attention, adresse mail invalide')
        } else {
            setSuccessFor(email, '');
        }
    }

    function setErrorFor(input, message) {
        const formGroup = input.parentElement;
        const errorText = formGroup.querySelector("div");
        errorText.textContent = message;
        input.classList = "form-input";
    }

    function setSuccessFor(input, message) {
        const formGroup = input.parentElement;
        const errorText = formGroup.querySelector("div");
        errorText.textContent = message;
        input.classList = "form-input";
    }

    function redirection() {
        document.location.href="confirmation.html";
        console.log(redirection);
    }
*/
   