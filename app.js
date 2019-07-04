//DEC
var express 		= require('express');
var ejs 			= require('ejs');
var bodyParser 		= require('body-parser');
var expressSession 	= require('express-session');
var cookieParser 	= require('cookie-parser');
var login 			= require('./controllers/login');
var logout 			= require('./controllers/logout');
var home 			= require('./controllers/home');
var app 			= express();


//CONFIG
app.set('view engine', 'ejs');



//MIDDLEWARE
app.use(bodyParser.urlencoded({'extended': false}));
app.use(expressSession({secret: 'my top secret password', saveUninitialized: true, resave: false}));
app.use(cookieParser());

//Middleware for CSS/Images/Js

app.use('/assets', express.static('assets'));


app.use('/login', login);
app.use('/logout', logout);
app.use('/home', home);



//ROUTING
app.get('/', function(req, res){
	res.render('pages/index');
});


app.get('/setcookie', function(req, res){
	res.cookie('my_cookie', 'sdhdgshjdbahdbahjsdbshbd');
	res.send('done!');
});

app.get('/viewcookie', function(req, res){
	
	res.send(req.cookies['my_cookie']);
});


app.get('/rmcookie', function(req, res){
	res.clearCookie('my_cookie');
	res.send('removed!');
});



//SERVER STARTUP
app.listen(3000, function(){
	console.log('Server started at 3000....');
})


