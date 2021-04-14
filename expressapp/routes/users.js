var express = require('express');
var router = express.Router();
var user = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async function(req, res) {
   await user.findOne({"username": req.body.username}).then(result => {
    if (result) {
      console.log('Username already taken!');
      console.log(`Found doc: ${result}`);
    } else {
      var newUser = new user({
        username:req.body.username,
        password:req.body.password
      });
      console.log(JSON.stringify(newUser));
      try {
        doc = newUser.save();
        return res.status(201).json(doc);
      } catch (err) {
        return res.status(501).json(err);
      }
    }
    return result;
  }).catch(err => console.error(`Failed to find ${err}`));
});

router.post('/login', async function(req, res){
  await user.findOne({"username": req.body.username}).then(result => {
    if (result.password == req.body.password) {
      console.log('Login parameters match!');
      return res.status(201).json({message:'Login success!'});
    } else {
      console.log('Passwords do no match!');
      return res.status(501).json({message:'Login unsuccessful!'});
    }
  }).catch(err => console.error(`Failed to find ${err}`));
});

module.exports = router;
