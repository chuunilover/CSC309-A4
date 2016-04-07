$.ajax({
	type: 'post',
    url: '/getManagedRestaurants',
	//datatype: "json" + "{\"restaurant\":" + restID + "}",
	processData: false,
    headers: {"Content-type": "application/x-www-form-urlencoded"},
	async: true,
	success: function(responseText, status, jqXHR) {
		try{
			var restInfo = JSON.parse(responseText);
		    if(restInfo.length == 0){
                $("#restlist").html("You aren't managing any restaurants at this time.");
            }
            else{
                for (var i in restInfo){
                    $("#restlist").html($("#restlist").html()
                    + "<a href=/managerestaurant.html?" + restInfo[i]._id + ">"
                    + restInfo[i].name
                    + "</a><br /><br />");
                }
            }
		}
		catch(e){
			alert("Restaurant not found.");
		}
	},
	statusCode: {
		404: function() {alert("Failed to retrieve profile information.")}
	}
});