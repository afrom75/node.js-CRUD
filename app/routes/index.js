var express = require('express');
var router = express.Router();
var users = require('../controllers/Users');
/* GET home page. */

/* POST Création d'un nouvel utilisateur */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'S\'inscrire' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Se connecter' });
});

router.post('/signin', users.signIn);

module.exports = router;
