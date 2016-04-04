window.onload = function() {
	$("#searchbox").width($(window).width() - 350);
	$("#header").width($(window).width());
}

function process_search(event){
	if(event.keyCode == 13){
		window.open("searchresults.html?" + $("#searchbox").val() , "_self");
	}
}

function resizeSearchBar(){
	$("#searchbox").width($(window).width() - 350);
	$("#header").width($(window).width());
}