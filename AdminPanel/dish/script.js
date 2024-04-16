const sidebar = document.getElementById('sidebar');



window.addEventListener('resize', function () {
	if(this.innerWidth < 1224) {
		sidebar.classList.add('hide');
	} else {
		sidebar.classList.remove('hide');
	}
}
)

function toggleSidebar() {
    sidebar.classList.add('hide');
}
toggleSidebar()


// console.log(firebase)
let category_data = document.getElementById("category-data")
let edit_cat_option = document.getElementById("edit_cat_option")
var dish_name_edit = document.getElementById("dish_name_edit")
var dish_price_edit = document.getElementById("dish_price_edit")

let dish_name = document.getElementById("dish_name")
let dish_price = document.getElementById("dish_price")
var imageUrl = ""
let image = document.getElementById("image")
let images = document.getElementById("images")
let dish_image = document.getElementById("dish_image")
let btn= document.getElementById("btn")
let table_data = document.getElementById("table_data")

var dbref = firebase.database().ref("dishes")

image.addEventListener("change", function (e) {
    // console.log(e.target.files[0])
    imageUpload(e)
})

images.addEventListener("change", function (e) {
    // console.log(e.target.files[0])
    imageUpload(e)
})


function imageUpload(e) {
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child(`Dishes/${e.target.files[0].name}`).put(e.target.files[0]);
    uploadTask.on('state_changed',
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {

            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                imageUrl = url
                btn.disabled = false
                dish_image.src = imageUrl

               

            });
        }
    );

}

async function AddDish() {


    var dish_key = dbref.push().getKey();

    await firebase.database().ref("category").child(category_data.value)
        .get().then(async (snap) => {
            // console.log(snap.val())
            var category_name = snap.val()["categoryname"]
            var Object = {
                dish_name: dish_name.value,
                dish_image: imageUrl,
                dish_price: dish_price.value,
                dish_key: dish_key,
                category_name: category_name,
                category_key: category_data.value

            }
            // console.log(Object)
            await dbref.child(category_data.value).child(dish_key).set(Object)
            var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal'));
            myModal.hide();
            ViewDishes()
            Toastify({

                text: "Add New Dishes",

                duration: 3000

            }).showToast();
        })




    // 
}


//run only first time
async function getAllCategory() {
    category_data.innerHTML = ""

    await firebase.database().ref("category").get()
        .then((snap) => {
            // console.log(snap.val())
            // vcalues = >Object.keys,Object.values
            var getCategory = Object.values(snap.val())
            // console.log(getCatyegoery)
            for (var index in getCategory) {
                // console.log(getCategory[index])
                category_data.innerHTML += `<option value=${getCategory[index]["categoryKey"]}>${getCategory[index]["categoryname"]}</option>`
                edit_cat_option.innerHTML += `<option value=${getCategory[index]["categoryKey"]}>${getCategory[index]["categoryname"]}</option>`
            }


        })
        .catch((e) => {
            // console.log(e)
        })

}

async function ViewDishes() {
    table_data.innerHTML = ""

    var mainData = [];

    await dbref.get()
        .then((snapshoot) => {
            if (snapshoot.val() != undefined || snapshoot.val() != null) {
                var dataValue = Object.values(snapshoot.val())
               
                for (var i = 0; i < dataValue.length; i++) {
                    var newdata = Object.values(dataValue[i])
                  
                    for (var j in newdata) {
                        // console.log(newdata[i])
                        mainData.push(newdata[j])

                    }

                }


            }
        })

        for(var i in mainData){
           
            table_data.innerHTML += `
            <tr >
  <th scope="row">${(Number(i) + 1)}</th>
  <td>${mainData[i]["category_name"]}</td>
  <td>${mainData[i]["dish_name"]}</td>
  <td>${mainData[i]["dish_price"]}</td>


  <td>
  <img src="${mainData[i]["dish_image"]}"  />
  </td>
  <td>
  <Button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal1" value='${mainData[i]["category_key"]}' id='${mainData[i]["dish_key"]}' onclick='editDish(this)'><i class="fas fa-edit"></i></Button>
    <Button class="btn btn-danger" value='${mainData[i]["category_key"]}' id='${mainData[i]["dish_key"]}' onclick='deleteDish(this)'><i class="fas fa-trash-alt"></i></Button>
  </td>
 
</tr>
            `

        }
    

}

ViewDishes()

async function deleteDish(e) {
    
    await dbref.child(e.value).child(e.id).remove()
    ViewDishes()
    Toastify({

        text: "Delete Dishes",

        duration: 3000

    }).showToast();
}
var a;
var b;
async function editDish(e) {
     await firebase.database().ref("category").child(e.value)
    
     a=e.id;
     b=e.value;
     await dbref.child(e.value).child(e.id).get()
         .then((snap) => {
           
             dish_name_edit.value = snap.val()["dish_name"]
             dish_price_edit.value = snap.val()["dish_price"]
             dish_image.src = snap.val()["dish_image"]
             imageUrl=snap.val()["dish_image"]
         })

    
}

getAllCategory()

async function updateDish() {
    await dbref.child(b).child(a).update({
        dish_name: dish_name_edit.value,
        dish_price: dish_price_edit.value,
        dish_image: imageUrl
    });
    ViewDishes()
    Toastify({

        text: "Update Dishes",

        duration: 3000

    }).showToast();
}


function logout() {
    window.location.href = "../../Auth/index.html"
}