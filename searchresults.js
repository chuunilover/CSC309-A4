var search_terms = /[^\?]*$/;
var query = $(location).attr('href').match(search_terms)[0]
requestSearch(query);


function requestSearch (keywords) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			alert(xhttp.responseText);
		}
	};
	try{
		xhttp.open("GET", "http://localhost:3000/search/" + query, true);
		//xhttp.open("POST", "search", true);
		//xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//xhttp.setRequestHeader("Connection", "close");
		//alert('search=' + query)
		xhttp.send(null);
		//xhttp.send('search=' + query + '&q=b');
	}
	catch(e){
		alert(e);
	}
}