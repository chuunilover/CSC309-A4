function logout(){
	delete_cookie("userID");
	delete_cookie("userID.sig");
	alert("logged out.");
}

function delete_cookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

window.onload = function() {
	$("#searchbox").width($(window).width() - 350);
	$("#header").width($(window).width());
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4 && xhttp.status == 200){
			try{
			var user = JSON.parse(xhttp .responseText);
				$("#loginbanner").html("Welcome, " + user.name + '| <button class="logout" onclick=logout()>Logout</button> | <a href="help.html" class="banner">Help</a>')
			}
			catch(e){
				alert("You're not logged in.");
			}
		}
	}
	try{
		xhttp.open("GET", 'http://localhost:3000/checkUser/', true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}

function process_search(event){
	if(event.keyCode == 13){
		window.open("searchresults.html?" + $("#searchbox").val() , "_self");
	}
}

function resizeSearchBar(){
	$("#searchbox").width($(window).width() - 350);
	$("#header").width($(window).width());
}