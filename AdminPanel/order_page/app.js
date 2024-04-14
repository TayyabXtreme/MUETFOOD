var view_order = document.getElementById("view_order")

async function getAllOrder(status) {

  view_order.innerHTML = ""

  await firebase.database().ref("allorders").get()
    .then((snap) => {

      var data = Object.values(snap.val())
      for (var i = 0; i < data.length; i++) {

        if (data[i]["status"] == status || status == "all") {

          console.log(data[i])
          data[i]["status"] == "pending" ?

            view_order.innerHTML += `
            <div class="col col-lg-4 fix" style="margin-bottom:15px;width:354px">
          <div class="card" style="background:none;border:1px solid gold;color:white">
            <div class="card-body">
              <h5 class="card-title" id='${data[i]["userId"]}'>${data[i]["userName"]}</h5>
              <h6 class="card-subtitle mb-2 ">Total Amount : ${data[i]["total_amount"]}</h6>
              <p class="card-text">Total No Of Dishes :  ${data[i]["dishes"].length} </p>
            
              <a href="#" class="btn btn-danger" id='${data[i]['orderKey']}' onclick='order_Status_Update(this)'>Reject</a>
              <a  class="btn btn-primary" id='${data[i]["orderKey"]}' onclick="viewOrder(this)">Views Order </a>
              <a href="#" class="btn btn-success"  id='${data[i]['orderKey']}' onclick='order_Status_Update(this)'>Accept</a>
              
            </div>
          </div>

        </div>
            `
            :

            view_order.innerHTML += `
            <div class="col col-lg-4 fix" style="margin-bottom:15px;width:354px">
          <div class="card" style="background:none;border:1px solid gold;color:white">
            <div class="card-body">
              <h5 class="card-title" id='${data[i]["userId"]}'>${data[i]["userName"]}</h5>
              <h6 class="card-subtitle mb-2 ">Total Amount : ${data[i]["total_amount"]}</h6>
              <p class="card-text">Total No Of Dishes :  ${data[i]["dishes"].length} </p>
            
              
              <a  class="btn btn-primary" id='${data[i]["orderKey"]}' onclick="viewOrder(this)">Views Order </a>
             
              
            </div>
          </div>

        </div>
            `


        }


      }
    })

}
getAllOrder("all")

async function order_Status_Update(e) {
  var userId = e.parentNode.childNodes[1].id
  var order_status = e.innerText.toLowerCase()
  var order_key = e.id
  var price = e.parentNode.childNodes[3].innerText.split(":")
  var newprice = price[1].replace(" ", "")

  await firebase.database().ref("allorders").child(order_key).update({
    "status": order_status
  })

  await firebase.database().ref("userorders").child(userId).child(order_key).update({
    "status": order_status
  })

  await firebase.database().ref("allorders").child(order_key)
    .get().then(async (snap) => {
      console.log(snap.val())
      if (order_status == "accept") {
        await firebase.database().ref("payments").child(order_key).update({
          "payment": newprice,
          "order ": snap.val()
        })
      }
    })
    .catch((e) => {
      console.log(e)
    })



 




  // }

  e.parentNode.parentNode.parentNode.remove()

  // e.remove()


}

function viewOrder(e) {
  console.log(e.id)
  localStorage.setItem("Current_order_detail", e.id)
  window.location.href = "../order_details_page/index.html"

}