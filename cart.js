// cart.js - localStorage based cart
(function(){
  const STORAGE_KEY = 'sunnahCart';

  function loadCart() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  window.addToCart = function(product, price, qty) {
    qty = parseInt(qty) || 1;
    const cart = loadCart();
    const idx = cart.findIndex(i => i.product === product);
    if (idx > -1) {
      cart[idx].qty += qty;
    } else {
      cart.push({ product, price: Number(price), qty });
    }
    saveCart(cart);
    alert(product + " added to cart.");
  };

  window.updateCartPage = function() {
    const cart = loadCart();
    const table = document.getElementById('cart-table');
    if (!table) return;
    table.innerHTML = '<tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th></tr>';
    let total = 0;
    cart.forEach((item, index) => {
      const rowTotal = item.price * item.qty;
      total += rowTotal;
      const tr = document.createElement('tr');

      const tdProduct = document.createElement('td');
      tdProduct.textContent = item.product;
      tr.appendChild(tdProduct);

      const tdPrice = document.createElement('td');
      tdPrice.textContent = '৳' + item.price;
      tr.appendChild(tdPrice);

      const tdQty = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 1;
      input.value = item.qty;
      input.style.width = '60px';
      input.addEventListener('change', function(){
        const newQty = parseInt(this.value) || 1;
        cart[index].qty = newQty;
        saveCart(cart);
        updateCartPage();
      });
      tdQty.appendChild(input);
      tr.appendChild(tdQty);

      const tdTotal = document.createElement('td');
      tdTotal.textContent = '৳' + rowTotal;
      tr.appendChild(tdTotal);

      table.appendChild(tr);
    });

    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = 'Total: ৳' + total;
  };

  window.clearCart = function() {
    localStorage.removeItem(STORAGE_KEY);
    updateCartPage();
  };

  document.addEventListener('DOMContentLoaded', function(){
    updateCartPage();
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) clearBtn.addEventListener('click', clearCart);
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', function(){
      alert('Checkout not implemented in this frontend demo.');
    });
  });
})();
