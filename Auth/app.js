let email = document.getElementById("email")
let password = document.getElementById("password")



async function Login() {
    console.log(firebase)

    await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(async (snap) => {
            console.log(snap.user.uid)
            let userId = snap.user.uid

            await firebase.database().ref("users").child(userId).get()
                .then((snapshot) => {
                    console.log(snapshot.val()["userName"])
                    console.log(snapshot.val()["userType"]+"userType")
                    if (snapshot.val() != undefined && snapshot.val()["userType"] == "user") {
                       localStorage.setItem("userId",userId)
                       localStorage.setItem("username",JSON.stringify(snapshot.val()["userName"]) )
                        window.location.replace("../UserPanel/Home/index.html")

                    }
                    else if (snapshot.val() != undefined && snapshot.val()["userType"] == "admin") {
                        window.location.replace("../AdminPanel/Dashbaord/index.html")

                    }
                })

            Toastify({
                text: "Account Login",
                duration: 3000

            }).showToast();
        })


        .catch((e) => {
            Toastify({

                text: e.code,

                duration: 3000

            }).showToast();

        })
        email.value = ""
        password.value = ""

}







let emailnew = document.getElementById("emailnew")
let passwordnew = document.getElementById("passwordnew")
let userName = document.getElementById("name")

async function createAccount() {

    await firebase.auth().createUserWithEmailAndPassword(emailnew.value, passwordnew.value)
        .then(async (snap) => {
            console.log(snap.user.uid)
            let userId = snap.user.uid //unique

            var object = {
                email:emailnew.value,
                password:passwordnew.value,
                userName:userName.value,
                userType:"user",
                userId,

            }

            //set data
           await  firebase.database().ref("users").child(snap.user.uid)
            .set(object)
            login();


            Toastify({

                text: "Account create and save db",

                duration: 3000

            }).showToast();
        })


        .catch((e) => {
            Toastify({

                text: e.code,

                duration: 3000

            }).showToast();

        })
        emailnew.value = ""
        passwordnew.value = ""
        userName.value = ""

}


var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

