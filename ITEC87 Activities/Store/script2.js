document.addEventListener("DOMContentLoaded", function() {
  const stockData = {'blackJeansStocks' : 10, 'rippedJeansStocks' : 10, 'skinnyJeansStocks' : 10, 'taperedJeansStocks' : 10, 'jerseyShirtStocks' : 10,
    'longSleeveShirtStocks' : 10, 'turtleNeckShirtStocks' : 10, 'vNeckShirtStocks' : 10, 'drakkarrNoirStocks' : 10, 'hugoBossStocks' : 10,
    'oldSpiceStocks' : 10, 'poisonPerfumeStocks' : 10, 'athleticTankTopsStocks' : 10, 'muscleTankTopsStocks' : 10, 'sheerTankTopsStocks' : 10,
    'whiteTankTopsStocks' : 10, 'miniBasketballSetStocks' : 10, 'nerfGunStocks' : 10, 'punchingBagSetStocks' : 10, 'remoteControlCarStocks' : 10
};

  //Initialize the stockData in localStorage
  for (const [key, value] of Object.entries(stockData)) {
      if (localStorage.getItem(key) === null) {
          localStorage.setItem(key, value);
      }
  }
  updateStockDisplay();
});

function updateStockDisplay() {
  const stockElements = document.querySelectorAll('.stock span');
  stockElements.forEach(stockElement => {
      const stockId = stockElement.id;
      const stockCount = localStorage.getItem(stockId);
      stockElement.textContent = stockCount;
  });
}

let cart = [];

function addToCart(name, price, stockId) {
  const stockElement = document.getElementById(stockId);
  let stockCount = parseInt(localStorage.getItem(stockId));

  if (stockCount <= 0) {
      alert("Sorry, this item is out of stock!");
      return;
  }

  stockCount--;
  localStorage.setItem(stockId, stockCount);
  stockElement.textContent = stockCount;

  const existingItemIndex = cart.findIndex(item => item.name === name);
  if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity++;
  } else {
      cart.push({ name, price, quantity: 1, stockId });
  }

  renderCart();
}

function removeFromCart(index) {
  const removedItem = cart.splice(index, 1)[0];
  const stockElement = document.getElementById(removedItem.stockId);
  let stockCount = parseInt(localStorage.getItem(removedItem.stockId)) + removedItem.quantity;
  localStorage.setItem(removedItem.stockId, stockCount);
  stockElement.textContent = stockCount;
  renderCart();
}

function adjustQuantity(index, operation) {
  const existingItem = cart[index];
  const stockElement = document.getElementById(existingItem.stockId);
  let stockCount = parseInt(localStorage.getItem(existingItem.stockId));

  if (operation === 'toAdd') {
      if (stockCount <= 0) {
          alert("Sorry, this item is out of stock!");
          return;
      }
      existingItem.quantity++;
      stockCount--;
  } else if (operation === 'toReduce') {
      if (existingItem.quantity > 1) {
          existingItem.quantity--;
          stockCount++;
      } else {
          removeFromCart(index);
          return;
      }
  }

  localStorage.setItem(existingItem.stockId, stockCount);
  stockElement.textContent = stockCount;
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cart');
  cartList.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
      const cartItem = document.createElement('li');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
          <span>${item.name}</span>
          <div>
              <button onclick="adjustQuantity(${index}, 'toReduce')">-</button>
              <span>${item.quantity}</span>
              <button onclick="adjustQuantity(${index}, 'toAdd')">+</button>
          </div>
          <span>₱${(item.price * item.quantity).toFixed(2)}</span>
          <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartList.appendChild(cartItem);

      total += item.price * item.quantity;
  });

  document.getElementById('total').textContent = "₱" + total.toFixed(2);
}

function checkout() {
  alert('Thank you for your purchase!');
  cart = [];
  renderCart();
}

function putDiscount() {
  const discountElements = document.getElementsByName('discount');
  let discountSelected = 0;

  for (const discountElement of discountElements) {
      if (discountElement.checked) {
          discountSelected = parseInt(discountElement.value);
          break;
      }
  }

  if (discountSelected === 0) {
    //Total remains when no discount is selected
    renderCart();
    return;
  }

  let total = 0;
  cart.forEach(item => {
      total += item.price * item.quantity;
  });

  const discountedTotal = total - (total * (discountSelected / 100));
  document.getElementById('total').textContent = "₱" + discountedTotal.toFixed(2);

  // Update the cart with the discounted total
  cartTotal = discountedTotal;
}

