var search_terms = /[^\?]*$/;
var query = $(location).attr('href').match(search_terms)[0]
requestSearch(query);

function requestSearch (keywords) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			try{
				var restaurants = JSON.parse('[' + xhttp.responseText + ']');
				updateResults(restaurants)
			}
			catch(e){
				$('#results').html("Error occurred when searching for a restaurant.");
			}
		}
		if (xhttp.readyState == 4 && xhttp.status == 404){
			$('#results').html("Error occurred when searching for a restaurant.");
		}
	};
	try{
		xhttp.open("GET", "/search/" + query, true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}

function updateResults (results){
	if (results.length == 0){
		$('#results').html("No restaurants found matching your criteria. Search something else?");
	}
	for (var r in results){
		$('#results').html($('#results').html() + formatRestaurant(results[r]));
	}
}

function formatRestaurant(restaurant){
	return "<a href=\"/restaurantinfo.html?" + restaurant._id + "\">" + restaurant.name + "</a>";
}