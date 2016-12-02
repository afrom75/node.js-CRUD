require('../model2/user');

var mongoose = require('mongoose'),
User = mongoose.model('Users');

var Users = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
    index: function(req, res){
        User.find({}, function(err, users) {
            if (err) throw err;
            res.render('users/index', {users:users});
        })
    },
    signIn: function (req, res){
        if(req.body.password && req.body.email){
            User.findOne({password: req.body.password, email: req.body.email}, function(err, userFound){
                if(userFound){
                    req.session.user = userFound;
                    delete req.session.user.password;
                    res.redirect('/users');
                }else{
                    res.redirect('/signin');
                }
            })

        }else{
            res.redirect('/signin');
        }
    },
    createUser: function (req, res) {
        User.findOne({'email':req.body.email}, function(err, newUser) {
            if(!newUser) {
                if (req.body.password && req.body.confirmPassword && req.body.password === req.body.confirmPassword) {
                    var newUser = User({email: req.body.email, password: req.body.password});
                    newUser.save(function (err) {
                        req.session.email = newUser.email;
                        res.redirect('/users');
                    });
                }
                else {
                    res.render('index', {message: 'Vous n\'avez pas saisie deux password identiques'});
                }
            }else{
                res.render('index', {message: 'L\'adresse mail existe déjà'});
            }
        })
    },
    /*createUser: function (req, res) {
        if (req.body.email) {
            res.render('/users/index', {message: 'L\'adresse mail existe déjà'});
        }
    },
*/
    createPost: function (req, res) {
        var newUser = User({firstname: req.body.firstname, name: req.body.name, age:req.body.age, email: req.body.email, ville: req.body.ville} );
        newUser.save(function(err){
            res.redirect('/users');
        });
    },
    createGet: function(req, res){
        res.render('users/subscribe');
    },
    update: function (req, res) {
        User.findById(req.params.id, function (err, doc){
            doc.firstname = req.body.firstname;
            doc.name = req.body.name;
            doc.age = req.body.age;
            doc.email = req.body.email;
            doc.ville = req.body.ville;
            doc.save(function(err){
                res.redirect('/users');
            });
        })
    },
    delete: function (req, res) {
        User.findOne({'_id':req.params.id}, function(err, newUser) {
            if(err || !newUser){
                return res.redirect('index');
            }
            newUser.remove(function () {
                res.redirect('/users');
            });
        })
    },

    //Récupère l'utilisateur pour l'upadate
    getUser: function (req, res) {
        User.findById(req.params.id, function (err, doc){
            res.render('users/subscribe', {user:doc});
        })
    },

    //Affiche un utilisateur
    getUserView: function (req, res) {
        User.findById(req.params.id, function (err, doc){
            res.render('users/user', {user:doc});
        })
    }


};

module.exports = Users; // L'exportation permet de rendre disponible ce fichier ailleurs grâce au require()