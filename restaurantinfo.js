var name = document.getElementById("restaurantName").value;

$("#submit").click(function(){ 
    localStorage.setItem(restaurant, name);
    window.open("review.html?" + name, "_self");
});