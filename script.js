function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    if (email === "" || pass === "") {
        alert("Please enter email and password!");
        return;
    }

    alert("Login Successful! (Demo)");
}
