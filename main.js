let cart = [];
let products = [];

const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartTotal2 = document.getElementById('cart-total2');
const orderedItems = document.getElementById('ordered-items')
const emptyCart = document.getElementById('empty-cart')
const cartSummary = document.getElementById('cart-summary')

const fetchingData = async () => {
    try {
      let response = await fetch('./data.json');
      let data = await response.json();
      products = data
      const dataContainer = document.getElementById('data-container')
 
      products.forEach(item => {
        const div = document.createElement('div');
        div.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4'; // Adds margin-bottom for spacing
        
        // Create a card to wrap content
        const card = document.createElement('div');
        card.className = 'card h-100';

        // Create and append the image element
        const img = document.createElement('img');
        img.src = item.image.desktop;
        img.alt = item.name;
        img.className = 'card-img-top';
        card.appendChild(img);

        // Create the card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex flex-column justify-content-center mt-n4';

         // Create a button for adding to cart
         const addingCart = document.createElement('button');
         // Add classes for styling
        addingCart.className = 'btn add-cart-btn rounded-pill mb-4';

        const icon = document.createElement('img');
            icon.src = './assets/images/icon-add-to-cart.svg'; // Replace with the path to your icon image
            icon.alt = 'Cart Icon';
            icon.style.width = '16px'; // Adjust the size as needed
            icon.style.height = '16px'; // Adjust the size as needed
            icon.style.marginRight = '8px';
        addingCart.appendChild(icon);

        addingCart.appendChild(document.createTextNode(' '));
        addingCart.appendChild(document.createTextNode('Add to Cart'));
        

        // Add onclick event
        addingCart.onclick = function(){
            addToCart(item.name.split(' ').join(''))
        }
        // Append the 'Add to Cart' button to the card body
        cardBody.appendChild(addingCart);

        // Create and append the category element
        const category = document.createElement('p');
        category.textContent = item.category;
        category.className = 'card-text my-0';
        cardBody.appendChild(category);

        // Create and append the name element
        const name = document.createElement('h5');
        name.textContent = item.name;
        name.className = 'card-title';
        cardBody.appendChild(name);

        // Create and append the price element
        const price = document.createElement('h6');
        price.textContent = `$${item.price.toFixed(2)}`;
        price.className = 'card-text text-danger ';
        cardBody.appendChild(price);

      

        // Append card body to the card
        card.appendChild(cardBody);

        // Append card to the column div
        div.appendChild(card);

        // Append the column div to the data container
        dataContainer.appendChild(div);
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function addToCart(productName) {
    const product = products.find(p => p.name.split(' ').join('') === productName);
    cart.push(product);
    renderCart();
}

function renderCart(){
    
    
    if (cart.length === 0) {
        
        emptyCart.style.display = 'block'; // Show empty cart image
        cartItems.style.display = 'none'; // Hide cart items list
        cartSummary.style.display = 'none';
        cartCount.textContent = 0;

    }else{
        
        console.log('cart items', cart.length)
        emptyCart.style.display = 'none'; // Hide empty cart image
        cartItems.style.display = 'block';
        cartSummary.style.display = 'block';
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <img src="./assets/images/icon-remove-item.svg" alt="delete" onclick="deleteHandler(${index})" style="cursor: pointer"></img>
            `;
            cartItems.appendChild(cartItem);
            total += item.price
        })
        cartCount.textContent = cart.length;
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function deleteHandler(index) {
    cart.splice(index, 1);
    renderCart();
}
function confirmOrder() {
    orderedItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        cartItem.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price.toFixed(2)}</span>
        `;
        orderedItems.appendChild(cartItem);
        total += item.price
    })
    cartCount.textContent = cart.length;
    cartTotal2.textContent = `$${total.toFixed(2)}`;
}
  fetchingData();