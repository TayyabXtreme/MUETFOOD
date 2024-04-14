var add_to_Cart = JSON.parse(localStorage.getItem("add_to_card"))
var userId = localStorage.getItem("userId")
var order_data = document.getElementById("order_data")
var final_price = document.getElementById("final_price")
var userName = localStorage.getItem("username")
var total_price = 0

function getAllAddToCart(){
    for(var index in add_to_Cart){
        total_price += Number(add_to_Cart[index]["quantity"]*add_to_Cart[index]["dish_price"])
        order_data.innerHTML += `
        <tr>
        <th scope="row">${Number(Number(index)+1)}</th>
        <td>${add_to_Cart[index]["dish_name"]}</td>
        <td>${add_to_Cart[index]["quantity"]}</td>
        <td>${add_to_Cart[index]["dish_price"]}</td>
        <td>${add_to_Cart[index]["quantity"]*add_to_Cart[index]["dish_price"]}</td>
      
      </tr>
        `
    }
    final_price.innerText = total_price   

}
getAllAddToCart()

async function SetDataForOrder(){

  var orderKey = firebase.database().ref("userorders").push().key

  var orderobject = {
    dishes : add_to_Cart,
    total_amount : final_price.innerText,
    status : "pending",
    userId : userId ,
    orderKey:orderKey,
    userName:userName

  }
  console.log("test")
 //users
  await firebase.database().ref(`userorders/${userId}/${orderKey}`).set(orderobject)
 
 //admin
  await firebase.database().ref(`allorders/${orderKey}`).set(orderobject)

  window.location.reload()
localStorage.setItem("add_to_card",[])
 



}
