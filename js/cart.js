const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showCart() {

cartItems.innerHTML = "";

let total = 0;

if (cart.length === 0) {

cartItems.textContent = "Your cart is empty.";
totalPrice.textContent = "Total: 0 $";

return;
}

cart.forEach(function(item, index) {

const product = document.createElement("div");

const image = document.createElement("img");

image.src = item.image;
image.alt = item.name;

image.style.width = "90px";
image.style.height = "70px";
image.style.objectFit = "cover";
image.style.borderRadius = "10px";

product.appendChild(image);

const name = document.createElement("h3");

name.textContent = item.name;

product.appendChild(name);

const price = document.createElement("p");

price.textContent =
"Price: " + item.price.toLocaleString() + " $";

product.appendChild(price);

const quantity = document.createElement("p");

quantity.textContent =
"Quantity: " + item.quantity;

product.appendChild(quantity);

const plus = document.createElement("button");

plus.textContent = "+";

plus.onclick = function() {
increaseProduct(index);
};

product.appendChild(plus);

const minus = document.createElement("button");

minus.textContent = "-";

minus.onclick = function() {
decreaseProduct(index);
};

product.appendChild(minus);

const remove = document.createElement("button");

remove.textContent = "Remove";

remove.onclick = function() {
removeProduct(index);
};

product.appendChild(remove);

cartItems.appendChild(product);

total = total + item.price * item.quantity;

});

totalPrice.textContent =
"Total: " + total.toLocaleString() + " $";
}


function increaseProduct(index) {

cart[index].quantity++;

saveCart();
}


function decreaseProduct(index) {

if (cart[index].quantity > 1) {

cart[index].quantity--;

} else {

cart.splice(index, 1);

}

saveCart();
}
function removeProduct(index) {

cart.splice(index, 1);

saveCart();
}


function saveCart() {

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

showCart();
}


showCart();


const checkoutBtn =
document.getElementById("checkout-btn");

if (checkoutBtn) {

checkoutBtn.addEventListener("click", function(event) {

event.preventDefault();

if (cart.length === 0) {

alert("Your cart is empty!");

return;
}

alert("Your order has been received.");

cart = [];

localStorage.removeItem("cart");

showCart();

});

}