const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  // const url = `/js/products.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // used correct object name image instead images
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h4><strong> ${product.rating.rate} <i class="fas fa-star rating"></i></strong> <strong> ${product.rating.count} <i class="fas fa-user-plus rating-by-person"></i></strong> </h4>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
      <button onclick="singleItem(${product.id})" id="details-btn" class="btn btn-primary">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  // call the updateTotal funcion for showing total in My-Cart
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  //  round at most 2 decimal places
  document.getElementById(id).innerText = Math.round(total * 100) / 100;
};

// set innerText function
const setInnerText = (id, value) => {
  //  round at most 2 decimal places
  document.getElementById(id).innerText = Math.round(value * 100) / 100;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};

const singleItem = (productId) => {
  document.getElementById("singel-item").textContent = '';
  const url = `https://fakestoreapi.com/products/${productId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => singleItemDetails(data));
}

const singleItemDetails = items => {
  const div = document.createElement('div');
  div.innerHTML = `
            <div class="card mb-3 mx-auto" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${items.image}" class="img-fluid rounded-start -4" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h3 class="card-title">${items.title}</h3>
                    <p class="card-text">Category: ${items.category}</p>
                    <h5 class="card-title">Price: $ ${items.price}</h5>
                    <p class="card-text"><small class="text-muted">${items.rating.rate}<i class="fas fa-star rating"></i>    ${items.rating.count} <i class="fas fa-user-plus rating-by-person"></i></small></p>
                  </div>
                </div>
              </div>
             </div>
         `;
  document.getElementById("singel-item").appendChild(div);
}