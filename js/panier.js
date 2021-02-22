// Récupération des données du localStorage 

// Déclaration de la variable localStorage
let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(produitLocalStorage);