var mongoose = require('mongoose');
var express = require('express');
var Cookie = require('cookies');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var connect = require('connect')
var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

app.use(bodyParser()); 
app.use(passport.initialize());

app.use(express.static(__dirname));
app.use(cookieParser());

/**********************************************************************************
ALL GET REQUESTS ARE PROCESSED BELOW.
**********************************************************************************/

passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
	  	cookies.set("userID", users._id.toString(), {signed: true, httpOnly: false})
      return done(null, user);
    });
  }
));

app.post('/', function(req, res){
	console.log(req.body);
});

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
			var cookies = new Cookie(req, res, {keys: ["lolololol"]});
			cookies.set("userID", users._id.toString(), {signed: true, httpOnly: false})
			
			res.send("Welcome, " + username);
		}
	})
});

/* Need this for passport.use local-login to work, need to work in the /login route*/
app.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile', // goes to profile page on success
	failureRedirect: '/login', // not correct, enter info again
}));


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

//Check which seats are free at this time and restaurant.
app.get('/restaurant/seatinfo/:restaurantID/:time', function(req, res){
	var time = new Date(parseInt(req.params.time));
	var restaurantID = mongoose.mongo.ObjectID(req.params.restaurantID);
	console.log(req.params.restaurantID);
	Reservation.find({restaurant: req.params.restaurantID}, 'seatID time', function (err, rest) {
		if (err){
			//return handleError(err);
			res.send(err);
			return;
		}
		var seatsFree = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
		for (i = 0; i < rest.length; i++){
			var timeDif = Math.abs(rest[i].time.getMilliseconds() - time);
			console.log(timeDif);
			if(timeDif < (1000*60*90)){
				var idxToRemove = getIndexOf(seatsFree, rest[i].seatID);
				if(idxToRemove != -1){
					seatsFree.splice(idxToRemove, 1);
				}
			}
		}
		res.send(seatsFree.toString());
	});
});

//Reserve a seat.
app.get('/restaurant/reserve/:restaurantID/:seatID/:time/:user', function(req, res){
	var reservationData = {
		"restaurant": req.params.restaurantID,
		"seatID": req.params.seatID,
		"user": req.params.user,
		"time": new Date(parseInt(req.params.time))
		//_id: new ObjectID()
	};

	var newReservation = new Reservation(reservationData);
	newReservation.save(function(error, data){
		if(error){
			res.send("Error creating new reservation.");
		}
		else{
			res.send("Reservation created!");
		}
	});
});

function getIndexOf(array, value){
	for (var i in array){
		if (array[i] == value){
			return i;
		}
	}
	return -1;
}

//Add admin to restaurant.
app.get('/addAdmin/:admin/:restID', function(req, res){
	var adminUsername = req.params.admin;
	var restaurantID = req.params.restID;
});

//Get profile details.
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

//Get review for a restaurant.
app.get('/reviews/:restaurantID', function(req, res) {
	Review.find({restaurant: req.params.restaurantID}, function(err, reviews){
		if (err){
			return handleError(err);
		}
		var result = []
		for (var i in reviews){
			result.push(JSON.stringify(reviews[i]));
		}
		res.send(result.toString());
	});
});

app.get('/reviews/add/:text/:author/:name/:restaurant', function(req, res) {
	Reservation.count({user: req.params.author, restaurant: req.params.restaurant}, function(err, count){
		if (err){
			return handleError(err);
		}
		if(count == 0){
			res.send("Sorry, you must have reserved a table at and eaten at this restaurant in order to write a review.");	
		}
		else{
			var reviewData = {
				text: req.params.text,
				author: req.params.author,
				name: req.params.name,
				restaurant: req.params.restaurant
			};
			var newReview = new Review(reviewData);
			newReview.save(function(error, data){
				if(error){
					res.send("Error submitting review.");
				}
				else{
					res.send("Your review has been published!");
				}
			});
		}
	});
});

app.get('/checkUser', function(req, res){
	var userID = mongoose.mongo.ObjectID(req.cookies.userID);
	User.findOne({_id: userID}, function(err, user){
		if(err){
			return handleError(err);
		}
		if (user == null){
			res.send("No user found.");
		}
		else{
			res.send(JSON.stringify(user));
		}
	})
});

app.get('/restaurantinfo/:restaurantID', function(req, res){
	var restaruantID = mongoose.mongo.ObjectID(req.params.restaruantID);
	Restaurant.findOne({_id: restaruantID}, function(err, restaurant){
		if(err){
			return handleError(err);
		}
		if(restaurant == null){
			res.send("Restaurant not found.");
		}
		else{
			res.send(JSON.stringify(restaurant));
		}
	});
});

app.get('/users/update/:name/:email', function(req, res){
	var userID = mongoose.mongo.ObjectID(req.cookies.userID);
	console.log("Attempting to update user info...");
	User.findOneAndUpdate({_id: userID}, {name: req.params.name, email: req.params.email}, function(err, user){
		if(err) {
			return handleError(err);
		}
		if(user == null){
			res.send("You aren't logged in.");
		}
		else{
			res.send("info updated!");
		}
	});
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
	//The number of people that this particular seat can accommodate is stored in the array.
	seats: [Number],
});


var UserSchema = mongoose.Schema({
	username: String,
	name: String,
	email: String,
	password: String
});

// generates a hash for the password for userSchema
UserSchema.methods.generateHash = function(password) {
	console.log("password encrypted");
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check that password is valid
UserSchema.methods.validPassword = function(password) {
	console.log("validating password");
	return bcrypt.compareSync(password, this.password);
};

var RestaurantManagerPerms = mongoose.Schema({
	restaurant_id: Number,
	owner: String
});

var ReviewSchema = mongoose.Schema({
	text: String,
	author: String,
	name: String,
	restaurant: String
});

var ReservationSchema = mongoose.Schema({
	restaurant: String,
	seatID: Number,
	user: String,
	time: Date
});

var Restaurant = mongoose.model('Restaurants', RestaurantSchema);
var User = mongoose.model('Users', UserSchema);
var Review = mongoose.model('Reviews', ReviewSchema);
var Reservation = mongoose.model('Reservations', ReservationSchema);


//check if user exists

app.listen(3000);