var add_to_cart_div = document.getElementById("add_to_cart");
var order_btn = document.getElementById("order-now");

function getAllAddToCart() {
    var add_to_Cart = JSON.parse(localStorage.getItem("add_to_card")) || [];
    add_to_cart_div.innerHTML = "";

    if (add_to_Cart.length >= 1) {
        order_btn.style.display = "inline";
    } else {
        order_btn.style.display = "none";
    }

    add_to_Cart.forEach(function(item, index) {
        add_to_cart_div.innerHTML += `
            <div class="preview" data-target="p-1">
                <i class="fas fa-times" id="${index}" onClick="DeleteFromCart(this)"></i>
                <div style="margin-top:30px">
                <img src="${item["dish_image"]}" alt="" style="width:100%">
                </div>
                <h3>${item["dish_name"]}</h3>
                <div class="price">Rs .${item["dish_price"]}</div>
                <div class="price total">Total Cost  : Rs .${item["dish_price"] * item["quantity"]}</div>
                <div class="buttons">
                
                    <a class="buy inc" id="${index}" onClick="IncrementQuantity(this)">
                        <i class="fas fa-plus"></i>
                    </a>
                    
                    <a class="cart" ${item["quantity"] == 1 ? "disabled" : ""} id="${index}" onClick="decrementQuantity(this)">
                        <i class="fas fa-minus"></i>
                    </a>
                    <a style="color:white !important">${item["quantity"]}</a>
                  </div>
                </div>
            </div>`;
    });
}

getAllAddToCart();

function decrementQuantity(e) {
    var add_to_Cart = JSON.parse(localStorage.getItem("add_to_card")) || [];
    var index = e.id;
    var item = add_to_Cart[index];
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("add_to_card", JSON.stringify(add_to_Cart));
        getAllAddToCart();
    }
}

function IncrementQuantity(e) {
    var add_to_Cart = JSON.parse(localStorage.getItem("add_to_card")) || [];
    var index = e.id;
    var item = add_to_Cart[index];
    if (item) {
        item.quantity++;
        localStorage.setItem("add_to_card", JSON.stringify(add_to_Cart));
        getAllAddToCart();
    }
}

function DeleteFromCart(e) {
    var add_to_Cart = JSON.parse(localStorage.getItem("add_to_card")) || [];
    var index = e.id;
    add_to_Cart.splice(index, 1);
    localStorage.setItem("add_to_card", JSON.stringify(add_to_Cart));
    getAllAddToCart();
}
