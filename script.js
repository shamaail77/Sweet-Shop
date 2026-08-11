/* =================================
   PRODUCT DATA
================================= */

const products = [
    {
        id: 1,
        name: "Coconut Toffee",
        image: "images/coconut-toffee.jpg"
    },

    {
        id: 2,
        name: "Barfi",
        image: "images/barfi.jpg"
    },

    {
        id: 3,
        name: "Muskat",
        image: "images/muskat.jpg"
    },

    {
        id: 4,
        name: "Dhodhul",
        image: "images/dhodhul.jpg"
    },

    {
        id: 5,
        name: "Laddu",
        image: "images/laddu.jpg"
    },

    {
        id: 6,
        name: "Cutlet",
        image: "images/cutlet.jpg"
    },

    {
        id: 7,
        name: "Rolls",
        image: "images/rolls.jpg"
    },

    {
        id: 8,
        name: "Patties",
        image: "images/patties.jpg"
    }
];


/* =================================
   PRICE
================================= */

const PRICE_PER_100G = 50;


/* =================================
   CART
================================= */

let cart = [];


/* =================================
   DISPLAY PRODUCTS
================================= */

function displayProducts() {

    const container =
        document.getElementById("products-container");

    container.innerHTML = "";


    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-price">
                    Rs. 50 / 100g
                </p>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


/* =================================
   ADD TO CART
================================= */

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);


    const existingItem =
        cart.find(item => item.id === productId);


    if (existingItem) {

        // Add another 100g
        existingItem.weight += 100;

    } else {

        // Add new product
        cart.push({

            id: product.id,

            name: product.name,

            weight: 100
        });
    }


    updateCart();

    openCart();
}


/* =================================
   CHANGE WEIGHT
================================= */

function increaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);

    if (item) {

        item.weight += 100;

    }

    updateCart();
}


function decreaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;


    item.weight -= 100;


    if (item.weight <= 0) {

        cart =
            cart.filter(item =>
                item.id !== productId
            );
    }


    updateCart();
}


/* =================================
   CALCULATE PRICE
================================= */

function calculateItemPrice(weight) {

    return (weight / 100) * PRICE_PER_100G;
}


function calculateTotal() {

    let total = 0;


    cart.forEach(item => {

        total +=
            calculateItemPrice(item.weight);

    });


    return total;
}


/* =================================
   UPDATE CART
================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";


    let totalItems = 0;


    cart.forEach(item => {

        totalItems += item.weight / 100;


        const itemElement =
            document.createElement("div");


        itemElement.className = "cart-item";


        itemElement.innerHTML = `

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    Rs. ${calculateItemPrice(item.weight)}
                </p>

            </div>


            <div class="quantity">

                <button
                    onclick="decreaseQuantity(${item.id})"
                >
                    −
                </button>

                <span>
                    ${item.weight}g
                </span>

                <button
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>

            </div>
        `;


        cartItems.appendChild(itemElement);

    });


    cartCount.textContent = totalItems;


    cartTotal.textContent =
        `Rs. ${calculateTotal()}`;
}


/* =================================
   OPEN CART
================================= */

function openCart() {

    document
        .getElementById("cart-overlay")
        .classList
        .add("active");

}


/* =================================
   CLOSE CART
================================= */

function closeCart() {

    document
        .getElementById("cart-overlay")
        .classList
        .remove("active");

}


/* =================================
   PLACE ORDER
================================= */

function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    const name =
        document
        .getElementById("customer-name")
        .value
        .trim();


    const phone =
        document
        .getElementById("customer-phone")
        .value
        .trim();


    const address =
        document
        .getElementById("customer-address")
        .value
        .trim();


    if (!name || !phone || !address) {

        alert(
            "Please enter your name, phone number and address."
        );

        return;
    }


    /* =========================
       CREATE ORDER MESSAGE
    ========================= */

    let message =
        "🍬 *NEW SWEET ORDER*%0A%0A";


    message +=
        `👤 Name: ${name}%0A`;

    message +=
        `📞 Phone: ${phone}%0A`;

    message +=
        `📍 Address: ${address}%0A%0A`;


    message +=
        "🛒 *ORDER DETAILS*%0A";


    cart.forEach(item => {

        const price =
            calculateItemPrice(item.weight);


        message +=
            `• ${item.name} - ${item.weight}g - Rs.${price}%0A`;

    });


    message +=
        `%0A💰 *TOTAL: Rs.${calculateTotal()}*`;


    /*
       CHANGE THIS NUMBER
       TO YOUR BUSINESS WHATSAPP NUMBER.

       Sri Lankan example:
       947XXXXXXXX
    */

    const whatsappNumber =
        "94775454213";


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );
}


/* =================================
   START WEBSITE
================================= */

displayProducts();

updateCart();


if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("service-worker.js")

                .then(() => {

                    console.log(
                        "Service Worker registered"
                    );

                })

                .catch(error => {

                    console.log(
                        "Service Worker error:",
                        error
                    );

                });

        }
    );
}