let cart = [];

function addToCart(productName, price, image) {
    const existingItem = cart.find(function(item) { return item.name === productName; });
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({name: productName, price: price, image: image, quantity: 1});
    }
    updateCartCount();
    saveCart();
    console.log('Item added to cart:', {name: productName, price: price, image: image});
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce(function(total, item) { return total + item.quantity; }, 0);
    }
}

function openProductModal(productId) {
    const productDetails = getProductDetails(productId);
    const modalContent = document.getElementById('modalProductDetails');

    const modalHTML = `
        <div class="product-details">
            <div class="product-image">
                <img src="${productDetails.mainImage}" alt="${productDetails.name}">
            </div>
            <div class="product-info">
                <h2>${productDetails.name}</h2>
                <p>${productDetails.description}</p>
                <h3>Price: ${productDetails.price}</h3>
                <button class="add-to-cart-btn">ADD TO CART</button>
            </div>
        </div>
        <div class="product-gallery">
            ${productDetails.gallery.map(function(img) { return `<img src="${img}" alt="Product view">`; }).join('')}
        </div>
    `;

    modalContent.innerHTML = modalHTML;
    document.getElementById('productModal').style.display = "block";

    const addToCartBtn = modalContent.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        addToCart(productDetails.name, parseFloat(productDetails.price.replace('RS.', '')), productDetails.mainImage);
        document.getElementById('productModal').style.display = "none";
    });

    const galleryImages = modalContent.querySelectorAll('.product-gallery img');
    galleryImages.forEach(function(img) {
        img.addEventListener('click', function() {
            const mainImage = modalContent.querySelector('.product-image img');
            mainImage.src = this.src;
        });
    });
}

function getProductDetails(productId) {
    const products = {
        '1': {
            name: "Bamboo Toothbrushes",
            description: "Eco-friendly bamboo toothbrush. Biodegradable handle, soft bristles. Sustainable alternative to plastic. Promotes oral health and environmental consciousness.",
            price: "RS.1000",
            mainImage: "img/shop/Babmboo_Brushes/0.jpg",
            gallery: ["img/shop/Babmboo_Brushes/0.jpg", "img/shop/Babmboo_Brushes/3.png", "img/shop/Babmboo_Brushes/4.png", "img/shop/Babmboo_Brushes/5.png"]
        },
        '2': {
            name: "Bird House",
            description: "Charming wooden bird houses. Cozy shelter for local birds. Perfect for gardens and backyards. Enhances outdoor spaces while supporting wildlife.",
            price: "RS.2000",
            mainImage: "img/shop/Bird_House/bird3.jpg",
            gallery: ["img/shop/Bird_House/bird2.jpg", "img/shop/Bird_House/bird4.jpg", "img/shop/Bird_House/bird5.jpg", "img/shop/Bird_House/bird1.jpg"]
        },
        '3': {
            name: "Bonsai",
            description: "Miniature bonsai tree. Living art for your home or office. Low-maintenance beauty. Brings tranquility and nature indoors.",
            price: "RS.1500",
            mainImage: "img/shop/bonsai/13.png",
            gallery: ["img/shop/bonsai/12.png", "img/shop/bonsai/10.png", "img/shop/bonsai/9.png", "img/shop/bonsai/11.png"]
        },
        '4': {
            name: "Flowers",
            description: "Vibrant, fresh-cut flowers. Variety of colors and species. Perfect for gifts, decor, or self-indulgence. Brighten any space with natural beauty.",
            price: "RS.1000",
            mainImage: "img/shop/flowers2/16.png",
            gallery: ["img/shop/flowers2/17.png", "img/shop/flowers2/18.png", "img/shop/flowers2/20.png","img/shop/flowers2/21.png"]
        },'5': {
            name: "Indoor Plants",
            description: "A collection of large indoor plants to enhance your living space. We offer eco-friendly options that purify the air and add a touch of nature to your home.",
            price: "RS.5000",
            mainImage: "img/shop/Plants_big/3.png",
            gallery: ["img/shop/Plants_big/3.png", "img/shop/Plants_big/2.png", "img/shop/Plants_big/1.png", "img/shop/Plants_big/5.png"]
        },'6': {
            name: "Reusable Bags",
            description: "Durable and eco-friendly reusable bags. Perfect for shopping and everyday use. Made from sustainable materials, these bags help reduce plastic waste and promote a greener lifestyle",
            price: "RS.1000",
            mainImage: "img/shop/Reusable_Bags/7.png",
            gallery: ["img/shop/Reusable_Bags/7.png", "img/shop/Reusable_Bags/9.png", "img/shop/Reusable_Bags/11.png", "img/shop/Reusable_Bags/12.png"]
        },
        '7': {
            name: "Hoodies",
            description: "A collection for dreamers.soar to new heights.We were all meant for Greatness",
            price: "RS.1000",
            mainImage: "Img/shop/shirt/shirt1.png",
            gallery: ["Img/shop/shirt/shirt1.png", "Img/shop/shirt/shirt2.png", "Img/shop/shirt/shirt3.png", "Img/shop/shirt/shirt4.png"]
        },
        '8': {
            name: "Wooden crafts",
            description: "New Animal Carving Handcraft Wall Hanging Sculpture Wood Raccoon Bear Deer Hand Painted Decoration for Home Living Room Gift",
            price: "RS.1000",
            mainImage: "img/shop/wooden_arts(handcrafts)/11.png",
            gallery: ["img/shop/wooden_arts(handcrafts)/2.png", "img/shop/wooden_arts(handcrafts)/14.png", "img/shop/wooden_arts(handcrafts)/15.png", "img/shop/wooden_arts(handcrafts)/11.png"]
        },
        
    };
    return products[productId] || {};
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);
}

function loadCart() {
  
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        console.log('Cart loaded from localStorage:', cart);
    }
}

function displayCart() {
  
    const cartBody = document.getElementById('cart-body');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartBody) {
        console.log('Not on cart page, exiting displayCart');
        return;
    }

    let totalPrice = 0;
    cartBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartBody.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
    } else {
        cart.forEach(function(item, index) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><button onclick="removeFromCart(${index})"><i class="far fa-times-circle"></i></button></td>
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
                <td>${item.name}</td>
                <td>RS. ${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>RS. ${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartBody.appendChild(row);
            totalPrice += item.price * item.quantity;
        });
    }

    if (cartSubtotal) cartSubtotal.textContent = `RS. ${totalPrice.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `RS. ${totalPrice.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
    updateCartCount();
    console.log('Item removed from cart. New cart:', cart);
}

function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    saveCart();
    displayCart();
    updateCartCount();
    console.log('Quantity updated. New cart:', cart);
}

function loadCheckoutSummary() {
    const orderSummary = document.querySelector('.order-summary');
    if (orderSummary) {
        let summaryHTML = '<h3>Order Summary</h3>';
        let total = 0;

        cart.forEach(function(item) {
            summaryHTML += `
                <div class="summary-item">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>RS. ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
            total += item.price * item.quantity;
        });

        summaryHTML += `
            <div class="summary-total">
                <strong>Total:</strong>
                <strong>RS. ${total.toFixed(2)}</strong>
            </div>
        `;

        orderSummary.innerHTML = summaryHTML;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    
    loadCart();

    const productImages = document.querySelectorAll('.pro img');
    productImages.forEach(function(img, index) {
        img.addEventListener('click', function() {
            openProductModal(index + 1);
        });
    });

    const addToCartButtons = document.querySelectorAll('.cart');
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Stop the event from bubbling up
            const product = this.closest('.pro');
            const productName = product.querySelector('h5').textContent;
            const price = parseFloat(product.querySelector('h4').textContent.replace('RS.', ''));
            const image = product.querySelector('img').src;
            addToCart(productName, price, image);
        });
    });

    const proceedBtn = document.getElementById('proceed-btn');
    if (proceedBtn) {
        proceedBtn.addEventListener('click', function() {
            if(cart.length===0){
                alert("Your cart is empty.Please add items to the Cart")
            }else{
                saveCart();
            window.location.href = 'checkout.html';

            }
            
        });
    }

    const completeOrderBtn = document.getElementById('complete-order');
    if (completeOrderBtn) {
        completeOrderBtn.addEventListener('click', function() {
            const requiredFields = document.querySelectorAll('#checkout input[required], #checkout select[required]');
            let isValid = true;

            requiredFields.forEach(function(field) {
                if (!field.value) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (isValid) {
                alert('Order completed successfully!');
                cart = [];
                saveCart();
                window.location.href = 'index.html';
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    const forms = document.querySelectorAll('#checkout form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Changes saved successfully!');
        });
    });

    displayCart();
    console.log('Initial displayCart called');

    if (window.location.pathname.includes('checkout.html')) {
        loadCheckoutSummary();
    }

    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.getElementById('productModal').style.display = "none";
        });
    }
});