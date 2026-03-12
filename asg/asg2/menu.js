document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
    const emptyMsg = document.getElementById('cart-empty-msg');
    let cartItems = {};
    document.addEventListener('click', function(event) {
        const target = event.target;
        if (!target.classList.contains('add_btn') && !target.classList.contains('remove_btn')) {
            return;
        }

        const tile = target.closest('.ice_cream_tile');
        if (!tile) return;

        const itemName = tile.querySelector('h3').textContent;
        
        const priceParagraph = Array.from(tile.querySelectorAll('p')).find(p => p.textContent.includes('$'));
        let itemPrice = 0;
        if (priceParagraph) {
            const priceMatch = priceParagraph.textContent.match(/\d+\.\d+/);
            itemPrice = priceMatch ? parseFloat(priceMatch[0]) : 0;
        }

        if (target.classList.contains('add_btn')) {
            addToCart(itemName, itemPrice);
        } else if (target.classList.contains('remove_btn')) {
            removeFromCart(itemName);
        }
    });

    function addToCart(name, price) {
        if (cartItems[name]) {
            cartItems[name].quantity += 1;
        } else {
            cartItems[name] = { price: price, quantity: 1 };
        }
        updateCartUI();
    }

    function removeFromCart(name) {
        if (!cartItems[name]) return;
        cartItems[name].quantity -= 1;
        if (cartItems[name].quantity <= 0) {
            delete cartItems[name];
        }
        updateCartUI();
    }

    function updateCartUI() {
        cartContainer.innerHTML = '';
        const itemNames = Object.keys(cartItems);

        if (itemNames.length === 0) {
            cartContainer.appendChild(emptyMsg);
            emptyMsg.style.display = 'block';
            return;
        }

        emptyMsg.style.display = 'none';
        itemNames.forEach(itemName => {
            const item = cartItems[itemName];
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span class="cart-item-name">${itemName}(${item.quantity})</span>
                <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartContainer.appendChild(itemElement);
        });
    }
});