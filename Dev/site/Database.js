'use strict';
var config = require("./config").database;
var isNull = require("./script").isNull;

module.exports = {
	'query': function(queryString){
		if(isNull(queryString)){
			return null;
		}else{
			console.log(queryString);
			var sql = require('mssql');
			sql.close();
			return new Promise((resolve, reject) => {
				console.log('Conectando ao banco de dados...');
				sql.connect(config).then(pool => {
					console.log('Conectado...');
					return pool.request().query(queryString);
				}).then(results => {
					console.log('Query efetuada com sucesso!');
					console.log('Fechando conexão...');
					sql.close();
					console.log('Conexão fechada...');
					resolve(results);
				}).catch(error => {
					console.log('Erro ao executar a query :(', error);
					console.log('Fechando conexão...');
					sql.close();
					reject(error);
				});
			});
		}
	}
};