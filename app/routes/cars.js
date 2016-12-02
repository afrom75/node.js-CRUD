var express = require('express');
var router = express.Router();

var cars = require('../controllers/Car');

router.route('/:id([0-9]+)')
    .post(cars.update)
    .delete(cars.delete)
    .get(cars.findById);

router.get('/', cars.index);

router.get('/add', cars.getForm);
router.post('/add', cars.add);



module.exports = router;