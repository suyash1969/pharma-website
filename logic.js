let searchform = document.querySelector(".searchform");
document.querySelector(".fa-search").onclick = () => {
  searchform.classList.toggle("activate");
  cart.classList.remove("activate");
  menu.classList.remove("activate");
};
let cart = document.querySelector(".shoping-card");
document.querySelector(".fa-shopping-cart").onclick = () => {
  cart.classList.toggle("activate");
  searchform.classList.remove("activate");
  menu.classList.remove("activate");
};
let menu = document.querySelector(".navbar");
document.querySelector(".fa-bars").onclick = () => {
  menu.classList.toggle("activate");
  searchform.classList.remove("activate");
  cart.classList.remove("activate");
};
window.onscroll = () => {
  searchform.classList.remove("activate");
  cart.classList.remove("activate");
  menu.classList.remove("activate");
};

var swiper = new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});
let cartIcon = document.querySelector("#cart-icon");
// let cart = document.querySelector('.shoping-card');
let closeCart = document.querySelector("#close-cart");

// cartIcon.onclick = () =>
// {
//   cart.classList.add("activate");
//   // searchform.classList.remove('activate');
//   // menu.classList.remove('activate');
// };
closeCart.onclick = () => {
  cart.classList.remove("activate");
};
//Cart Working how they work in this website..
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//Making funtion
function ready() {
  //Remove item from the cart
  var removeCartbuttons = document.getElementsByClassName("cart-remove");
  console.log(removeCartbuttons);
  for (var i = 0; i < removeCartbuttons.length; i++) {
    var button = removeCartbuttons[i];
    button.addEventListener("click", removeCartItem);
  }
  //Quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantitychanged);
  }
  //add to card
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  //Buy Button Work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}
//Buy button
function buyButtonClicked() {
  alert("Your order is placed");
  var cartContent = document.getElementsByClassName('cart-content')[0]
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}

//Remove item from the cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}
//Add to card

//Quantity changed
function quantitychanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}
// Add to card

function addCartClicked(event) {
  var button = event.target;
  var shopproducts = button.parentElement;
  var title =
    shopproducts.getElementsByClassName("product-titles")[0].innerText;
  var price = shopproducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopproducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItem = document.getElementsByClassName("cart-content")[0];
  var cartitemname = cartItem.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartitemname.length; i++) {
    if (cartitemname[i].innerText == title) {
      alert("you have already add this product");
      return;
    }
  }
  var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                          <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- remove the cart -->
                        <i class="fa fa-trash cart-remove" ></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItem.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantitychanged);
}

//Update total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cardBoxes = document.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cardBoxes.length; i++) {
    var cartbox = cardBoxes[i];
    var priceElemnt = cartbox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartbox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElemnt.innerText.replace("₹", ""));
    var quantity = quantityElement.value;

    total = total + price * quantity;
  }
    //if price content have some cent valuese
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "₹" + total;
}