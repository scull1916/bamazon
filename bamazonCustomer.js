//pull in inquirer npm
var inquirer = require('inquirer');

//pull in mysql npm and create a connection to the bamazon db
var mysql = require('mysql');

var connection = mysql.createConnection(
	{
		host: "localhost",
		port: 3306,
		user: "root",
		password: "root",
		database: "bamazon"

	});

connection.connect(function(err)
	{
		if (err)
		{
			console.log("error connecting: " + err.stack);
		}

		console.log("connected as id: " + connection.threadId);
		queryAllItems();
	});


function queryAllItems()
{
	console.log(
		"***************************************************************************************************************");
	console.log(
		"*****************************************     WELCOME TO BAMAZON     ******************************************");
	console.log(
		"INVENTORY");

	connection.query("SELECT * FROM products", function(err, res)
	{
		for (var i=0; i < res.length; i++)
		{
			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
		}

		console.log("---------------------------------------------------------------------------------------------------");

		shop();

	});
};


function shop()
{
	inquirer.prompt
	({
		name: "item",
		type: "input",
		message: "Please enter the stock number of the item you'd like to purchase: "	
	}).then(function quantity()
	{
		inquirer.prompt
		({
			name: "quantity",
			type: "input",
			message: "Please enter the quantity of this item you'd like to purchase: "
		})
	});

checkInv();
}

function checkInv()
{
	console.log("One moment, let me check the backroom.");
	connection.end();
}


//notes: build a recursive functions to run ops before rolling to the connection.end statement?

//end the connection to the database
// connection.end();