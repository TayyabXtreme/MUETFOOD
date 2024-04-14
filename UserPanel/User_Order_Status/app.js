var userId = localStorage.getItem("userId")
var order_Data = document.getElementById("order_Data")

async function getAllorders() {
    await firebase.database().ref("userorders").child(userId)
        .get()
        .then((snap) => {
            console.log(snap.val())
            var data = Object.values(snap.val())
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i])
                data[i]["status"] == "pending" ?
                    order_Data.innerHTML += `
            
            <div class="col col-lg-4"  style="margin-top:20px;">
            <div class="card"  style="background: none !important;border:1px solid gold !important">
                <div class="card-body" style="background: none !important">
                  <h5 class="card-title" style="color:white">Order No ${i + 1}</h5>
                  <p class="card-text" style="color:white">Total Amount : ${data[i]["total_amount"]}</p>
                  <p class="card-text" style="color:white">Status : ${data[i]["status"]}</p>

                  <a href="#" class="btn btn-primary" id='${data[i]["orderKey"]}' onclick='ViewDetails(this)'>View Order Details</a>
                  <a href="#" class="btn btn-danger" id='${data[i]["orderKey"]}' onclick='cancelOrder(this)'>Cancel order</a>

                </div>
              </div>
        </div>
        
        
            `
                    :
                    order_Data.innerHTML += `
            
            <div class="col col-lg-4"  style="margin-top:20px">
            <div class="card" style="background: none !important;border:1px solid gold !important;color:white">
                <div class="card-body">
                  <h5 class="card-title">Order No ${i + 1}</h5>
                  <p class="card-text">Total Amount : ${data[i]["total_amount"]}</p>
                  <p class="card-text">Status : ${data[i]["status"]}</p>

                  <a href="#" class="btn btn-primary" id='${data[i]["orderKey"]}' onclick='ViewDetails(this)'>View Order Details</a>
                </div>
              </div>
        </div>
            `


            }
        })
        .catch((e) => {
            console.log(e)
            
        })

}

getAllorders()


async function cancelOrder(e){
    console.log(e)
    console.log(e.parentNode.parentNode.parentNode.remove())
    let userId = localStorage.getItem("userId")
    console.log(userId)

    await firebase.database().ref("userorders").child(userId)
    .child(e.id).remove()

    await firebase.database().ref("allorders").child(e.id).remove()




}
function ViewDetails(e) {
    console.log(e)
    localStorage.setItem("current_order", e.id)
    window.location.href = "../Order_Details/index.html"

}