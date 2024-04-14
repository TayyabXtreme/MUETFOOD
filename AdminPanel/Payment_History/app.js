var table_data = document.getElementById("table_data")
var amountshow = document.getElementById("amountshow")
var amounttext = document.getElementById("amounttext")
async function getAllPaymnets() {
    await firebase.database().ref("payments").get()
        .then((snap) => {
            console.log(snap.val())
            var totalAmount = 0
            var data = Object.values(snap.val())
            for (var i = 0; i < data.length; i++) {
                console.log(data[i]["order "]["userName"])
                console.log(data[i]["payment"])
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
            console.log(totalAmount)
            amountshow.style.display="block"
            amounttext.innerText = totalAmount
        })
        .catch((e) => {
            console.log(e)
        })
}


getAllPaymnets()
