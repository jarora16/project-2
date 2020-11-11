var cart = {
  // (A) PROPERTIES
  // (A1) HTML ELEMENTS
  hPdt: null, // HTML products list
  hItems: null, // HTML current cart
  cartCount: document.getElementById("cart-count"),

  // (A2) CART
  items: {}, // Current items in cart

  // (A3) AVAILABLE PRODUCTS
  // PRODUCT ID => DATA
  products: {
    123: {
      name: "So-Easy Sloppy Joes",
      desc:
        "Everybody in the family will love the zesty, fun flavor of this simple staple. Try it spooned over warmed cornbread if you don’t have buns.",
      img: "images/Group-Photo-p-500.jpeg",
      price: 2034,
    },
    124: {
      name: "Traditional Meat Loaf",
      desc:
        "Topped with a sweet sauce, this meat loaf tastes so good that you might want to double the recipe so everyone can have seconds.",
      img:
        "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-fried-rice-768x614.jpg",
      price: 1247,
    },
    125: {
      name: "Italian Spiral Meat Loaf",
      desc:
        "Take a classic comfort food to delicious new heights with this impressive recipe.Take a classic comfort food to delicious new heights with this impressive recipe.",
      img:
        "https://foodiesfeed.com/wp-content/uploads/2020/03/traditional-korean-food-in-a-restaurant.jpg",
      price: 675,
    },
    126: {
      name: "Saucy Pork Chop Skillet",
      desc:
        "Skillet pork chops make easy comfort food. We have them with a salad and fruit. If you've got fresh green beans or steamed broccoli, go for it.",
      img:
        "https://media.istockphoto.com/photos/plate-of-shrimp-fried-rice-on-a-placemat-and-wood-table-picture-id186826982?b=1&k=6&m=186826982&s=170667a&w=0&h=96FREY2n_gIZKRI8W33V2X2sOjFtDZA9brquKu7msb4=",
      price: 842,
    },
  },

  // (B) LOCALSTORAGE CART
  // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
  save: function () {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  },

  // (B2) LOAD CART FROM LOCALSTORAGE
  load: function () {
    cart.items = localStorage.getItem("cart");
    if (cart.items == null) {
      cart.items = {};
    } else {
      cart.items = JSON.parse(cart.items);
      cart.cartCount.textContent = Object.keys(cart.items).length;
    }
  },

  // (B3) NUKE CART!
  nuke: function () {
    if (confirm("Empty cart?")) {
      cart.items = {};
      localStorage.removeItem("cart");
      cart.list();
    }
  },

  // (C) INITIALIZE
  init: function () {
    // (C1) GET HTML ELEMENTS
    cart.hPdt = document.getElementById("cart-products");
    cart.hItems = document.getElementById("cart-items");

    // (C2) DRAW PRODUCTS LIST
    cart.hPdt.innerHTML = "";
    let p, item, subItem, part, cardBody, cardImg, cardFooter, cartCount;
    for (let id in cart.products) {
      // WRAPPER
      p = cart.products[id];
      item = document.createElement("div");
      item.classList.add("col-lg-3", "col-md-6", "mb-4");
      cart.hPdt.appendChild(item);
      //CARD
      subItem = document.createElement("div");
      subItem.classList.add("card", "h-100");
      item.appendChild(subItem);
      // PRODUCT IMAGE
      cardImg = document.createElement("img");
      cardImg.src = p.img;
      cardImg.classList.add("card-img-top");
      subItem.appendChild(cardImg);

      //   CARD BODY
      cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      subItem.appendChild(cardBody);

      // PRODUCT NAME
      part = document.createElement("h4");
      part.innerHTML = p.name;
      part.classList.add("card-title");
      cardBody.appendChild(part);

      // PRODUCT PRICE
      part = document.createElement("div");
      part.innerHTML = "$" + p.price;
      part.classList.add("p-price");
      subItem.appendChild(part);

      // PRODUCT DESCRIPTION
      part = document.createElement("p");
      part.innerHTML = p.desc;
      part.classList.add("card-text");
      cardBody.appendChild(part);

      // CARD FOOTER
      cardFooter = document.createElement("div");
      cardFooter.classList.add("card-footer");
      subItem.appendChild(cardFooter);

      // ADD TO CART
      part = document.createElement("input");
      part.type = "button";
      part.value = "Add to Cart";
      part.classList.add("btn", "btn-primary");
      part.onclick = cart.add;
      part.dataset.id = id;
      cardFooter.appendChild(part);
    }

    // (C3) LOAD CART FROM PREVIOUS SESSION
    cart.load();

    // (C4) LIST CURRENT CART ITEMS
    cart.list();
  },

  // (D) LIST CURRENT CART ITEMS (IN HTML)
  list: function () {
    //   (D0) INCREASE CART COUNT
    cart.cartCount.textContent = Object.keys(cart.items).length;
    cart.hItems = document.getElementById("cart-items");

    // (D1) RESET
    cart.hItems.innerHTML = "";
    let item, part, pdt;
    let empty = true;
    for (let key in cart.items) {
      if (cart.items.hasOwnProperty(key)) {
        empty = false;
        break;
      }
    }

    // (D2) CART IS EMPTY
    if (empty) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      cart.hItems.appendChild(item);
    }

    // (D3) CART IS NOT EMPTY - LIST ITEMS
    else {
      let p,
        total = 0,
        subtotal = 0;
      for (let id in cart.items) {
        // ITEM
        p = cart.products[id];
        item = document.createElement("div");
        item.classList.add("c-item");
        cart.hItems.appendChild(item);

        // NAME
        part = document.createElement("strong");
        part.innerHTML = p.name;
        part.classList.add("c-name");
        item.appendChild(part);

        // REMOVE
        part = document.createElement("input");
        part.type = "button";
        part.value = "X";
        part.dataset.id = id;
        part.classList.add("c-del");
        part.addEventListener("click", cart.remove);
        item.appendChild(part);

        // QUANTITY
        part = document.createElement("input");
        part.type = "number";
        part.value = cart.items[id];
        part.dataset.id = id;
        part.classList.add("c-qty");
        part.addEventListener("change", cart.change);
        item.appendChild(part);
        // SUBTOTAL
        subtotal = cart.items[id] * p.price;
        total += subtotal;
      }
      // EMPTY BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.addEventListener("click", cart.nuke);
      item.classList.add("btn", "btn-danger", "spacing");
      cart.hItems.appendChild(item);

      // CHECKOUT BUTTONS
      item = document.createElement("input");
      item.type = "button";
      item.value = "Checkout - " + "$" + total;
      item.addEventListener("click", cart.checkout);
      item.classList.add("btn", "btn-success", "spacing");
      cart.hItems.appendChild(item);
    }
  },

  // (E) ADD ITEM INTO CART
  add: function () {
    if (cart.items[this.dataset.id] == undefined) {
      cart.items[this.dataset.id] = 1;
    } else {
      cart.items[this.dataset.id]++;
      cartCount.textContent = Object.keys(cart.items).length;
    }
    cart.save();
    cart.list();
  },

  // (F) CHANGE QUANTITY
  change: function () {
    if (this.value == 0) {
      delete cart.items[this.dataset.id];
    } else {
      cart.items[this.dataset.id] = this.value;
    }
    cart.save();
    cart.list();
  },

  // (G) REMOVE ITEM FROM CART
  remove: function () {
    delete cart.items[this.dataset.id];
    cart.save();
    cart.list();
  },

  // (H) CHECKOUT
  checkout: function () {
    // SEND DATA TO SERVER
    // CHECKS
    // SEND AN EMAIL
    // RECORD TO DATABASE
    // PAYMENT
    // WHATEVER IS REQUIRED
    alert("TO DO");

    /*
      var data = new FormData();
      data.append('cart', JSON.stringify(cart.items));
      data.append('products', JSON.stringify(cart.products));
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "SERVER-SCRIPT");
      xhr.onload = function(){ ... };
      xhr.send(data);
      */
  },
};
if (window.location.pathname === "/index.html") {
  cart.init();
} else {
  cart.load();
  cart.list();
}
