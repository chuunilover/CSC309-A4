<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js">
<script type="text/javascript">

//Read in name of restaurant     
var restaurantName = ;    

$(document).ready(function(){
    document.getElementById("nameRestaurant").innerHTML = restaurantName;
})

    
$("#submit").click(function(){
    //get username of logged in account
    var username = ;
    //get restaurant name 
    var rating = document.getElementById("rating").value;
    var review = document.getElementById("review").value;
    
	if (review == ""){
		alert("Please write text review")
	}
	else if (rating == "") {
		alert("Please rate this restaurant");
	}
	else{
		alert("Review Submitted for" + restaurantName);
		updateReview(username, restaurantName, rating, review);
	}
})    


function updateReview (username, restaurantName, rating, review){
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://localhost/admin", function(err,db){
    var adminDB = db.admin()
    adminDB.listDatabases(function(err, databases){
        console.log("Before Add Database List: ");
        console.log(databases);
    });
        
     //db.users.insert({_user:username, restaurant:restaurantName, rating:rating, review:review})    
        
});
}
    

$(document).ready(function(){
//  Check Radio-box
    $(".rating input:radio").attr("checked", false);
    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
    function(){
        var userRating = this.value;
        alert(userRating);
    }); 
});


