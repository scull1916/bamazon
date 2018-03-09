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

//declare variables to capture user inputs for item # and quantity desired.
var item = 0;
var qty = 0;
var supply = 0;

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
	}).then(function quantity(answer)
	{
		var item = answer.item;
		console.log(item);

		inquirer.prompt
		({
			name: "quantity",
			type: "input",
			message: "Please enter the quantity of this item you'd like to purchase: "
		}).then(function checkInv(answer)
		{
			var qty = answer.quantity;
			console.log(qty);

			console.log("One moment, let me check the backroom.");

			//set timeout for dramatic effect?


			//write connection.query to pull on-hand qty of customer's selected item
			connection.query("SELECT stock_qty FROM products WHERE item_id="+item, function(err,res)
				{
					if (err) throw err;
					supply = parseInt(res[0].stock_qty);
					console.log("supply: ",supply);

					//(2) compare query result to customer qty request
					
					if (qty < res)
					{
						function purchase()
						{
							var query = connection.query("UPDATE products SET ? WHERE ?", 
								[
								{
									stock_qty: supply - qty
								},
								{
									item_id: item
								}]);
						}
						purchase();
						console.log(qty);
						console.log(supply);
					}

				console.log("Post-purchase inv: ",supply-qty);

				});




			//(2A) if on-hand > than request then run purchase routine; decrement the on-hand inv for selected item
			//(2B) else, sorry don't have enough to fullfill your order then end? return to shop/choice?

			
		});
	});

			
// checkInv();
}

// function checkInv()
// {
	
// }


//notes: build a recursive functions to run ops before rolling to the connection.end statement?

//end the connection to the database
// connection.end();