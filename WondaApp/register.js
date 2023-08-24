document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})

var nama,nip,username,email,password,as;
function signUp(){
    nama = document.getElementById("nama").value
    nip = document.getElementById("nip").value
    username = document.getElementById("username").value
    email = document.getElementById("email").value
    password = document.getElementById("password").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        alert("Your account has been created")
        location.replace("index.html")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}

document.getElementById('submit').onclick=function(){
    signUp();
    firebase.database().ref('register/'+username).set({
        as:"user",
        email:email,    
        nama:nama,
        nip:nip,
        password:password,
        username:username
    });
}