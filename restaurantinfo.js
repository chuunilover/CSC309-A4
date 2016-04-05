var search_terms = /[^\?]*$/;
var query = $(location).attr('href').match(search_terms)[0]
requestSearch();

function requestSearch () {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			try{
				var restaurants = JSON.parse(xhttp.responseText);
				updatePage(restaurants)
			}
			catch(e){
				$('#results').html(e);
			}
		}
		if (xhttp.readyState == 4 && xhttp.status == 404){
			$('#results').html("Could not find this restaurant.");
		}
	};
	try{
		xhttp.open("GET", "/restaurantinfo/" + query, true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}

function updatePage(restaurant){
	$("#restaurantName").html(restaurant.name);
	$("#description").html(restaurant.description);
}