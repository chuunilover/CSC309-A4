var name_length = 350;

function logout(){
	delete_cookie("userID");
	delete_cookie("userID.sig");
	window.open("/", "_self");
}

function delete_cookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

window.onload = function() {
	$("#searchbox").width($(window).width() - 500);
	$("#header").width($(window).width());
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4 && xhttp.status == 200){
			try{
			var user = JSON.parse(xhttp .responseText);
				name_length = 350 + user.name.length * 10 + 80;
				$("#loginbanner").html("Welcome, " + user.name + '| <button class="logout" onclick=logout()>Logout</button> | <a href="help.html" class="banner">Help</a>')
				resizeSearchBar();
				$(".banner").css("visibility"," visible");
			}
			catch(e){
				//alert("You're not logged in.");
			}
		}
	}
	try{
		xhttp.open("GET", 'http://localhost:3000/checkUser/', true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}

function process_search(event){
	if(event.keyCode == 13){
		window.open("searchresults.html?" + $("#searchbox").val() , "_self");
	}
}

function resizeSearchBar(){
	$("#searchbox").width($(window).width() - name_length);
	$("#header").width($(window).width());
}