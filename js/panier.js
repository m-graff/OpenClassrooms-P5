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
        <tr class="container-recapitulatif">
            <td class="recap-produit"> ${produitLocalStorage[i].name}</td>
            <td class="recap-objectif"> ${produitLocalStorage[i].objectif}</td>
            <td class="recap-quantite"> ${produitLocalStorage[i].quantite}</td>
            <td class="recap-prix">${produitLocalStorage[i].price/100}€</td> 
            <td><button class="btn-supprimer"><i class="fas fa-trash-alt"></i></button></td>
        </tr>   
        ` ;

    }  
        // Injection du code html dans le panier
        panierProduit.innerHTML = structurePanierProduit;
}


// --- TRY --- : Affichage du montant total du panier --- TRY --- //
// Déclaration de la variable du prix total
let prixTotalPanier = [];

// Récupération des données de prix dans le localStorage
for (let j = 0; j < produitLocalStorage.length; j++) {
    let prixProduitsPanier = produitLocalStorage[j].price/100;
    // Ajout des données de prix dans la variable du prix total du panier
    prixTotalPanier.push(prixProduitsPanier);
    console.log(prixTotalPanier);
}

// Calcul du prix global se trouvant dans la variable prixTotalPanier à l'aide de la méthode "reduce()"
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const sommePanier = prixTotalPanier.reduce(reducer, 0);
console.log(sommePanier);

// Affichage du résultat dans la page html
document.getElementById("panier-prix").innerHTML = sommePanier;



// --- TRY --- Bouton supprimer un article --- TRY ---  // 

// Bouton supprimer un article
const deleteItem = document.querySelectorAll(".btn-supprimer");
deleteItem.forEach((btn, i) => {
    btn.addEventListener('click', e => {
        deleteItemSelected(i);
    });
});
    // Suppression de l'article sélectionné dans le localStorage
    function deleteItemSelected(index) {
        produitLocalStorage.splice(index, 1);
        localStorage.setItem('panier', JSON.stringify(produitLocalStorage));
            // Alerte suppresion d'un produit et refresh de la page en cas de validation
            confirm("Etes-vous sur de vouloir supprimer ce produit du panier ?");
            document.location.reload();
        if (produitLocalStorage.length === 0) {
            localStorage.removeItem('panier');
        }
        structurePanierProduit(produitLocalStorage);
    }



/*let index = e.target.classList[1].slice();*/

/* function testAlert () {

    var result = confirm("Vous êtes sur le point de supprimer ce produit. Voulez-vous le supprimer du panier ?");

    if (result) {
        alert("Produit supprimé !")
    } else {
        alert("Continuer mes achats !")
    }
} */