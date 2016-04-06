var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var allTables = [];
canvas.addEventListener("mousedown", handleMouseDown, false);
var search_terms = /[^\?]*$/;
var restID = $(location).attr('href').match(search_terms)[0]
var seatCount = [];

var currentDateString = ""

function drawCircle(x, y, rad, incolor, outcolor) {
	context.beginPath();
    	context.arc(x, y, rad, 0, 2 * Math.PI, false);
    	context.fillStyle = incolor;
    	context.fill();
    	context.lineWidth = 1;
    	context.strokeStyle = outcolor;
    	context.stroke();
}



function drawRestaurant() {
	var t = document.getElementById("time");
	currentDateString = $("#datepicker").val() + " " + t.options[t.selectedIndex].value;
	allTables=[]

	//Table 1
	
	var table1 = {x: 95, y:60, reserved:true};
	allTables = allTables.concat(table1);
	drawCircle(95, 60, 40, 'white', 'black');
	drawCircle(50,24,10, 'white', 'black');
	drawCircle(140,24,10,'white', 'black');
	drawCircle(50,96,10, 'white', 'black');
	drawCircle(140,96,10, 'white', 'black');
	
	//Table 2
	var table2 = {x: 250, y:60, reserved:true};
	allTables = allTables.concat(table2);
	drawCircle(250,60,40,'white', 'black');
	drawCircle(205,24,10,'white', 'black');
	drawCircle(295,24,10,'white', 'black');
	drawCircle(205,96,10,'white', 'black');
	drawCircle(295,96,10,'white', 'black');

	//Table 3
	var table3 = {x: 405, y:60, reserved:true};
	allTables = allTables.concat(table3);
	drawCircle(405,60,40,'white', 'black');
	drawCircle(360,24,10,'white', 'black');
	drawCircle(450,24,10,'white', 'black');
	drawCircle(360,96,10,'white', 'black');
	drawCircle(450,96,10,'white', 'black');
	
	//Table 4
	var table4 = {x: 95, y:190, reserved:true};
	allTables = allTables.concat(table4);
	drawCircle(95, 190, 40, 'white', 'black');
	drawCircle(50,154,10,'white', 'black');
	drawCircle(140,154,10,'white', 'black');
	drawCircle(50,226,10, 'white', 'black');
	drawCircle(140,226,10, 'white', 'black');
	
	//Table 5
	var table5 = {x: 250, y:190, reserved:true};
	allTables = allTables.concat(table5);
	drawCircle(250,190,40,'white', 'black');
	drawCircle(205,154,10,'white', 'black');
	drawCircle(295,154,10,'white', 'black');
	drawCircle(205,226,10,'white', 'black');
	drawCircle(295,226,10,'white', 'black');

	//Table 6
	var table6 = {x: 95, y:330, reserved:true};
	allTables = allTables.concat(table6);
	drawCircle(95,330,40,'white', 'black');
	drawCircle(50,294,10, 'white', 'black');
	drawCircle(140,294,10,'white', 'black');
	drawCircle(50,366,10, 'white', 'black');
	drawCircle(140,366,10, 'white', 'black');
	
	//Table 7
	var table7 = {x: 250, y:330, reserved:true};
	allTables = allTables.concat(table7);
	drawCircle(250,330,40,'white', 'black');
	drawCircle(205,294,10,'white', 'black');
	drawCircle(295,294,10,'white', 'black');
	drawCircle(205,366,10,'white', 'black');
	drawCircle(295,366,10,'white', 'black');

	//Table 8
	var table8 = {x: 405, y:330, reserved:true};
	allTables = allTables.concat(table8);
	drawCircle(405,330,40,'white', 'black');
	drawCircle(360,294,10,'white', 'black');
	drawCircle(450,294,10,'white', 'black');
	drawCircle(360,366,10,'white', 'black');
	drawCircle(450,366,10,'white', 'black');

	//Table 9
	var table9 = {x: 95, y:470, reserved:true};
	allTables = allTables.concat(table9);
	drawCircle(95, 470, 40, 'white', 'black');
	drawCircle(50,434,10, 'white', 'black');
	drawCircle(140,434,10,'white', 'black');
	drawCircle(50,506,10, 'white', 'black');
	drawCircle(140,506,10, 'white', 'black');
	
	//Table 10
	var table10 = {x: 250, y:470, reserved:true};
	allTables = allTables.concat(table10);
	drawCircle(250,470,40,'white', 'black');
	drawCircle(205,434,10,'white', 'black');
	drawCircle(295,434,10,'white', 'black');
	drawCircle(205,506,10,'white', 'black');
	drawCircle(295,506,10,'white', 'black');

	//Table 11
	var table11 = {x: 405, y:470, reserved:true};
	allTables = allTables.concat(table11);
	drawCircle(405,470,40,'white', 'black');
	drawCircle(360,434,10,'white', 'black');
	drawCircle(450,434,10,'white', 'black');
	drawCircle(360,506,10,'white', 'black');
	drawCircle(450,506,10,'white', 'black');

	//Table 12
	var table12 = {x: 95, y:610, reserved:true};
	allTables = allTables.concat(table12);
	drawCircle(95,610,40,'white', 'black');
	drawCircle(50,574,10,'white', 'black');
	drawCircle(140,574,10,'white', 'black');
	drawCircle(50,646,10,'white', 'black');
	drawCircle(140,646,10,'white', 'black');
	
	//Table 13
	var table13 = {x: 250, y:610, reserved:true};
	allTables = allTables.concat(table13);
	drawCircle(250,610,40,'white', 'black');
	drawCircle(205,574,10,'white', 'black');
	drawCircle(295,574,10,'white', 'black');
	drawCircle(205,646,10,'white', 'black');
	drawCircle(295,646,10,'white', 'black');

	//Table 14
	var table14 = {x: 405, y:610, reserved:true};
	allTables = allTables.concat(table14);
	drawCircle(405,610,40,'white', 'black');
	drawCircle(360,574,10,'white', 'black');
	drawCircle(450,574,10,'white', 'black');
	drawCircle(360,646,10,'white', 'black');
	drawCircle(450,646,10,'white', 'black');

	//Table 15
	var table15 = {x: 560, y:610, reserved:true};
	allTables = allTables.concat(table15);
	drawCircle(560,610,40,'white', 'black');
	drawCircle(515,574,10,'white', 'black');
	drawCircle(605,574,10,'white', 'black');
	drawCircle(515,646,10,'white', 'black');
	drawCircle(605,646,10,'white', 'black'); 
	
	requestSearch();
	requestSeatInfo();
}



function tableIsClicked(table, mousex, mousey){
	dx = table.x - mousex;
	dy = table.y - mousey;
	if(Math.sqrt(dx * dx + dy * dy) < 40){
		return true;
	}
	return false;
}




function handleMouseDown(event) {
	var rect = canvas.getBoundingClientRect();
	var click_x = event.pageX - rect.left;
	var click_y = event.pageY - rect.top;
	for(i = 0; i < allTables.length; i++){ 
		if(tableIsClicked(allTables[i], click_x, click_y) && !allTables[i].reserved){
			if (confirm('Would you like to reserve this table?')){
				requestReserve(i + 1);
			}
		}
	}
}

$('#datepicker').datepicker({
	format: "dd/mm/yyyy"
});

//'/restaurant/reserve/:restaurantID/:seatID/:time'
function requestReserve(tableNum) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			try{
				alert(xhttp.responseText);
				requestSearch();
			}
			catch(e){
				alert(e);
			}
		}
		if (xhttp.readyState == 4 && xhttp.status == 404){
			alert("Reservation failed.");
		}
	};
	try{
		new Date(currentDateString).getTime()
		xhttp.open("GET", "http://localhost:3000/restaurant/reserve/" + restID + "/" + tableNum.toString() + "/" + new Date(currentDateString).getTime(), true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}

//Send a get request for which seats are reserved.
function requestSeatInfo() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			try{
				seatCount = xhttp.responseText.split(",");
				drawSeating();
			}
			catch(e){
				alert(e);
			}
		}
		if (xhttp.readyState == 4 && xhttp.status == 404){
			//alert("Failed to retrieve seat info.");
		}
	};
	try{
		new Date(currentDateString).getTime()
		xhttp.open("GET", "http://localhost:3000/restaurants/seats/" + restID, true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}

function requestSearch () {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200){
			try{
				var restaurants = JSON.parse('[' + xhttp.responseText + ']');
				draw_free_tables(restaurants)
				drawSeating();
			}
			catch(e){
				alert(e);
			}
		}
		if (xhttp.readyState == 4 && xhttp.status == 404){
			alert("Could not find this restaurant.");
		}
	};
	try{
		new Date(currentDateString).getTime()
		xhttp.open("GET", "http://localhost:3000/restaurant/seatinfo/" + restID + "/" + new Date(currentDateString).getTime(), true);
		xhttp.send(null);
	}
	catch(e){
		alert(e);
	}
}

function draw_free_tables(freeTables){
	for (var k in allTables){
		if(arrayIndex(freeTables, parseInt(k) + 1) > -1){
			allTables[k].reserved = false;
			draw_circle_filled(allTables[k].x, allTables[k].y, 40, 'green', 'green');
		}
		else{
			draw_circle_filled(allTables[k].x, allTables[k].y, 40, 'red', 'red');
		}
	}
}

function drawSeating(){
	for(var idx in seatCount){
		if (idx < allTables.length){
			draw_text(allTables[idx].x, allTables[idx].y, seatCount[idx])
		}
		else{
			break;
		}
	}
}

function arrayIndex(array, value){
	for (var p in array){
		if (array[p] == value){
			return p;
		}
	}
	return -1
}

function draw_circle_filled(x, y, rad, incolor, outcolor) {
	context.beginPath();
    context.arc(x, y, rad/2, 0, 2 * Math.PI, false);
    context.fillStyle = incolor;
    context.fill();
    context.lineWidth = rad/2;
    context.strokeStyle = outcolor;
    context.stroke();
}

function draw_text(x, y, num){
	context.fillStyle = 'black';
	context.font = "30px Arial";
	context.fillText(num.toString(), x - 10, y + 10);
}