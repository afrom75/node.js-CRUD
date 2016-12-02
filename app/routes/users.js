var express = require('express');
var router = express.Router();

var users = require('../controllers/Users'); // Nous allons récuperer notre controlleur fait précédement



router.post('/subscribe', users.createPost);

router.get('/subscribe', users.createGet);

/* POST Création d'une nouvelle connexion */
router.post('/create', users.createUser);

/* POST Création d'un nouvelle connexion */
router.get('/create', function(req, res) {
    res.redirect('/');
});

/* PUT Modification d'un utilisateur */
router.get('/edit/:id', users.getUser);

/* PUT Modification d'un utilisateur */
router.post('/edit/:id', users.update);

router.get('/logout', function(req, res){
    req.session.destroy(function (err){
        res.redirect('/signin');
    });
})

/* DELETE Suppression d'un utilisateur */
router.get('/delete/:id', users.delete);

/* Voir un utilosateur */
router.get('/:id([0-9a-f]+)', users.getUserView);

/* GET Récupère la liste des utilisateurs */
router.get('^/$', users.index);

module.exports = router;