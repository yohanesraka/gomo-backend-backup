var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/test', (req, res, next) => {
  res.send('Meledak..!!');
})

module.exports = router;
