// ------ Début implémentation JS produit -----------

// Récupération des données du localStorage 
let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(produitLocalStorage);



// Affichage des produits du localStorage dans le panier
const panierProduit = document.querySelector("#panier-contenu");
let structurePanierProduit = [];

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
    for (let i = 0; i < produitLocalStorage.length; i++) {
        structurePanierProduit = structurePanierProduit + 
        
        `
        <div class="container-recapitulatif">
            <div><span class="gras">Quantité :</span> ${produitLocalStorage[i].quantite} <span class="gras"> - Produit : </span> ${produitLocalStorage[i].name} - ${produitLocalStorage[i].objectif}</div>
            <div>
                <div class="prix-produit"><span class="gras">${produitLocalStorage[i].price}€</span></div> 
                <div><button class="btn-supprimer"> supprimer </button></div>
            </div>
      </div>   
        ` ;

    }  
        // Injection du code html dans le panier
        panierProduit.innerHTML = structurePanierProduit;
}
