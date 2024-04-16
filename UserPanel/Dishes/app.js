var dish_key = localStorage.getItem("current_Cat")
var dish_card = document.getElementById("dish_card")
var add_to_Card_List = localStorage.getItem("add_to_card")
var userId = localStorage.getItem("userId")
var maindata = []
var aboutCat=document.getElementById("aboutcat");
if (userId == null) {
    window.location.href = "../../Auth/SignIn/index.html"
}

else if (dish_key == null) {
    // alert("you delete key from local Storage ")
    window.location.href = "../Home/index.html"

}
else {
    getDishes()
}
async function getDishes() {
    dish_card.innerHTML = ""
    await firebase.database().ref("dishes").child(dish_key).get()
        .then((snap) => {
            // console.log(snap.val())
            var data = Object.values(snap.val())
           
            maindata = data;
            aboutCat.innerText="Delicious "+data[0]["category_name"]+" dish";
            for (var index in data) {
               
                dish_card.innerHTML += `
                <li>
              <div class="menu-card hover:card">

                <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
                  <img src=${data[index]["dish_image"]} width="100px" height="10px" loading="lazy" alt="Greek Salad"
                    class="img-cover" style="width:100px !important;">
                </figure>

                <div>

                  <div class="title-wrapper">
                    <h3 class="title-3">
                      <a href="#" class="card-title">${data[index]["dish_name"]}</a>
                    </h3>

                    

                    <span class="span title-2">Rs${data[index]["dish_price"]}</span>
                  </div>

                  <p class="card-text label-1">
                  Discover deliciousness reimagined with our signature MUET FOOD Special: 
                  a mouthwatering ${data[index]["dish_name"]} experience that's sure to wow your senses!
                  </p>

                </div>

              </div>
              <a href="#" class="btn btn-primary" id=${index} onclick=AddToCard(this)>
                <span class="text text-1">Add to Cart</span>
    
                <span class="text text-2" aria-hidden="true">Add to Cart</span>
              </a>
            </li>




           
            
            `

            }
        })
        .catch((e) => {
            console.log(e)
        })
}

// arr-=[]
// arr[0]
// arr[2]
// var data = {
//     name:"jcjbcb"
// }

//local storage =>string
//array 

function AddToCard(e) {
    var checkData = localStorage.getItem("add_to_card")
   

    var data = checkData == "" ? [] :  JSON.parse(localStorage.getItem("add_to_card")) ?? []

    var i = 0;
    var check = false
    while (i < data.length) {
       
        if (maindata[e.id]["dish_key"] == data[i]["dish_key"]) {
            check = true
            break
        }
        i++
    }
    if (check == false) {
        maindata[e.id]["userId"] = userId
        maindata[e.id]["quantity"] = 1
       
        data.push(maindata[e.id])
        localStorage.setItem("add_to_card", JSON.stringify(data))
       
        Toastify({

            text: "Add To cart ",
            className: "Toastify",

            duration: 3000,
            style: {
                background: "green"
            },


        }).showToast();


    }
    else {
        Toastify({

            text: "Add To cart Already",
            className: "Toastify",

            duration: 3000,
            style: {
                background: "red"
            },


        }).showToast();

    }
}
