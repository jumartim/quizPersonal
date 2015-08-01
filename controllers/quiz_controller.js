var models=require('../models/models.js');

//POST /quizes/create
exports.create=function(req, res){
	var quiz= models.Quiz.build(req.body.quiz);
	//guarda en BD
	quiz.validate().then(funtcion(err){
		if(err){
			res.render("/quizes/new",{quiz: quiz, errors: err.errors})
		}else{
			quiz.save({fields:["pregunta", "respuesta"]}).then(function(){res.redirect('/quizes')})//redirecciona http url relativo lista de preguntas
		}
	})
};

//get Quizes new
exports.new=function(req, res){
	var quiz= models.Quiz.build(//crea objeto temporal quiz
		{pregunta:"Pregunta",respuesta:"Respuesta"});
		res.render('quizes/new'{quiz:quiz});
};

//Obtener preguntas
exports.question=function(req, res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question',{pregunta:quiz[0].pregunta});
	});
};

// get /quizes/:id/answer
exports.answer=function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer',{quiz: quiz, respuesta:'Correcto'});
		}else{
			res.render('quizes/answer',{quiz:quiz, respuesta:'Incorrecto'});
		}
	})
	
};

// get /quizes/:id
exports.show=function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: quiz});
	})
};

//Get /quizes
exports.index=function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	})
};


exports.author=function(req, res){
	res.render('author');
};