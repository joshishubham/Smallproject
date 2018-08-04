function show() {
    
    document.getElementById('demo').style.display = "block";
    document.getElementById('none').style.display = "none";
    document.getElementById('err').style.display = "none"
    document.getElementById('change').innerHTML = "Forget password";
}

function wrong() {
    document.getElementById('demo').style.display = "none";
    document.getElementById('none').style.display = "block";
    document.getElementById('change').innerHTML = "Log in";
}