var userInfo = null;

$.ajax({
	type: 'get',
    url: "/checkUser",
	datatype: "json",
	processData: false,
    headers: {"Content-type": "application/x-www-form-urlencoded"},
	async: true,
		success: function(responseText, status, jqXHR) {
			userInfo = JSON.parse(responseText);
			$("#nameInput").val(userInfo.name);
			$("#email").val(userInfo.email);
			$("#nameInput").attr({'disabled': 'disabled'});
			$("#email").attr({'disabled': 'disabled'});
	},
	statusCode: {
		404: function() {alert("Failed to retrieve profile information.")}
	}
});

var name = ""
var email = ""

$("#showEmail").click(function(){
    //$("#email").css("visibility", "visible");
	$("#email").removeAttr('disabled');
});

$("#showName").click(function(){
    //$("#nameInput").css("visibility", "visible");
	$("#nameInput").removeAttr('disabled');
});

$("#update").click(function(){
    updateUser()
});

function updateUser(){
    if($("#nameInput").css("visibility") == "visible"){
        name = $("#nameInput").val();
    }
    if($("#email").css("visibility") == "visible"){
        email = $("#email").val();
    }
    if(email == "" && name == ""){
        alert("You didn't update anything.");
        return;
    }
    var data = {name: name, email: email}
	$.ajax({
	    type: 'post',
        url: "/updateUser",
		datatype: "json",
		processData: false,
		data: "json=" + JSON.stringify(data),
        headers: {"Content-type": "application/x-www-form-urlencoded"},
		async: true,
        success: function(responseText, status, jqXHR) {
            alert(responseText);
			window.open("/", "_self");
		},
		statusCode: {
			404: function() {alert("Failed to update information.")}
		}
	});
}