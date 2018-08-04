//Name
function name() {           
    document.getElementById('name').style.display = "block";
    document.getElementById('na').style.color = "green";
    
}   
//Username
function user() {                      
    document.getElementById('username').style.display = "block";
    document.getElementById('use').style.color = "green";
}

//Email
function email() {
    document.getElementById('email').style.display = "block";
    document.getElementById('em').style.color = "green";
    
}

//Password
function pass() {
    document.getElementById('password').style.display = "block";
    document.getElementById('pas').style.color = "green";
}

//Wrong
function my() {    
    document.getElementById('name').style.display = "none";
    document.getElementById('na').style.color = "black";
}

function wrong() {
    document.getElementById('username').style.display = "none";
    document.getElementById('use').style.color = "black";
}

function mywrong() {
    document.getElementById('email').style.display = "none";
    document.getElementById('em').style.color = "black";
}

function key() {
    document.getElementById('password').style.display = "none";
    document.getElementById('pas').style.color = "black";
}

//Images
function onoverimage() {
    document.getElementById('image').style.display = "block";        
}

function onmoutimage() {
    document.getElementById('image').style.display = "none"
}

function image() {
    document.getElementById('file').click();
}

function show() {
    document.getElementById('delete').style.display = "block";
}

function del() {
    document.getElementById('delete').style.display = "none";
}

function checks() {
    if (document.getElementById("checked").checked) {
        document.getElementById('check').disabled = false;
    }

    else{
        document.getElementById("check").disabled = true;
    }
}