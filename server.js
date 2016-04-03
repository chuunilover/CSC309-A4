var mongoose = require('mongoose');
var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname));

/**********************************************************************************
ALL GET REQUESTS ARE PROCESSED BELOW.
**********************************************************************************/

/*
By default, / should return the login page.
*/
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/login.html");
});

//Experimenting with post..
app.post('/search', function(req, res){
	console.log(req.query);
})

/*
Check if username is taken, if true return error else add entry to users database.
*/
app.get('/signup/:username/:name/:email/:password', function(req, res) {
	var username = req.params.username;
	var name = req.params.name;
	var password = req.params.password;
	var email = req.params.email;
	console.log('Searching for ' + email);
	User.count({ 'username': username }, function (err, count) {
		if (err) {
			console.log("Error retrieving user!");
			res.send("Error");
			return handleError(err);
		}
		if(count > 0) {
			console.log('Email exists.');
			res.send("That username is already associated with an account!");
		}
		else{
			console.log('User does not exist. Creating new account.');
			var userData = {
				"username": username,
				"name": name,
				"password": password,
				"email": email
				//_id: new ObjectID()
			};

			var newUser = new User(userData);
			newUser.save(function(error, data){
				if(error){
					res.send("Error creating new user");
				}
				else{
					res.send("User created!");
				}
			});
			//res.send("User created!");
		}
	})
});

//login request
app.get('/login/:username/:password', function(req, res) {
	var username = req.params.username;
	var password = req.params.password;
	console.log("Logging into account '" + username + "' with password '" + password + "'");
	User.findOne({ 'username': username }, 'username password', function (err, users) {
		if (err){
			return handleError(err);
		}
		else if (users === null || users.password != password){
			console.log("Rejected login credentials.");
			res.send("You inputted invalid login credentials.");
			return;
		}
		else{
			res.send("Welcome, " + username);
		}
	})
});

/*
app.get('/review/:text/:username/:restID', function(req, res) {
	var tags = req.params.keywords.split(/\s/);
	for(i = 0; i < tags.length; i++){
		console.log(tags[i]);
	}
	var restaurantList = [];
	Restaurant.find({}, 'name tags', function (err, rest) {
		if (err){
			return handleError(err);
		}
		for (i = 0; i < rest.length; i++){
			var tag_list = rest[i].tags.split(/\s/);
			if(rest[i].name == req.params.keywords || getTags(tags, tag_list)){
				console.log(rest[i].name);
				console.log(JSON.stringify(tag_list));
			}
		}
	})
});*/

//Search for restaurant with name = keywords, or contains matching tags.
app.get('/search/:keywords', function(req, res) {
	var tags = req.params.keywords.split(/\s/);
	console.log("Searching for " + req.params.keywords + "...");
	var restaurantList = [];
	Restaurant.find({}, 'name location description tags hours seats', function (err, rest) {
		if (err){
			return handleError(err);
		}
		var results = [];
		for (i = 0; i < rest.length; i++){
			var tag_list = rest[i].tags.split(/\s/);
			if(rest[i].name == req.params.keywords || getTags(tags, tag_list)){
				results.push(JSON.stringify(rest[i]));
			}
		}
		console.log(results.toString())
		res.send(results.toString())
	})
});


function getTags(searchQuery, tagList){
	for (var idx in searchQuery){
		for (var ind in tagList){
			if (tagList[ind] == searchQuery[idx]){
				return true;
			}
		}
	}
	return false;
}

//localhost:3000/restaurants/add/yum/home/swagger/food/never
app.get('/restaurants/add/:name/:location/:description/:tags/:hours', function(req, res){
	var name = req.params.name;
	var location = req.params.location;
	var description = req.params.description;
	var tags = req.params.tags;
	var hours = req.params.hours;
	var restaurantData = {
		"name": name,
		"location": location,
		"description": description,
		"tags": tags,
		"hours": hours,
		"seats": [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,4 ]
	};

	console.log("added a restaurant...");
	
	var newRestaurant = new Restaurant(restaurantData);
	newRestaurant.save(function(error, data){
		if(error){
			console.log("Failed to make restaurant");
			res.send("Error creating new restaurant");
		}
		else{
			console.log("Created new restaurant!")
			res.send("Restaurant logged!");
		}
	});
});

app.get('/restaurant/seatinfo/:restaurantID/:time', function(req, res){
	var time = new Date(parseInt(req.params.time));
	var restaurantID = mongoose.mongo.ObjectID(req.params.restaurantID);
	console.log(time);
	Reservation.find({_id: restaurantID}, 'seatID time', function (err, rest) {
		if (err){
			//return handleError(err);
			res.send(err);
			return;
		}
		var seatsFree = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
		for (i = 0; i < rest.length; i++){
			var timeDif = abs(rest[i].time - time);
			if(timeDif < (1000*60*90)){
				var idxToRemove = getIndexOf(seatsFree, i.seatID);
				if(idxToRemove != -1){
					array.splice(idx_to_remove, 1);
				}
			}
		}
		res.send(seatsFree.toString());
	});
});

app.get('/restaurant/reserve/:restaurantID/:seatID/:time', function(req, res){
	var reservationData = {
		"restaurantID": mongoose.mongo.ObjectID(req.params.restaurantID),
		"seatID": parseInt(req.params.seatID),
		"time": new Date(parseInt(time))
		//_id: new ObjectID()
	};

	var newReservation = new Reservation(reservationData);
	newUser.save(function(error, data){
		if(error){
			res.send("Error creating new user");
		}
		else{
			res.send("User created!");
		}
	});
});

function getIndexOf(array, value){
	for (var i in value){
		if (array[i] == value){
			return i;
		}
	}
	return -1;
}

/*
app.get('/reserve/:time/:seatID/:restaurantID', function(req, res){
	//var time = 
	var seatID = 
}
*/

app.get('/addAdmin/:admin/:restID', function(req, res){
	var adminUsername = req.params.admin;
	var restaurantID = req.params.restID;
});

app.get('/user/:userID', function(req, res){
	console.log("getting user " + req.params.userID);
	User.findOne({ '_id': mongoose.mongo.ObjectID(req.params.userID)}, 'username password', function (err, user) {
		if (err){
			return handleError(err);
		}
		else if (user === null || users.password != password){
			console.log("No such user.");
			res.send("No such user.");
			return;
		}
		else{
			res.send(JSON.stringify(user));
		}
	})
});

//To connect to MongoDB's  database
mongoose.connect('mongodb://localhost', {
  user: '',
  pass: ''
});

//check the status of this connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Connected to MongoDB');
})

//Database schemae
var RestaurantSchema = mongoose.Schema({
	name: String,
	location: String,
	description: String,
	tags: String,
	hours: String,
	//The seats are uniquely id'd by their position in the array.
	//The number of people that this particular seat can accomodate is stored in the array.
	seats: [Number],
});

var UserSchema = mongoose.Schema({
	username: String,
	name: String,
	email: String,
	password: String
});

var RestaurantManagerPerms = mongoose.Schema({
	restaurant_id: Number,
	owner: String
});

var ReviewSchema = mongoose.Schema({
	text: String,
	author: String,
	name: String,
	restaurant: Number
});

var ReservationSchema = mongoose.Schema({
	restaurant: Number,
	seatID: Number,
	time: Date
});

var Restaurant = mongoose.model('Restaurants', RestaurantSchema);
var User = mongoose.model('Users', UserSchema);
var Review = mongoose.model('Reviews', ReviewSchema);
var Reservation = mongoose.model('Reservations', ReservationSchema);


//check if user exists

app.listen(3000);