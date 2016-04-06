var search_terms = /[^\?]*$/;
var query = $(location).attr('href').match(search_terms)[0]
requestSearch();

$("#writeReview").click(function(){
	window.open("review.html?" + query, "_self");
});

$("#reserveTable").click(function(){
	window.open("reservation.html?" + query, "_self");
});

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
	$("#location").html("Location: " + restaurant.location + "<br />");
	$("#hours").html("Hours: " + restaurant.hours);
}

/*
getRests();

function getRests(){
	var data = {email: "lolwut@lolwut.com", name: "lolcat"}
	$.ajax({
	    type: 'post',
        url: "/updateUser",
		datatype: "json",
		processData: false,
		data: "json=" + JSON.stringify(data),
//		headers: {"Content-type": "application/x-www-form-urlencoded"},
		async: true,
        success: function(responseText, status, jqXHR) {
            alert(responseText);
		},
		statusCode: {
			404: function() {alert("Couldn't make restaurant")}
		}
	});
}*/