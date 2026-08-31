// ===============================
// CART
// ===============================

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // هر محصول با عکس خودش یک محصول جدا حساب می‌شود
        const existingProduct = cart.find(function (item) {
            return item.name === name && item.image === image;
        });

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1,
                image: image
            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added to cart!");
    });

});


// ===============================
// SEARCH
// ===============================

const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener("input", function () {

        const text = searchInput.value.toLowerCase();
        const products = document.querySelectorAll(".product-card");

        products.forEach(function (product) {

            if (product.textContent.toLowerCase().includes(text)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });
    });
}


// ===============================
// ELEMENTS
// ===============================

const signinBtn = document.getElementById("signin-btn");
const signinSection = document.getElementById("signin-section");

const profileButton = document.getElementById("profile-button");
const profileBox = document.getElementById("profile-box");
const closeProfile = document.getElementById("close-profile");

const profileImage = document.getElementById("profile-image");
const profileBigImage = document.getElementById("profile-big-image");
const profileUpload = document.getElementById("profile-upload");

const addProductBtn = document.getElementById("add-product-btn");
const addProductForm = document.getElementById("add-product-form");
const closeProductForm = document.getElementById("close-product-form");

const logoutBtn = document.getElementById("logout-btn");


// ===============================
// SELLER BUTTON
// ===============================

function updateSellerButton() {

    if (!addProductBtn) return;

    if (localStorage.getItem("role") === "seller") {
        addProductBtn.style.display = "block";
    } else {
        addProductBtn.style.display = "none";
    }
}


// ===============================
// SIGN IN
// ===============================

if (signinBtn) {

    signinBtn.addEventListener("click", function () {

        const firstName =
            document.getElementById("first-name").value.trim();

        const lastName =
            document.getElementById("last-name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();
            if (!firstName  ||!lastName || !phone) {
            alert("Please fill in all fields.");
            return;
        }

        let role = "buyer";

        // Seller account
        if (
            firstName === "Amirreza" &&
            lastName === "Eslami" &&
            phone === "09111414370"
        ) {
            role = "seller";
        }

        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("phone", phone);
        localStorage.setItem("role", role);

        document.getElementById("profile-name").textContent =
            "Name: " + firstName;

        document.getElementById("profile-lastname").textContent =
            "Last Name: " + lastName;

        document.getElementById("profile-role").textContent =
            "Role: " + (role === "seller" ? "Seller" : "Buyer");

        signinSection.style.display = "none";

        updateSellerButton();

        alert("Signed in successfully!");
    });
}


// ===============================
// LOAD SAVED ACCOUNT
// ===============================

const savedFirstName = localStorage.getItem("firstName");
const savedLastName = localStorage.getItem("lastName");
const savedRole = localStorage.getItem("role");
const savedImage = localStorage.getItem("profileImage");

if (savedFirstName) {

    document.getElementById("profile-name").textContent =
        "Name: " + savedFirstName;

    document.getElementById("profile-lastname").textContent =
        "Last Name: " + savedLastName;

    document.getElementById("profile-role").textContent =
        "Role: " + (savedRole === "seller" ? "Seller" : "Buyer");

    signinSection.style.display = "none";
}

updateSellerButton();
// PROFILE IMAGE
// ===============================

if (savedImage) {

    profileImage.src = savedImage;
    profileBigImage.src = savedImage;
}

if (profileUpload) {

    profileUpload.addEventListener("change", function () {

        const file = profileUpload.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (event) {

            const imageData = event.target.result;

            profileImage.src = imageData;
            profileBigImage.src = imageData;

            localStorage.setItem("profileImage", imageData);
        };

        reader.readAsDataURL(file);
    });
}


// ===============================
// PROFILE
// ===============================

if (profileButton) {

    profileButton.addEventListener("click", function () {
        profileBox.style.display = "block";
    });
}

if (closeProfile) {

    closeProfile.addEventListener("click", function () {
        profileBox.style.display = "none";
    });
}


// ===============================
// ADD PRODUCT FORM
// ===============================

if (addProductBtn) {

    addProductBtn.addEventListener("click", function () {

        if (localStorage.getItem("role") !== "seller") {
            return;
        }

        addProductForm.style.display = "block";
    });
}

if (closeProductForm) {

    closeProductForm.addEventListener("click", function () {
        addProductForm.style.display = "none";
    });
}


// ===============================
// LOGOUT
// ===============================

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        if (!confirm("Are you sure you want to log out?")) {
            return;
        }

        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("phone");
        localStorage.removeItem("role");
        localStorage.removeItem("profileImage");

        document.getElementById("profile-name").textContent = "";
        document.getElementById("profile-lastname").textContent = "";
        document.getElementById("profile-role").textContent = "";

        const defaultImage =
            "imgs/image--rasanika.com (1).webp";

        profileImage.src = defaultImage;
        profileBigImage.src = defaultImage;

        profileBox.style.display = "none";
        signinSection.style.display = "block";

        if (addProductBtn) {
            addProductBtn.style.display = "none";
        }

        if (addProductForm) {
            addProductForm.style.display = "none";
        }
    });
}
// ===============================
// BIKE SLIDER
// ===============================

const sliderImages = document.querySelectorAll(".slider-image");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let currentSlide = 0;

function showSlide(index) {

    sliderImages.forEach(function (image) {
        image.classList.remove("active");
    });

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    sliderImages[index].classList.add("active");
    dots[index].classList.add("active");
}

if (nextBtn) {

    nextBtn.addEventListener("click", function () {

        currentSlide++;

        if (currentSlide >= sliderImages.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    });
}

if (prevBtn) {

    prevBtn.addEventListener("click", function () {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = sliderImages.length - 1;
        }

        showSlide(currentSlide);
    });
}

dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        currentSlide = index;
        showSlide(currentSlide);

    });

});
const contactButton =
    document.getElementById("contact-button");

const contactMenu =
    document.getElementById("contact-menu");
if (contactButton && contactMenu) {
    contactButton.addEventListener("click", function () {
        contactMenu.classList.toggle("show");

    });

}
