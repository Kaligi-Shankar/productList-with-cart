let cart = [];
let products = [];

const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

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
        addingCart.textContent = 'Add to Cart';
        // Add classes for styling
        addingCart.className = 'btn btn-primary rounded-pill mb-4';
        // Add onclick event
        addingCart.onclick = function(){
            addToCart(item.namem)
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

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    renderCart();
}

function renderCart(){
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        cartItem.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price.toFixed(2)}</span>`;
        cartItems.appendChild(cartItem);
        total += item.price
    })
    cartCount.textContent = cart.length;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

  fetchingData();