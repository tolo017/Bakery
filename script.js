// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const checkoutBtn = document.querySelector('.checkout-btn');
const hireBtn = document.querySelector('.hire-me');
const hireModal = document.querySelector('.hire-modal');
const closeHire = document.querySelector('.close-hire');
const exploreBtn = document.getElementById('explore-btn');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Cart Logic
let cart = [];
let total = 0;

// Toggle Cart
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Add to Cart
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const item = e.target.closest('.item');
        const id = item.getAttribute('data-id');
        const name = item.querySelector('h3').textContent;
        const price = parseFloat(item.querySelector('p').textContent.replace('$', ''));
        const img = item.querySelector('img').src;

        const existingItem = cart.find(product => product.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                img,
                quantity: 1
            });
        }

        updateCart();
        animateCartIcon();
    });
});

// Update Cart
function updateCart() {
    cartItems.innerHTML = '';
    total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <i class="fas fa-times remove-item"></i>
        `;

        const removeBtn = cartItem.querySelector('.remove-item');
        removeBtn.addEventListener('click', () => {
            cart = cart.filter(product => product.id !== item.id);
            updateCart();
        });

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    document.querySelector('.cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Animate Cart Icon
function animateCartIcon() {
    cartIcon.classList.add('animate');
    setTimeout(() => {
        cartIcon.classList.remove('animate');
    }, 500);
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Order placed! Total: $${total.toFixed(2)}`);
        cart = [];
        updateCart();
        cartModal.classList.remove('active');
    }
});

// Hire Me Modal
hireBtn.addEventListener('click', () => {
    hireModal.classList.add('active');
});

closeHire.addEventListener('click', () => {
    hireModal.classList.remove('active');
});

// Explore Button
exploreBtn.addEventListener('click', () => {
    document.querySelector('#menu').scrollIntoView({
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#contact') return;
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Image Slider
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Auto Slide
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Initialize
showSlide(0);