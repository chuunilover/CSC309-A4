var search_terms = /[^\?]*$/;
alert("Searching for: " + search_url.match(search_terms)[0]);
var query = search_url.match(search_terms)[0]
var xhttp = new XMLHttpRequest(username, name, password);
xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200){
		document.getElementById("tweets").innerHTML = xhttp.responseText;
	}
};
try{
	xhttp.open("GET", "http://127.0.0.1:3000/search/" + query, true);
	xhttp.send(null);
}
catch(e){
	alert(e);
}