<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js">
<script type="text/javascript">

//Read in name of restaurant     
var restaurantName = ;   
var restaurantID = ;

//Get username of logged in account
var username = user.username;

var rating;

$(document).ready(function(){
    document.getElementById("nameRestaurant").innerHTML = restaurantName;
})

$(document).ready(function(){
//  Check Radio-box
    $(".rating input:radio").attr("checked", false);
    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
    function(){
        rating = this.value;
        alert(rating);
    }); 
})
    
$("#submit").click(function(){
    var review = document.getElementById("review").value;
    
	if (review == ""){
		alert("Please write text review")
	}
	else if (rating == "") {
		alert("Please rate this restaurant");
	}
	else{
		alert("Submitted review for" + restaurantName);
		updateReview(text, rating, username, restaurant);
	}
    window.history.back();
})    


function updateReview (text, rating, username, restaurant){
    var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			alert(xhttp.responseText);
		}
	};
	try{
		alert("http://localhost:3000/review/" + text + "/" + rating + "/" + username + "/" + restaurant);
		xhttp.open("GET", "http://localhost:3000/review/" + text + "/" + rating + "/" + username + "/" + restaurant, true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}        
}

    




