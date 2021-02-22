// ------ Début implémentation JS produit -----------

// Création de la constante pour récupérer les données de l'API
const produit = document.getElementById("produit");
// Fonction qui récupère les infos de l'API et renvoie une promesse JSON 
async function getCamera(url) {
    let result = await fetch(url)
    return result.json()
}

// Récupération de l'id du produit 
const queryString = window.location.search;
const cameraId = new URLSearchParams(queryString).get("product");
console.log(cameraId);
// Appel sur l'API pour récupérer le détail du produit
const url = "https://oc-p5-api.herokuapp.com/api/cameras/" + cameraId;

// Fonction affichage des différentes options de lentilles
function getLensesOptions(camera) {
    lenses = camera.lenses;
    lensesOptions = "";
    for (let i = 0; i < lenses.length; i++) {
        lensesOptions += '<option id="lenses-options" value="' + lenses[i] + '">' + lenses[i] + '</option>'
    };
    return lensesOptions;
};

// Récupération des produits 
getCamera(url).then(camera => {
    console.log(camera)
    // Mise en place de la structure HTML
    produit.innerHTML +=
    `
        <article class="produit-container ${camera._id}">
            <img class="produit-image" src="${camera.imageUrl}" alt="Appareil photo vintage">
        
            <h1 class="produit-titre">${camera.name}</h1>
            <p class="produit-description">${camera.description}</p>
            <p class="produit-prix">${camera.price/100},00 €</p>

            <form id="produit-form">
                <fieldset>
                    <label for="objectif">Objectif</label>
                    <select name="objectif" id="objectif" required>
                        <option value="">-- Sélectionnez une lentille --</option>
                        ${getLensesOptions(camera)}
                        </option>
                    </select>
                </fieldset>
                <fieldset>
                    <label for="quantite">Quantité</label>
                    <input type="number" name="quantite" id="quantite" min="1" required>
                </fieldset>
                <div id="produit-form-boutton">
                    <button class="produit-bouton" type="submit" aria-label="Ajouter au panier" id=${camera._id}>Ajouter au panier</button>
                    <a class="produit-bouton-retour" href="index.html">Retour à l'accueil</a>
                </div>
            </form>
        </article>
    `
    // Try ajout d'un évènement de type submit directement sur le form - localStorage
        document.getElementById("produit-form").addEventListener("submit", function (e) {
        e.preventDefault();

        // Déclaration de la variable localStorage
        let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));
        // JSON.parse
        console.log(produitLocalStorage);
        // S'il y a déjà des produits stockés dans le localStorage 
        if (produitLocalStorage) {
            produitLocalStorage.push(camera);
            localStorage.setItem("panier", JSON.stringify(produitLocalStorage));
            console.log(produitLocalStorage);
        } else { // Si le localStorage est vide 
            produitLocalStorage = [];
            produitLocalStorage.push(camera);
            localStorage.setItem("panier", JSON.stringify(produitLocalStorage));
            console.log(produitLocalStorage);
        }

        localStorage.setItem("product", camera);
        alert("Produit sélectionné !");
    });
});



















