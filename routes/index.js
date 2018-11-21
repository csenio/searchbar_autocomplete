var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/video');
var Schema = mongoose.Schema;
var Movie = mongoose.model('movies', new Schema({
  title: String,
  year: String,
  director: String,
  duration: String,
  genre: Array,
  rate: String
}), 'movies')





/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/query', (req,res,next) => {

  Movie.find({"title" : { $regex : `^${req.body.input}`, $options: 'i' } }, function (err, result) {
  if (err) {
    console.log("ERROR!!", err)
    res.end()
  } else {
    res.json({
        data: result
      })
  }
})
    }
)

module.exports = router;
