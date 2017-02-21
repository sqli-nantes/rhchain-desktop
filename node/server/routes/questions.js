var express = require('express');
var path = require('path');
var jsonfile = require('jsonfile')
var _ = require('lodash');

var ressources = jsonfile.readFileSync('server/questions.json');

//Variable Globales
var questions = ressources.questions;

// =============================================================================
var router = express.Router();

router.route('/')
  .get(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    if( !questions ){
      res.status(404).send("Questions not Found");
    }
    res.json(questions);
  });


router.route('/:id')
  .get(function(req, res) {
    var id = parseInt(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    var question = _.find(questions, {'id' : id});
    if( !question ){
      res.status(404).send("Question not Found");
    }
    res.json(question);
  });

module.exports = router;
