window.onload = function() {
	$("#searchbox").width($(window).width() - 350);
	$("#header").width($(window).width());
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4 && xhttp.status == 200){
			try{
			var user = JSON.parse(xhttp .responseText);
				alert(JSON.stringify(user));
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