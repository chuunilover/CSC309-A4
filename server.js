var mongoose = require('mongoose');
var express = require('express');
var app = express();

app.use(express.static(__dirname));

/*
By default, / should return the login page.
*/
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/login.html");
});

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

app.get('/search/:query', function(req, res) {
	var query = req.params.query;
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

//check if user exists


app.listen(3000);


var RestaurantSchema = mongoose.Schema({
	name: String,
	Location: String,
	Description: String,
	tags: String,
	Hours: String,
	restaurantid: Number
});

var UserSchema = mongoose.Schema({
	username: String,
	name: String,
	email: String,
	password: String
});

var Restaurant = mongoose.model('Restaurants', RestaurantSchema);
var User = mongoose.model('Users', UserSchema);