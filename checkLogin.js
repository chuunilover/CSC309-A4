window.onload = function() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4 && xhttp.status == 200){
			try{
				var user = JSON.parse(xhttp.responseText);
				window.open("profile.html", "_self");
			}
			catch(e){
				//alert("You're not logged in.");
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