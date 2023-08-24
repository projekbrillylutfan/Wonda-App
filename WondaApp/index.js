document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})

function login(){
    const password = document.getElementById("password").value
    const nama_alat_cari = document.getElementById("email").value
    var dbRef = firebase.database();
    var statusAlat = dbRef.ref("register");

    // Ambil data nama_alat huruf depan (dan selebihnya) isi text cari
    var query = statusAlat
    .orderByChild('email')
    .startAt(nama_alat_cari)
    .endAt(nama_alat_cari + "\uf8ff");

    // Memuat Data pencarian
    var cell1,cell2,cell3,cell4,cell5,cell6;
    query.on("child_added", function(snapshot) {

    var childData = snapshot.val();
    console.log(childData);

    cell1 = childData.as;
    cell2 = childData.email;
    cell3 = childData.nama;
    cell4 = childData.nip;
    cell5 = childData.password;
    cell6 = childData.username;

    if(cell1=="user" && password==cell5){
        location.replace("home.html")
    }else if(cell1=="admin" || cell1=="superadmin" && password==cell5){
        location.replace("home2.html")
    }else{
        document.getElementById("error").innerHTML = "Email atau Password yang anda inputkan salah";
    }
    });
}

function forgotPass(){
    const email = document.getElementById("email").value
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Reset link sent to your email id")
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = error.message
    });
}