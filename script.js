var category_card = document.getElementById("category_card")

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

                <a class="has-before hover:shine">
                  <figure class="card-banner img-holder" style="--width: 285; --height: 336;">
                    <img src=${data["categoryimage"]} width="285" height="336" loading="lazy" alt="Breakfast"
                      class="img-cover">
                  </figure>
                </a>

                <div class="card-content">

                  <h3 class="title-4 card-title">
                    <a >${data["categoryname"]}</a>
                  </h3>

                  <a href="#" class="btn-text hover-underline label-2" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${data["categoryKey"]} >View Menu</a>

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


getAllCategories();