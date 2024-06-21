// Function to calculate amount to pay based on selected items
function calculateAmountToPay() {
  let totalAmount = 0;
  const checkboxes = document.getElementsByClassName('itemSelector');
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      const itemPrice = parseFloat(checkboxes[i].getAttribute('data-price'));
      const quantity = parseInt(document.getElementById(checkboxes[i].id + "Quantity").value); // Get quantity from corresponding id
      totalAmount += itemPrice * quantity;
    }
  }
  return totalAmount.toFixed(2);
}

// Function to obtain items selected
function obtainItemsSelected() {
const checkboxes = document.getElementsByClassName('itemSelector');
let selectedItems = [];
for (let i = 0; i < checkboxes.length; i++) {
  if (checkboxes[i].checked) {
    let totalAmount = 0;
    const itemName = checkboxes[i].getAttribute('data-name');
    const itemPrice = parseFloat(checkboxes[i].getAttribute('data-price'));
    const quantity = parseInt(document.getElementById(checkboxes[i].id + "Quantity").value); // Get quantity from corresponding id
    totalAmount += itemPrice * quantity;
    // Format the item information (name,price and quantity)
    const formattedItem = `<b>${itemName}</b> (₱${itemPrice.toFixed(2)} <b>x</b> ${quantity}) = <b>₱${totalAmount.toFixed(2)}`;
    
    selectedItems.push(formattedItem);
  }
}
return selectedItems;
}

// Update total price and selected items when checkboxes are clicked
const checkboxes = document.getElementsByClassName('itemSelector');
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('click', function () {
    document.getElementById('itemsSelected').innerHTML = `<h2> <span style="color:black;"> Selected Items: </span><span style="font-size:14px;"><br> ${obtainItemsSelected().join(' <br> ')}</span></h2>`;
    document.getElementById('amountPayable').innerHTML = `<h2>Total Price:<span style="color:black;">₱${calculateAmountToPay()}</span></h2>`;
  });
}