var models=require('../models/models.js');

//Autoload
exports.load= function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{next(new Error('No existe quizId=' + quizId));}
		}
	).catch(function(error){next(error);});
};


//POST /quizes/create
exports.create=function(req, res){
	var quiz= models.Quiz.build(req.body.quiz);
	//guarda en BD
	quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('/quizes/new',{quiz: quiz, errors: err.errors});
			}else{
				quiz
				.save({fields:["pregunta", "respuesta"]})
				.then(function(){res.redirect('/quizes')});//redirecciona http url relativo lista de preguntas
			}
		}
	);
};

//get Quizes new
exports.new=function(req, res){
	var quiz= models.Quiz.build(//crea objeto temporal quiz
			{pregunta:"Pregunta",respuesta:"Respuesta"}
		);
	res.render('quizes/new',{quiz: quiz, errors:[]});
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
			res.render('quizes/answer',{quiz: quiz, respuesta:'Correcto', errors:[]});
		}else{
			res.render('quizes/answer',{quiz:quiz, respuesta:'Incorrecto', errors:[]});
		}
	})
	
};

// get /quizes/:id
exports.show=function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: quiz, errors:[]});
	})
};

//Get /quizes
exports.index=function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes, errors:[]});
	}).catch(function(error){next(error);});
};

exports.edit=function(req, res){
	var quiz = req.quiz; // autoload de instancia de quiz
	
	res.render('quizes/edit', {quiz: quiz, errors: []});
}

exports.author=function(req, res){
	res.render('author');
};

exports.update= function(req, res){
	req.quiz.pregunta = req.body.pregunta;
	req.quiz.respuesta = req.body.respuesta;
	
	req.quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			}else{
				req.quiz
				.save({fields: ["pregunta", "respuesta"]})
				.then(function(){res.redirect('/quizes');});
			}
		}
	);
};

//delete
exports.destroy= function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error);});
}