// ------ Début implémentation JS panier -----------

// Récupération des données du localStorage 
let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(produitLocalStorage);

//Création d'un objet final destiné à accueillir le regroupement de produits
const produitObject = {};
// Itération sur notre tableau de base
for (let i = 0; i < produitLocalStorage.length; i++) {
  // On extrait l'id de chaque produit car c'est sur cet id que l'on va faire notre regroupement
  const id = produitLocalStorage[i]._id + produitLocalStorage[i].objectif;
  // Si l'id n'existe pas dans notre objet final, on l'ajoute
  if (!produitObject[id]) {
      produitObject[id] = produitLocalStorage[i];
  } else {
    //Sinon, on incrémente seulement le compteur
    produitObject[id].quantite += parseInt(produitLocalStorage[i].quantite);
  }
} 
console.log(produitObject);


// Affichage des produits du localStorage dans le panier
const panierProduit = document.querySelector("#panier-contenu");
let structurePanierProduit = [];

// Constante qui contient les valeurs de notre objet
const produitValues = Object.values(produitObject);

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
            <td class="recap-quantite"><button class="minus">-</button> ${produitValues[i].quantite} <button class="plus">+</button></td>
            <td class="recap-prix">${(produitValues[i].price* produitValues[i].quantite) /100}€</td> 
            <td><button class="btn-supprimer"><i class="fas fa-trash-alt"></i></button></td>
        </tr>   
        ` ;

    }  
        // Injection du code html dans le panier
        panierProduit.innerHTML = structurePanierProduit;
}

// ---------------------------------------------------------------------------------//

// Affichage du montant total du panier //
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
/* const produitLocalStorage = produitValues */ 