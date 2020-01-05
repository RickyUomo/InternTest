const mysql = require('mysql');
const express=require("express");
const app = express();

//create connection with mysql
const db = mysql.createConnection({
    host : 'localhost',
    user:'root',
	password: 'cqppy7878',
	database: 'AcountDB' //Have to create database first
});

db.connect(function(err){
    if(err) throw err;
    console.log('my sql is connected......')
});


//To get localhost:5000/
app.get('/', function(req, res){ //表示get根目錄('/')
	fetchData(res);
	console.log('Done display data');
});

//Functions
function executeQuery(sql, cb){ //cb is any function
	db.query(sql, function(err, result, fields){
		if(err) throw err;
		cb(result);
	})
}		

function fetchData(res){
	executeQuery('Select * from account', function(result){
		console.log(result);
		res.write('<table style="width:20%">'); //width parameter make easily  watch
		res.write('<tr>')

		// print column name
		for(var column in result[0]){
			res.write('<th>' + column + '</th>');
		}
		res.write('</tr>');
		
		var ac = []
		//print data tuples
		for(var row in result){
			res.write('<tr>');
			for (var column in result[row]){
				res.write('<td>'+result[row][column]+ '</td>'); // <tr>it is table row</tr>
																//<td>標註內容</td>
				
			}
			res.write('</tr>');
		}
		res.write('</table>'); // Need to end with </table>

	})
}

/*
//create database
app.get('/createdb', (req, res)=>{ //Need to go to localhost:5000/createdb to check if database created successful
    let sql = 'CREATE DATABASE AcountDB';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('database created.....');
    })
});

//create tables
app.get('/createtable', (req, res)=>{ //Need to go to localhost:5000/createtable to check if tables created successful
	let sql = 'CREATE TABLE account(user varchar(100), password varchar(255),\
				 PRIMARY KEY (password))';
	db.query(sql, (err, result)=>{
		if(err) throw err;
		console.log(result);
		res.send('Tables created....')
	})

});
*/
app.listen('5000', function() {	//ger port number
    console.log('server starts 5000');
});