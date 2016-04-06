/*var xhttp = new XMLHttpRequest();
xhttp.onreadystatchanged = function(){
    if (xhttp.readyState == 4 && xhttp.status == 200){
        alert("restaurant created!");
    }
    else if(xhttp.readystate == 4){
        alert("error creating new restaurant.");
    }
};

//http://localhost:3000/restaurants/add/yum/home/swagger/food/never
try{
	alert("http://localhost:3000/restaurants/add/" + $("#name").val() + "/"
					+ $("#location").val() + "/" + $("#description").val() + "/"
					+ $("#location").val() + "/" + $("#tags").val() + "/" 
					+ $("#hours").val());
	xhttp.open("GET", "http://localhost:3000/restaurants/add/" + $("#name").val() + "/"
					+ $("#location").val() + "/" + $("#description").val() + "/"
					+ $("#location").val() + "/" + $("#tags").val() + "/" 
					+ $("#hours").val() , true);
	xhttp.send(null);
}
catch(e){
	alert(e);
}*/	

$("#restaurantform").submit(function(event) {
	event.preventDefault();
	try{
		validateForm(this.name.value, this.location.value, this.description.value, this.tags.value, this.hours.value, this.tables.value, this.seats.value);
	}catch(e){
		alert(e)
	}
})

function stringNull(str){
	return str == null || str == "";
}	


function validateForm(name, location, description, tags, hours, numTables, maxSeat){
	var terms = [name, location, description, tags, hours, numTables, maxSeat];
	var names = "name,location,description,tags,hours,number of tables,largest seating capacity".split(",");
	var data = {name: name, location: location, description: description, tags: tags, hours: hours}
	for (s in terms){
		if (stringNull(terms[s])){
			alert("Please fill in the " + names[s] + " for your restaurant.");
			return;
		}
	}
	$.ajax({
	    type: 'post',
        url: "/createRestaurant",
		datatype: "json",
		processData: false,
		data: "json=" + JSON.stringify(data),
//		headers: {"Content-type": "application/x-www-form-urlencoded"},
		async: true,
        //data: {id:'test', id2:values['test1'], id3:values['test2'], id4:values['test3']},
        success: function(responseText, status, jqXHR) {
            alert(responseText);
		},
		statusCode: {
			404: function() {alert("Couldn't make restaurant")}
		}
	});
	var l = 4;
}

