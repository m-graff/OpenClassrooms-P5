
// Cibler les éléments du DOM
let confirmedName = document.getElementById("confirmation-nom");
let confirmedPrice = document.getElementById("confirmation-prix");
let confirmedRef = document.getElementById("confirmation-id");

// Récupération de l'affichage du nom, du prix, et de la référence du client
document.addEventListener("DOMContentLoaded", () => {
    getTotalPrice();

    // Récupération du nom du client dans le localStorage
    confirmedName.textContent = localStorage.getItem("orderName");

    // Récupération du prix dans le localStorage
    confirmedPrice.textContent = localStorage.getItem("orderPrice");

    // Récupération de la référence dans le localStorage
    confirmedRef.textContent = localStorage.getItem("orderId");
})


// Fonction qui récupère le prix total dans l'url
function getTotalPrice() {
    let url = new URL(window.location.href);
    let price = url.searchParams.get("price");
    confirmedPrice.textContent = "Prix tooootal :" + price;
}
