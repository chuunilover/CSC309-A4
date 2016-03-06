function process_search(event){
	if(event.keyCode == 13){
		alert("Searching for restaurants with \"" + $("#searchbox").val() + "\"");
	}
}