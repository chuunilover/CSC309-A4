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
	console.log('Searching for ' + username);
	
	User.count({ 'username': username }, function (err, count) {
		if (err) {
			console.log("Error retrieving user!");
			res.send("Error");
			return handleError(err);
		}
		if(count > 0) {
			console.log('User exists.');
			res.send("True");
		}
		else{
			console.log('User does not exist. Creating new account.');
			res.send("False");
		}
	})
	
});	

app.get('/login/:username/:password', function(req, res) {
	var username = req.params.username;
	var name = req.params.name;
	var password = req.params.password;
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