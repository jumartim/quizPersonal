var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bien venido a Quiz' });
});

router.get('/quizes/question', quizController.question);

router.get('/quizes/answer', quizController.answer);

router.get('/author', quizController.author);

router.get('/quizes/new', quizController.new);
router.get('/quizes/create', quizController.create);

module.exports = router;
