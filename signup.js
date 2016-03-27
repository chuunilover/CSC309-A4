$("#signup").click(function(){
	var inputtedUsername = document.getElementById("username").value;
	var inputtedName = document.getElementById("name").value;
	var inputtedPassword = document.getElementById("password").value;
	var confirmedPassword = document.getElementById("confirmpassword").value;
	var inputtedEmail = document.getElementById("email").value;
	if (inputtedUsername == ""){
		alert("Please input a username")
	}
	else if (email == "") {
		alert("Please type in an email");
	}
	else if (inputtedName ==  ""){
		alert("Please put in a name.");
	}
	else if (inputtedPassword == ""){
		alert("Please type in your password");
	}
	else if (inputtedPassword != confirmedPassword){
		alert("The two passwords don't match.");
	}
	else{
		alert("username=" +
        inputtedUsername + 
        " and password=" + 
        inputtedPassword);
		requestSignup(inputtedUsername, inputtedName, inputtedEmail, inputtedPassword);
	}
})

//Request a signup. Requests involve appending a specific query to the end of the web address.
function requestSignup (username, name, email, password) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			alert(xhttp.responseText);
		}
	};
	try{
		alert("http://localhost:3000/signup/" + username + "/" + name + "/" + email + "/" + password);
		xhttp.open("GET", "http://localhost:3000/signup/" + username + "/" + name + "/" + email + "/" + password, true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}