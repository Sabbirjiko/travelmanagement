var express = require('express');
var user = require.main.require('./models/user-model');
var router = express.Router();


router.get('/', function(req, res){

	if(req.session.un != null){
		
		res.render('pages/home/index');

	}else{
		res.redirect('/login');
	}
});

router.get('/home', function(req, res){
		
		res.render('pages/home/index');
});

router.get('/user_list', function(req, res){

	user.getAll(function(results){

		if(results != null){
			res.render('pages/home/userList', {userList: results});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

router.get('/add_user', function(req, res){

	user.getAll(function(results){

		if(results != null){
			res.render('pages/home/add_user');			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

router.post('/add_user', function(req, res){
	
	var data = {
		username: req.body.username,
		password: req.body.password,	
		email: req.body.email,	
	}
	user.create(data, function(status){

		if(status){
			res.redirect('/home/user_list');			
		}else{
			res.send('Error!.. hoy nai...');
		}

	});
});

router.get('/edit/:id', function(req, res){

	user.getById(req.params.id, function(result){

		if(result != null){
			res.render('pages/home/edit', {user: result[0]});			
		}else{
			res.send('Error!.. try again...');
		}
	});
});

router.post('/edit/:id', function(req, res){
	
	var data = {
		username: req.body.uname,
		password: req.body.password,
		email: req.body.email,
		id: req.params.id
	}
	user.update(data, function(status){

		if(status){
			res.redirect('/home/user_list');			
		}else{
			res.redirect('/home/edit/'+req.params.id);
		}

	});
});


router.get('/delete/:id', function(req, res){
	user.delete(req.params.id, function(status){

		if(status){
			res.redirect('/home/user_list');			
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
});



module.exports = router;