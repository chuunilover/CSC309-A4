window.onload = function() {
	$("#searchbox").width($(window).width() - 250);
}

function process_search(event){
	if(event.keyCode == 13){
		alert("Searching for restaurants with \"" + $("#searchbox").val() + "\"");
	}
}

function resizeSearchBar(){
	$("#searchbox").width($(window).width() - 250);
}