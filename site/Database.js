'use strict';
import config from "./config";
import isNull from "./script";
import sql from 'mssql';

export default async function query(queryString) {
	if (isNull(queryString)) {
		return null;
	} else {
		try {
			console.log(queryString);

			sql.close();

			const connection = await sql.connect(config.database);

			const queryResult = await connection.request().query(queryString);

			await sql.close();

			console.log("Resultado da consulta");
			console.log(queryResult.recordset);

			console.log("Linhas afetadas " + queryResult.rowsAffected);

			return queryResult;
		}
		catch (error) {
			console.log('Erro: ' + error);
			sql.close();
			return false;
		}
	}
};


/* export default function (queryString) {
	if (isNull(queryString)) {
		return null;
	} else {
		console.log(queryString);
		var sql = require('mssql');
		sql.close();
		return new Promise((resolve, reject) => {

			sql.connect(config.database).then(pool => {
				console.log('Conectado...');
				return pool.request().query(queryString);
			}).then(results => {
				console.log('Query efetuada com sucesso!');

				sql.close();
				console.log('Conexão fechada...');
				resolve(results);
			}).catch(error => {
				console.log('Erro ao executar a query :(', error);

				sql.close();
				reject(error);
			});
		});
	}
}; */