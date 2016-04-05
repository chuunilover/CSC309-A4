<<<<<<< HEAD
var name = document.getElementById("restaurantName").value;







$("#submit").click(function(){ 
    localStorage.setItem(restaurant, name);
    window.open("review.html", "_self");
}) 
=======
var search_terms = /[^\?]*$/;
var query = $(location).attr('href').match(search_terms)[0]
requestSearch(query);

function requestSearch (keywords) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			try{
				var restaurants = JSON.parse(xhttp.responseText);
				alert(JSON.stringify(restaurants[i]));
			}
			catch(e){
				alert("Restaurant doesn't exist.");
			}
		}
		if (xhttp.readyState == 4 && xhttp.status == 404){
			alert("No search terms entered.");
		}
	};
	try{
	/*
		xhttp.open("GET", "http://localhost:3000/restaurantinfo/" + query, true);
		xhttp.send(null);*/
		xhttp.open("POST", "http://localhost:3000/", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("description=apijfodbijlkbflkjsfldkgjlkjdlkjglskjlkgfjlkjlgkjslkjskflgdjlgsjlkbjdlkflkgdjskllkjalklksj");
	}
	catch(e){
		alert(e);
	}
}
>>>>>>> origin/master
