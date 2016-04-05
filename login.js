

$("#login").click(function(){
	var inputtedUsername = document.getElementById("username").value;
	var inputtedPassword = document.getElementById("password").value;
	if (inputtedUsername == ""){
		alert("Please input a username")
	}
	else if (inputtedPassword == ""){
		alert("Please type in your password");
	}
	else{
		requestLogin(inputtedUsername, inputtedPassword);
	}
})

$("#signup").click(function(){
	window.open("signup.html", "_self");
});

//Request a login. Requests involve appending a specific query to the end of the web address.
function requestLogin (username, password) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			alert(xhttp.responseText);
			window.open("profile.html", "_self");
		}
	};
	try{
		xhttp.open("GET", "http://localhost:3000/login/" + username + "/" + password, true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}