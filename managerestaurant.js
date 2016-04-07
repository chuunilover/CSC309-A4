var restInfo = restInfo;
var search_terms = /[^\?]*$/;
var restID = $(location).attr('href').match(search_terms)[0]

$.ajax({
	type: 'get',
    url: '/restaurantinfo/' + restID,
	//datatype: "json" + "{\"restaurant\":" + restID + "}",
	processData: false,
    headers: {"Content-type": "application/x-www-form-urlencoded"},
	async: true,
	success: function(responseText, status, jqXHR) {
		try{
			restInfo = JSON.parse(responseText);
		    $("#nameInput").val(restInfo.name);
			$("#location").val(restInfo.location);
			$("#description").val(restInfo.description);
			$("#tags").val(restInfo.tags);
			$("#hours").val(restInfo.hours);
			$("#nameInput").attr({'disabled': 'disabled'});
			$("#location").attr({'disabled': 'disabled'});
			$("#description").attr({'disabled': 'disabled'});
			$("#tags").attr({'disabled': 'disabled'});
			$("#hours").attr({'disabled': 'disabled'});
		}
		catch(e){
			alert("Restaurant not found.");
		}
	},
	statusCode: {
		404: function() {alert("Failed to retrieve profile information.")}
	}
});

var name = ""
var email = ""

$("#showName").click(function(){
    //$("#nameInput").css("visibility", "visible");
	$("#nameInput").removeAttr('disabled');
});

$("#showLocation").click(function(){
    //$("#location").css("visibility", "visible");
	$("#location").removeAttr('disabled');
});

$("#showDescription").click(function(){
    //$("#description").css("visibility", "visible");
	$("#description").removeAttr('disabled');
});

$("#showTags").click(function(){
    //$("#tags").css("visibility", "visible");
	$("#tags").removeAttr('disabled');
});

$("#showHours").click(function(){
    //$("#hours").css("visibility", "visible");
	$("#hours").removeAttr('disabled');
});


$("#update").click(function(){
    updateRestaurant()
});

$("#addAdmin").click(function(){
	var admin = prompt("Please enter the new admin's username", "Please enter the new admin's username");
	var addInfo = {id: admin, restID: restID};
	$.ajax({
	    type: 'post',
        url: '/addAdmin',
		datatype: "json",
		processData: false,
		data: "json=" + JSON.stringify(addInfo),
        headers: {"Content-type": "application/x-www-form-urlencoded"},
		async: true,
        success: function(responseText, status, jqXHR) {
            alert(responseText);
			window.open("/", "_self");
		},
		statusCode: {
			404: function() {alert("Failed to update information.")}
		}
	});
});


function updateRestaurant(){
    var name = $("#nameInput").val()
    var location = $("#location").val()    
    var description = $("#description").val()
    var tags = $("#tags").val()
    var hours = $("#hours").val()
    data = {name: name,
		location: location,
		description: description,
		tags: tags,
		hours: hours,
		restaurantID: restInfo._id};
	$.ajax({
	    type: 'post',
        url: "/updateRestaurant",
		datatype: "json",
		processData: false,
		data: "json=" + JSON.stringify(data),
        headers: {"Content-type": "application/x-www-form-urlencoded"},
		async: true,
        success: function(responseText, status, jqXHR) {
            alert(responseText);
			window.open("/", "_self");
		},
		statusCode: {
			404: function() {alert("Failed to update information.")}
		}
	});
}