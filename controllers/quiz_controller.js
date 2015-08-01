var models=require('../models/models.js');

//POST /quizes/create
exports.create=function(req,res){
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
exports.new=function(req,res){
	var quiz= models.Quiz.build(//crea objeto temporal quiz
		{pregunta:"Pregunta",respuesta:"Respuesta"});
		res.render('quizes/new'{quiz:quiz});
};

//Obtener preguntas
exports.question=function(req,res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question',{pregunta:quiz[0].pregunta});
	});
};

//Obtener respuestas
exports.answer=function(req,res){
	models.Quiz.findAll().success(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
		res.render('quizes/answer',{respuesta:'Correcto'});
		}else{
			res.render('quizes/answer',{respuesta:'Incorrecto'});
		}
	});
	
exports.question=function(req,res){
	res.render('quizes/question',{pregunta:'Capital de Italia'});
};
exports.answer=function(req,res){
	if(req.query.respuesta === 'Roma'){
		res.render('quizes/answer',{respuesta:'Correcto'});
	}else{
		res.render('quizes/answer',{respuesta:'Incorrecto'});
	}
};

exports.author=function(req,res){
	res.render('author');
};