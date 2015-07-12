var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bien venido a Quiz' });
});

router.get('/quizes/question',quizController.quetion);

router.get('/quizes/answer',quizController.answer);

router.get('/author',quizController.author);

module.exports = router;
