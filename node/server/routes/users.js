 express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('lodash');
//DATA
var users = [];

// =============================================================================
var router = express.Router();
//
// middleware Pour le set des headers générique
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// ==AJOUT utilisateur===========================================================================
router.route('/')
  // add a user (accessed at POST http://localhost:8080/api/users)
  .post(function(req, res) {
      var user =  {};
      user.mail = req.body.mail;
      user.adress = req.body.adress;
      users.push(user);
      res.json(user);
  })

  //Get all users
  .get(function(req,res){
    // res.setHeader('Content-Type', 'application/json');
    res.json(users);
  });


// ==Récuperation utilisateur ===========================================================================

// Gestion erreur user not found /users/:mail/
router.use('/:mail', function(req, res, next) {
  var mail = req.params.mail;
    var user = _.find(users, ['mail', mail]);

    if( !user ){
      console.log("User not found");
      res.status(404).send("User not Found");
    } else{
      next();
    }

});


// Récuperation de l'utilisateur par son email
router.route('/:mail')
  .get(function(req, res) {

        var critereMail = req.params.mail;
        //Find User
        var user = _.find(users, ['mail', critereMail]);
        res.json(user);
  });


// Récuperation de l'adresse par le mail de l'utilisateur
router.route('/:mail/adress')
  .get(function(req, res) {
        //Find Users
        var critereMail = req.params.mail;
        var user = _.find(users, ['mail', critereMail]);
        res.json(user.adress);
  });

module.exports = router;
