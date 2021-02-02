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


// Création de la constante pour récupérer les données de l'API
const cartesProduits = document.getElementById("cartes-produits");
// Connection avec l'API
var url = "https://oc-p5-api.herokuapp.com/api/cameras";
// Fonction qui récupère les infos de l'API et renvoie une promesse JSON 
async function getCamera(url) {
    let result = await fetch(url)
    return result.json()
}

getCamera(url).then(cameras => {
    console.log(cameras)
    cameras.forEach(camera => {
        console.log(camera)
        // Mise en place de la structure HTML
        cartesProduits.innerHTML += 
        ` 
            <article class="produit-content ${camera._id}">
                <a href="/produit.html?product=${camera._id}">
                    <img class="image-produit" src="${camera.imageUrl}" alt="photo de l'appareil">
                    <div class="titre-produit">
                        <h3 class="nom-produit">${camera.name}</h3>
                        <p class="description-produit">${camera.description}</p>
                    </div>
                    <div class="prix-produit">
                        <p>${camera.price/100},00 €</p>
                    </div>
                    <button type="button" class="bouton-details">Voir le produit</button>
                </a>
            </article>
        `
    });
})














/*
// Récupère les données de l'API et les affiches
var listeProduitsElt = document.getElementById("liste-produits");
ajaxGet("https://oc-p5-api.herokuapp.com/api/cameras", function (response) {
    // Transforme la réponse en un tableau d'articles
    var listeProduits = JSON.parse(response);
    listeProduits.forEach(function (camera) {
        // Ajout du titre et du contenu de chaque article
        var nameElt = document.createElement("h2");
        nameElt.textContent = camera.name;
        var descriptionElt = document.createElement("p");
        descriptionElt.textContent = camera.description;
        var priceElt = document.createElement("p");
        priceElt.textContent = camera.price;
        var imageUrlElt = document.createElement("img");
        imageUrlElt.src = camera.imageUrl;
        var lensesElt = document.createElement("select")
        lensesElt.textContent = camera.lenses;

        listeProduitsElt.appendChild(nameElt);
        listeProduitsElt.appendChild(descriptionElt); 
        listeProduitsElt.appendChild(priceElt);
        listeProduitsElt.appendChild(imageUrlElt);
        listeProduitsElt.appendChild(lensesElt);

        imageUrlElt.style.width = "20%";
    });
});
*/







    

