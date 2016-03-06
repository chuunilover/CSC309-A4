$("#login").click(function(){
	var inputtedUsername = document.getElementById("username").value;
	var inputtedPassword = document.getElementById("password").value
	if (inputtedUsername == ""){
		alert("Please input a username")
	}
	else if (inputtedPassword == ""){
		alert("Please type in your password");
	}
	else{
		alert("username=" +
        inputtedUsername + 
        " and password=" + 
        inputtedPassword);
	}
})