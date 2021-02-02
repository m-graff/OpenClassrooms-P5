// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}



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
const url = "https://oc-p5-api.herokuapp.com/api/cameras/" + cameraId;


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

            <form class="produit-fiche">
                <fieldste>
                    <label for="objectif">Objectif</label>
                    <select name="objectif" id="objectif">
                        <option value="0">${camera.lenses}</option>
                        <option value="1">${camera.lenses}
                        </option>
                    </select>
                </fieldset>
                <fieldset>
                    <label for="quantite>Quantité, AJOUT VARIABLE ?</label>
                    <input type="number" name="quantite" id="quantite" min"1">
                </fieldset>
                <div class="produit-fiche-boutton">
                    <button class="produit-bouton" type="submit" aria-label="Ajouter au panier">Ajouter au panier</button>
                    <a class="produit-bouton-retour" href="index.html">Retour à l'accueil</a>
                </div>
            </form>
        </article>
    `
});




















