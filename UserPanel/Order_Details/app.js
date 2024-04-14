console.log("order details")
var orderkey = localStorage.getItem("current_order")
var order_details = document.getElementById("order_details")
var username = document.getElementById("name")
var price = document.getElementById("price")
var statusoRDER = document.getElementById("status")
var loder =document.getElementById("loader")
var userId = localStorage.getItem("userId")
function GetCurrentOrder(){

    firebase.database().ref("userorders").child(userId).child(orderkey)
    .get()
    .then((snap)=>{
        console.log(snap.val())
        username.innerText = "" + snap.val()["userName"]
        price.innerText = "Total price : " + snap.val()["total_amount"]
        statusoRDER.innerText = "Status " + snap.val()["status"]
      
        for(var data of snap.val()["dishes"])
        {
            order_details.innerHTML+=`
            
            <div class="col col-lg-4" style="width:334px;margin-bottom:15px" >
            <div class="card text-center" style="background:none !important;border:1px solid gold;color:white" >
            <img src=${data["dish_image"]} style="border-bottom:1px solid white">
            <div class="card-body">
            <h5 class="card-title">Category  <span style="color:gold">${data["category_name"]} </span></h5>
              <h5 class="card-title">Dish <span style="color:gold">${data["dish_name"]} </span></h5>
              <p class="card-text"> Price : <span style="color:gold">${data["dish_price"]}</span></p>
              <p class="card-text">Qunatity  <span style="color:gold">: ${data["quantity"]}</span></p>
    
              </div>
            </div>
          </div>
            
            `
        }
        loder.style.display="none"
        
    })
    .catch((e)=>{
        console.log(e)
    })
}
GetCurrentOrder()