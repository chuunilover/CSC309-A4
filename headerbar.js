window.onload = function() {
	$("#searchbox").width($(window).width() - 250);
	$("#header").width($(window).width() - 10);
}

function process_search(event){
	if(event.keyCode == 13){
		alert("Searching for restaurants with \"" + $("#searchbox").val() + "\"");
		window.open("searchresults.html?" + $("#searchbox").val() , "_self");
	}
}

function resizeSearchBar(){
	$("#searchbox").width($(window).width() - 250);
	$("#header").width($(window).width() - 10);
}