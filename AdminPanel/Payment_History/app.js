var table_data = document.getElementById("table_data")
var amountshow = document.getElementById("amountshow")
var amounttext = document.getElementById("amounttext")


window.addEventListener('resize', function () {
	if(this.innerWidth < 1224) {
		sidebar.classList.add('hide');
	} else {
		sidebar.classList.remove('hide');
	}
}
)

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.add('hide');
}
//hello 

toggleSidebar()

async function getAllPaymnets() {
    await firebase.database().ref("payments").get()
        .then((snap) => {
        
            var totalAmount = 0
            var data = Object.values(snap.val())
            for (var i = 0; i < data.length; i++) {
              
                table_data.innerHTML+=`
                <tr>
                <th scope="row">${Number(i)+1}</th>
                <td>${data[i]["order "]["userName"]}</td>
                <td>${data[i]["payment"]}</td>
                <td>${data[i]["order "]["status"]}</td>
              </tr>
                `
                totalAmount += Number(data[i]["payment"])
                
            }
           
            amountshow.style.display="block"
            amounttext.innerText = totalAmount
        })
        .catch((e) => {
            console.log(e)
        })
}


getAllPaymnets()


function logout() {
    window.location.href = "../../Auth/index.html"
}