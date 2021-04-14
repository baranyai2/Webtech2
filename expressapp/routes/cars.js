var express = require('express');
var router = express.Router();
var car = require('../models/cars');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.post('/addCar', async function(req, res) {
    await car.findOne({"model": req.body.model}).then(result => {
      if (result) {
        console.log('A car of that model already exists!');
        console.log(`Found doc: ${result}`);
      } else {
        var newCar = new car({
          manufacturer:req.body.manufacturer,
          model:req.body.model,
          price:req.body.price
        });
        console.log(JSON.stringify(newCar));
        try {
          doc = newCar.save();
          return res.status(201).json(doc);
        } catch (err) {
          return res.status(501).json(err);
        }
      }
      return result;
    }).catch(err => console.error(`Failed to find any cars ${err}`));
  });

  router.get('/getAllCars', function(req, res) {
    car.find().then(result => {
      res.json(result);
      return result;
    }).catch(err => console.error(err))
  })

  router.delete('/deleteCar/:id', function(req, res, next) {
    car.findByIdAndRemove(req.params.id, function (error, result) {
          if (error) {
              throw error;
          } else {
              res.status(200).json(result);
          }
      }
    );
  });
  

  module.exports = router;