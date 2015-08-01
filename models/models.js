var path = require('path');

//Postgres DB url = postgres://user.pass@host:port/databasename
//Sqlite DB url= sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name= (url[6]||null);
var user= (url[2]||null);
var pass = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar Modelo
var Sequelize = require('sequelize');

//Usar BDD SQILE O POSTGRESS
var sequelize= new Sequelize(DB_name, user, pass,
							{
								dialect: dialect, 
								protocol: protocol,
								port: port,
								host: host,
								storage: storage,
								omitNull: true //solo postgress
							});

//Importar tabla de quiz.sqlite
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //exportamos la definiciónd e la tabla

//sequelize.sync crea e incializa la tabla en bdd
sequelize.sync().then(function(){
	//success ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count ===0){//Si la tabla esta vacía la inicializamos
			Quiz.create({pregunta:'Capital de Italia',
						respuesta:'Roma',
						tema: "Humanidades"});
			Quiz.create({pregunta:'Capital de Portugal',
						respuesta:'Lisboa',
						tema: "Humanidades"}).success(function(){console.log('Base de datos inicializada')});
		}
	});
});