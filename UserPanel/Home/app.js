// console.log(firebase.database())

var category_card = document.getElementById("category_card")
//var spinner = document.getElementById("spinner")
// make a logic if the local storage have not userId and username the page automatically redirect to the login page
if(localStorage.getItem("userId")==null){

    window.location.replace("../../Auth/index.html")


}
else{
    // get all the categories
    getAllCategories()
}



async function getAllCategories(){

    await firebase.database().ref("category").get()
    .then((snap)=>{
        var Categorydata = Object.values(snap.val())
        category_card.innerHTML = ""
        for(var data of Categorydata){
          
          console.log(data)
            category_card.innerHTML += `
            <li>
              <div class="service-card">

                <a href="#" class="has-before hover:shine">
                  <figure class="card-banner img-holder" style="--width: 285; --height: 336;">
                    <img src=${data["categoryimage"]} width="285" height="336" loading="lazy" alt="Breakfast"
                      class="img-cover">
                  </figure>
                </a>

                <div class="card-content">

                  <h3 class="title-4 card-title">
                    <a href="#">${data["categoryname"]}</a>
                  </h3>

                  <a href="#" class="btn-text hover-underline label-2"  id=${data["categoryKey"]} onclick=ViewDish(this)>View Menu</a>

                </div>

              </div>
            </li>

            `

        }
        // setTimeout(() => {
          //  spinner.style.display="none"
        // }, 3000);


    })
    .catch((e)=>{
        console.log(e)
    })

}

function ViewDish(e){
    console.log(e.id)
    localStorage.setItem("current_Cat",e.id)
    window.location.href="../Dishes/index.html"

}

getAllCategories()

function logout(){
    localStorage.clear()
    window.location.replace("../../index.html")
}