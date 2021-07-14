// ------ Début implémentation JS index -----------

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
    cameras.forEach(camera => {
        // Mise en place de la structure HTML
        cartesProduits.innerHTML += 
        ` 
            <article class="produit-content ${camera._id}">
                <a href="produit.html?product=${camera._id}">
                    <img class="image-produit" src="${camera.imageUrl}" alt="photo de l'appareil">
                    <div class="titre-produit">
                        <h3 class="nom-produit">${camera.name}</h3>
                    </div>
                    <div class="prix-produit">
                        <p>${camera.price/100},00 €</p>
                        <p class="bouton-details">Voir le produit</p>
                    </div>
                </a>
            </article>
        `
    })
})
// Comportement dans le cas où la requête est rejetée
.catch(function (error) {
    console.log("Il y a eu un problème avec l'opération " + error);
    alert('Oups, la connexion a échouée !');
});

















// Exemple JSDOC
/**
 * @param {*} url 
 * @param {*} callback 
 */

