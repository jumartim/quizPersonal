var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bien venido a Quiz' });
});

//Autoload
router.param('quizId', quizController.load); //autoload quizId

//Definici�n de rutas de /quiz
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/question', quizController.question);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', quizController.author);
router.get('/quizes/new', quizController.new);
router.get('/quizes/create', quizController.create);

module.exports = router;
