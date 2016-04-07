var mongoose = require('mongoose');
var express = require('express');
var Cookie = require('cookies');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect');
var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');
var app = express();
var passport = require('passport');
var ObjectID = require('mongodb').ObjectID;
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./facebook');
var mongo = require('mongodb');

app.use(bodyParser()); 
app.use(passport.initialize());

app.use(express.static(__dirname));
app.use(cookieParser());


/**********************************************************************************
ALL GET REQUESTS ARE PROCESSED BELOW.
**********************************************************************************/

// passport.use('local-login', new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
// 	  	cookies.set("userID", users._id.toString(), {signed: true, httpOnly: false})
//       return done(null, user);
//     });
//   }
// ));

// passport.use('local-signup', new LocalStrategy(
// 	function(username, password, done) {
// 		User.findOne({ username: username }, function (err, user) {
// 			if (err) { return done(err); }
// 			// does the user exist already?
// 			if (user) { return done(null, false); }
// 			// user does not exist, create new user
// 			else {
// 				var newUser = new User();
// 				//set local credentials
// 				newUser.username = username;
// 				newUser.password = newUser.generateHash(password);
// 				//save the user
// 				newUser.save(function(err) {
// 					if (err) {
// 						throw err;
// 					}
// 					return done (null, newUser);
// 				});
// 			}
// 		});
// 	}));

// // serializes user
// passport.serializeUser(function(user, done) {
//         done(null, user.id);
// });

// // deserializes user
// passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//             done(err, user);
// });

// passport.use(new FacebookStrategy({ // idea gained from https://scotch.io/tutorials/easy-node-authentication-facebook
// 	// data from our file
// 	appID: configAuth.facebookAuth.appID,
// 	appSecret: configAuth.facebookAuth.appSecret,
// 	callbackUrl: configAuth.facebookAuth.callbackUrl

// },
// 	// facebook sends profile and token
// 	function(token, refreshToken, profile, done) {
// 		User.findOne
// 	}
// ));

app.post('/', function(req, res){
	console.log(req.body);
});

app.post('/reviewRestaurant', function(req, res){
	var userID = mongoose.mongo.ObjectID(req.cookies.userID);
	User.findOne({_id: userID}, function(err, user){
		if(err){
			return handleError(err);
		}
		if (user == null){
			res.send("Please log in to review a restaurant.");
		}
		else{
		/*	text: String,
	author: String,
	name: String,
	restaurant: String
	rating: number*/
			var query = JSON.parse(req.body.json);
			var name = user.name;
			var username = user.username;
			var restID = query.restID;
			var text = query.reviewText;
			var rating = parseInt(query.rating);
			Reservation.count({user: req.cookies.userID, restaurant: restID}, function(err, count){
				if (err){
					return handleError(err);
				}
				if(count == 0){
					res.send("Sorry, you must have reserved a table at and eaten at this restaurant in order to write a review.");	
				}
				else{
					var reviewData = {
						text: text,
						author: username,
						name: name,
						restaurant: restID,
						rating: rating
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
		}
	});
});

app.post('/createRestaurant', function(req, res){
	var userID = mongoose.mongo.ObjectID(req.cookies.userID);
	User.findOne({_id: userID}, function(err, user){
		if(err){
			return handleError(err);
		}
		if (user == null){
			res.send("Please log in to create a restaurant.");
		}
		else{
			var query = JSON.parse(req.body.json);
			var name = query.name;
			var location = query.location;
			var description = query.description;
			var tags = query.tags;
			var hours = query.hours;
			var restaurantData = {
				"name": name,
				"location": location,
				"description": description,
				"tags": tags,
				"hours": hours,
				"seats": [4, 14, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,4 ]
			};

			console.log("added a restaurant...");
			
			var newRestaurant = new Restaurant(restaurantData);
			newRestaurant.save(function(error, data){
				if(error){
					console.log("Failed to make restaurant");
					res.send("Error creating new restaurant");
				}
				else{
					var adminData = {
						restaurant_id: data._id.toString(),
						owner: req.cookies.userID
					}
					var newAdmin = new Admin(adminData);
					newAdmin.save(function(error, data){
						if (error){
							console.log(error);
						}
					});
					console.log("Created new restaurant!")
					res.send("Restaurant logged!");
				}
			});
			}
	});
});

app.post('/updateUser', function(req, res){
	var userID = mongoose.mongo.ObjectID(req.cookies.userID);
	User.findOne({_id: userID}, function(err, user){
		if(err){
			return handleError(err);
		}
		if (user == null){
			res.send("Please log in.");
		}
		else{
			var query = JSON.parse(req.body.json);
			var name = query.name;
			var email = query.email;
			console.log("Attempting to update user info...");
			if(name == "" || name == null){
				User.findOneAndUpdate({_id: userID}, {email: email}, function(err, user){
					if(err) {
						return handleError(err);
					}
				});
			}
			else if(email == "" || email == null){
				User.findOneAndUpdate({_id: userID}, {name: name}, function(err, user){
					if(err) {
						return handleError(err);
					}
				});
			}
			else{
				User.findOneAndUpdate({_id: userID}, {name: name, email: email}, function(err, user){
					if(err) {
						return handleError(err);
					}
				});
			}
			res.send("Successfully updated profile!");
		}
	});
});

app.post('/getManagedRestaurants', function(req, res){
	var userID = mongoose.mongo.ObjectID(req.cookies.userID);
	User.findOne({_id: userID}, function(err, user){
		if(err){
			return handleError(err);
		}
		if (user == null){
			res.send("Please log in to create a restaurant.");
		}
		else{
			Admin.find({owner: req.cookies.userID}, function(err, restaurants){
				if(err){
					return handleError(err);
				}
				if(restaurants.length == 0){
					res.send("[]");
					return;
				}
				else{
					res.write("[")
					var numRestsDone = 0;
					for (var r in restaurants){
						Restaurant.findOne({_id: ObjectID(restaurants[r].restaurant_id)}, function(err, rest){
							if(err){
								numRestsDone++;
								return handleError(err);
							}
							if(rest != null){
								res.write(JSON.stringify(rest));
							}
							numRestsDone++;
							if(numRestsDone == restaurants.length){
								res.write("]");
								res.end("");
							}
							else{
								res.write(",");
							}
						});
					}
				}
			});
		}
	});
});

app.post('/getreservations', function(req, res){
	var query = JSON.parse(req.body.json);
	var restID = query.restaurantid;
	var time = parseInt(query.time);
	Admin.findOne({owner: req.cookies.userID, restaurant_id: restID}, function(err, rest){
		if(err){
			return handleError(err);
		}
		if(rest == null){
			res.send("You do not have permissions to edit this restaurant.");
			return;
		}
		if (req.cookies.userID == null){
			res.send("Please log in.");
			return;
		}
		Reservation.find({restaurant: restID, time: {"$gte": time, "$lt": time + 86400000}}, function(err, reservations){
			if(err){
				return handleError(err);
			}
			res.send(JSON.stringify(reservations));
		});
	});
});

app.post('/addAdmin', function(req, res){
	var query = JSON.parse(req.body.json);
	var adminID = query.id;
	var restID = query.restID;
	Admin.findOne({owner: req.cookies.userID, restaurant_id: restID}, function(err, rest){
		if(err){
			return handleError(err);
		}
		if(rest == null){
			res.send("You do not have permissions to edit this restaurant.");
			return;
		}
		if (req.cookies.userID == null){
			res.send("Please log in.");
			return;
		}
		Restaurant.findOne({_id: ObjectID(query.restaurantID)}, 
				function(err, restaurant){
			if(err){
				return handleError(err);
			}
			User.findOne({username: adminID}, function(err, user){
				if(err){
					return handleError(err);
				}
				if(user == null){
					res.send("User does not exist.");
				}
				var newAdmininfo = {restaurant_id: restID,
					owner: user._id
				}
				newAdmin = new Admin(newAdmininfo);
				newAdmin.save(function(error, data){
					if (error){
						console.log(error);
					}
					res.send("Added admin!");
				});
			});
		});
	});
});

app.post('/updateRestaurant', function(req, res){
	var query = JSON.parse(req.body.json);
	var name = query.name;
	var location = query.location;
	var description = query.description;
	var tags = query.tags;
	var hours = query.hours;
	var restID = query.restaurantID;
	Admin.findOne({owner: req.cookies.userID, restaurant_id: restID}, function(err, rest){
		if(err){
			return handleError(err);
		}
		if(rest == null){
			res.send("You do not have permissions to edit this restaurant.");
			return;
		}
		if (req.cookies.userID == null){
			res.send("Please log in.");
			return;
		}
		Restaurant.findOneAndUpdate({_id: ObjectID(query.restaurantID)}, 
			{name: name, location: location, description: description, tags: tags, hours: hours}, 
				function(err, restaurant){
			if(err){
				return handleError(err);
			}
			res.send("Successfully updated restaurant info!");
		});
	});
});

app.post('/getMyReservations', function(req, res){
	User.findOne({_id: ObjectID(req.cookies.userID)}, function(err, user){
		if(err){
			return handleError(err);
		}
		if(user == null){
			res.send("You do not have permissions to edit this restaurant.");
			return;
		}
		Reservation.find({user: req.cookies.userID, time: {"$gte": new Date().getTime()}}, function(err, reservations){
			if(err){
				return handleError(err);
			}
			res.send(JSON.stringify(reservations));
		});
	});
});

//By default, / should return the login page. If logged in, profile page is returned.
app.get('/', function(req, res) {
	var userID = mongoose.mongo.ObjectID(req.cookies.userID);
	User.findOne({_id: userID}, function(err, user){
		if(err){
			return handleError(err);
		}
		if (user == null){
			res.sendFile(__dirname + "/login.html");
		}
		else{
			res.sendFile(__dirname + "/profile.html");
		}
	});
});
//By default, / should return the login page. If logged in, profile page is returned.
// app.get('/', function (req, res) {
// 	res.sendFile(__dirname + "/login.html");
// });

// app.get('/login', function (req, res) {
// 	res.sendFile(__dirname + "/login.html");
// });

// // /* Need this for passport.use local-login to work, need to work in the /login route*/
// app.post('/login', passport.authenticate('local-login', {
// 	successRedirect: '/profile.html', // goes to profile page on success
// 	failureRedirect: '/login.html', // not correct, enter info again
// }));

// app.get('/signup', function (req, res) {
// 	res.sendFile(__dirname + "/signup.html");
// });

// // /* Need this for passport.use local-signup to work, need to work in the /signup route*/
// app.post('/signup', passport.authenticate('local-login', {
// 	successRedirect: '/profile.html', // goes to profile page on success
// 	failureRedirect: '/signup.html', // not correct, enter info again
// }));

//Return login.html if not logged in, else return profile page.
app.get('/login.html', function(req, res){
	console.log("login")
	var userID = mongoose.mongo.ObjectID(req.cookies.userID);
	User.findOne({_id: userID}, function(err, user){
		if(err){
			return handleError(err);
		}
		if (user == null){
			res.sendFile(__dirname + "/login.html");
		}
		else{
			res.sendFile(__dirname + "/profile.html");
		}
	});
});

//Return signup if not logged in else return profile page.
app.get('/signup.html', function(req, res){
	console.log("signup");
	var userID = mongoose.mongo.ObjectID(req.cookies.userID);
	User.findOne({_id: userID}, function(err, user){
		if(err){
			return handleError(err);
		}
		if (user == null){
			res.sendFile(__dirname + "/signup.html");
		}
		else{
			res.sendFile(__dirname + "/profile.html");
		}
	});
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
			newUser.password = newUser.generateHash(password);
			console.log(newUser.password);
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

// //login request
app.get('/login/:username/:password', function(req, res) {
	var username = req.params.username;
	var password = req.params.password;
	console.log("Logging into account '" + username + "' with password '" + password + "'");
	User.findOne({ 'username': username }, 'username password', function (err, users) {
		if (err){
			return handleError(err);
		}
		else if (users === null || !users.validPassword(password)){
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
/*
app.get('/restaurants/add/:name/:location/:description/:tags/:hours', function(req, res){
	if (req.cookies.userID == null){
		res.send("Please log in.")
		return;
	}
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
		"seats": [4, 14, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,4 ]
	};

	console.log("added a restaurant...");
	
	var newRestaurant = new Restaurant(restaurantData);
	newRestaurant.save(function(error, data){
		if(error){
			console.log("Failed to make restaurant");
			res.send("Error creating new restaurant");
		}
		else{
			var adminData = {
				restaurant_id: data._id.toString(),
				user: req.cookies.userID
			}
			var newAdmin = new Admin(adminData);
			newAdmin.save(function(error, data){
				if (error){
					console.log(error);
				}
			});
			console.log("Created new restaurant!")
			res.send("Restaurant logged!");
		}
	});
});*/

//Check which seats are free at this time and restaurant.
app.get('/restaurant/seatinfo/:restaurantID/:time', function(req, res){
	var time = new Date(parseInt(req.params.time));
	var restaurantID = mongoose.mongo.ObjectID(req.params.restaurantID);
	Reservation.find({restaurant: req.params.restaurantID, time: {"$gt": parseInt(req.params.time) - 1000*60*90, "$lt": parseInt(req.params.time) + 1000*60*90}}, 'seatID time', function (err, rest) {
		if (err){
			//return handleError(err);
			res.send(err);
			return;
		}
		var seatsFree = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
		for (i = 0; i < rest.length; i++){
			//var timeDif = Math.abs(rest[i].time.getTime() - parseInt(req.params.time));
			//if(timeDif < (1000*60*90)){
				var idxToRemove = getIndexOf(seatsFree, rest[i].seatID);
				if(idxToRemove != -1){
					seatsFree.splice(idxToRemove, 1);
				}
			//}
		}
		res.send(seatsFree.toString());
	});
});

//Reserve a seat.
app.get('/restaurant/reserve/:restaurantID/:seatID/:time', function(req, res){
	if (req.cookies.userID == null){
		res.send("Please log in.")
		return;
	}
	var newdate = new Date(parseInt(req.params.time))
	var reservationData = {
		"restaurant": req.params.restaurantID,
		"seatID": req.params.seatID,
		"user": req.cookies.userID,
		"time": new Date(parseInt(req.params.time))
		//_id: new ObjectID()
	};

	var newReservation = new Reservation(reservationData);
	
	Reservation.findOne({restaurant: req.params.restaurantID, seatID: req.params.seatID, time: {"$gt": parseInt(req.params.time) - 1000*60*90, "$lt": parseInt(req.params.time) + 1000*60*90}}, 'seatID time', function (err, reservation) {
		if (err){
			//return handleError(err);
			res.send(err);
			return;
		}
		if(reservation == null){
			newReservation.save(function(error, data){
				if(error){
					res.send("Error creating new reservation.");
				}
				else{
					res.send("Reservation created!");
				}
			});
		}
		else{
			res.send("Sorry, this seat has been taken.");
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
app.get('/user/:username', function(req, res){
	console.log("getting user " + req.params.userID);
	User.findOne({'username': req.params.username}, 'username name', function (err, user) {
		if (err){
			return handleError(err);
		}
		else if (user == null){
			console.log("No such user.");
			res.send("No such user.");
			return;
		}
		else{
			res.send(JSON.stringify({name: user.name, username: user.username}));
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
			console.log(reviews[i]);
		}
		res.send(result.toString());
	});
});

app.get('/reviews/add/:text/:name/:restaurant', function(req, res) {

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
	User.findOne({_id: userID}, "name email", function(err, user){
		if(err){
			return handleError(err);
		}
		if (user == null){
			res.send("No user found.");
		}
		else{
			res.send(JSON.stringify({name: user.name, email: user.email}));
		}
	})
});

app.get('/restaurantinfo/:restaurantID', function(req, res){
	Restaurant.findOne({_id: ObjectID(req.params.restaurantID)}, function(err, restaurant){
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

app.get('/restaurants/seats/:restaurantID', function(req, res){
	Restaurant.findOne({_id: ObjectID(req.params.restaurantID)}, function(err, restaurant){
		if(err){
			return handleError(err);
		}
		if(restaurant == null){
			res.send("Restaurant not found.");
		}
		else{
			res.send(restaurant.seats.toString());
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

// generates a hash for the password for userSchema, idea from https://www.npmjs.com/package/bcryptjs
UserSchema.methods.generateHash = function(password) {
	console.log("password encrypted");
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check that password is valid, idea from https://www.npmjs.com/package/bcryptjs
UserSchema.methods.validPassword = function(password) {
	console.log("validating password");
	return bcrypt.compareSync(password, this.password);
};

var RestaurantManagerPerms = mongoose.Schema({
	restaurant_id: String,
	owner: String
});

var ReviewSchema = mongoose.Schema({
	text: String,
	author: String,
	name: String,
	restaurant: String,
	rating: Number
});

var ReservationSchema = mongoose.Schema({
	//restaurantID
	restaurant: String,
	seatID: Number,
	user: String,
	time: Date
});

/*Facebook authentication*/

var Restaurant = mongoose.model('Restaurants', RestaurantSchema);
var User = mongoose.model('Users', UserSchema);
var Review = mongoose.model('Reviews', ReviewSchema);
var Reservation = mongoose.model('Reservations', ReservationSchema);
var Admin = mongoose.model('Admins', RestaurantManagerPerms);


//check if user exists

app.listen(3000);