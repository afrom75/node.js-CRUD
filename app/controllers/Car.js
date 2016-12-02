'use strict';

const models  = require('../models');

var Cars = {
    index: function (req, res) {
        models
            .Car
            .findAll()
            .then(function(cars) {
                res.render('cars/index', {
                    cars: cars
                });
            });

    },
    getForm: function(req, res){
        res.render('cars/add')
    },
    add: function(req, res){
        models
            .Car
            .create({
                brand: req.body.brand,
                km: req.body.km,
            })
            .then(function (car){
                res.redirect('/cars');
            })
            .catch(function (car){
            })
    },
    update : (req, res) => {
        models
            .Car
            .findById(req.params.id)
            .then(function(car) {
                car.update({brand: req.body.brand, km: req.body.km})
                    .then(function(){
                        res.redirect('/cars');
                    })
            });

    },
    delete : (req, res) => {
        models
            .Car
            .findById(req.params.id)
            .then(function(car) {
                car.destroy({force:true})
                    .then(function(){
                        res.redirect('/cars');
                    })
            })
            .catch(function(err){
            })

    },
    findById : (req, res) => {
        if(req.params.id){
            models
                .Car
                .findById(req.params.id)
                .then(function(car) {
                    res.render('cars/add', {
                        car: car
                    });
                });
        }
        else{
            res.render('cars/add')
        }
    }


};

module.exports = Cars;
