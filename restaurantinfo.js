var search_terms = /[^\?]*$/;
var query = $(location).attr('href').match(search_terms)[0]
requestSearch();
requestReviews();

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

function requestReviews () {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			try{
				//alert(xhttp.responseText);
				var reviews= JSON.parse("[" + xhttp.responseText + "]");
				updateReviews(reviews)
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
		xhttp.open("GET", "/reviews/" + query, true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}

//Update the page with all reviews. (After AJAX request sent)
function updateReviews(reviewList){
	for(var r in reviewList){
		$("#reviewStyle").html($("#reviewStyle").html() +  
		"<div id=\"individReviews\"> Posted by: " + 
		reviewList[r].name + "(@" + reviewList[r].author + ") <br />" +
			reviewList[r].text +
			"<br /> <br /> Rating: " + reviewList[r].rating.toString() +
			"/5<br /></div>");
	}
}

//Update this page with appropriate info.
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