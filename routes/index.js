const express = require('express');
const Users = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {

  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {

    const user = new Users({
      username,
      password: hash
    })

    const promise = user.save();
    promise.then(data => res.json(data))
      .catch(err => console.log(err))

  })


});




router.post('/aoutorihate', function (req, res, next) {
  const { username, password } = req.body;

  Users.findOne({ username }, (err, user) => {
    if (err)
      throw err;
    if (!user) {
      res.json({
        status: "Topilmadi",
        message: "Kirish mumkin emas. Iltimos ro'yhatdan o'ting"
      })
    }
    else {
      bcrypt.compare(password, user.password).then(resul => {
        if (!resul) {
          res.json({
            status: false,
            message: "Foydalanuvchi parol xato"
          })
        }
        else {
          const payload = { username }

          const token = jwt.sign(payload, req.app.get('_api_secret_key'), {
            expiresIn: 1400

          })

          res.json({
            status: true,
            token
          })

        }
      })

    }


  })

});

module.exports = router;
