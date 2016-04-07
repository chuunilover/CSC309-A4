var search_terms = /[^\?]*$/;
var query = $(location).attr('href').match(search_terms)[0]

$("#submit").click(function(){
	reviewText = $("textarea#review").val();
	review(reviewText);
});


function review(reviewContent){
    var data = {rating: $("#rating").val(), reviewText: reviewContent, restID: query};
	$.ajax({type: 'post',
        url: "/reviewRestaurant",
		datatype: "json",
		processData: false,
		data: "json=" + JSON.stringify(data),
        headers: {"Content-type": "application/x-www-form-urlencoded"},
		async: true,
        success: function(responseText, status, jqXHR) {
            alert(responseText);
			//window.open("/", "_self");
		},
		statusCode: {
			404: function() {alert("Failed to update information.")}
		}
	});
}


