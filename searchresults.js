var search_terms = /[^\?]*$/;
var query = $(location).attr('href').match(search_terms)[0]
requestSearch(query);

function requestSearch (keywords) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			var restaurants = JSON.parse('[' + xhttp.responseText + ']');
			for (var i in restaurants){
				alert(JSON.stringify(restaurants[i]));
			}
			updateResults(restaurants)
		}
		if (xhttp.readyState == 4 && xhttp.status == 404){
			alert("No search terms entered.");
		}
	};
	try{
		xhttp.open("GET", "http://localhost:3000/search/" + query, true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}

function updateResults (results){
	if (results.length == 0){
		alert("No restaurants have been found matching your criteria.")
	}
}