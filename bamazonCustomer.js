//pull in inquirer npm
var inquirer = require('inquirer');

//pull in mysql npm and create a connection to the bamazon db
var mysql = require('mysql');

//declare a variable to hold the details needed to establish the connection to the database
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
var itemPrice = 0;
var productSel;


//bulid the point-of-sale function
function poSale()
{

		//write connection.query to pull on-hand qty of customer's selected item
		connection.query("SELECT stock_qty, price, product_name FROM products WHERE item_id="+item, function(err,res)
	
		{	
			

			if (err) throw err;

			{
				supply = JSON.parse(res[0].stock_qty);
				itemPrice = JSON.parse(res[0].price);
				productSel = JSON.stringify(res[0].product_name);
				
			}

				//console logs for testing purposes
				// console.log("product: ", productSel);
				// console.log("supply: ", supply);
				// console.log("price: ", itemPrice);

				if (qty > supply)
				{
					console.log("I'm sorry, we don't have enough to fill your order.");

				}
				else
				{
					var query = connection.query("UPDATE products SET ? WHERE ?", 
						[
						{
							stock_qty: supply - qty
						},
						{
							item_id: item
						},
						]);
				
					console.log("Your purchase of " + qty + " " + productSel + " comes to $",qty*itemPrice);
				}

		});

		setTimeout(function()
		{
			console.log("Thank you for shopping bamazon!");
			connection.end();
		}, 
		3000);
		
}

//ask the customer what they would like to purchase and how many of the item they wish to purchase
function shop()
{
	inquirer.prompt
	({
		name: "item",
		type: "input",
		message: "Please enter the stock number of the item you'd like to purchase: "	
	}).then(function quantity(answer)
	{
		item = answer.item;
		

		inquirer.prompt
		({
			name: "quantity",
			type: "input",
			message: "Please enter the quantity of this item you'd like to purchase: "
		}).then(function checkInv(answer)
		{
			qty = answer.quantity;
			
			console.log("One moment, let me check the inventory.");
			console.log("**************************************");

			//The clerk is checking the inventory - yes, I know this is supposed to be an online
			//store. There's a new burgeoning eCommerce customer service movement, 
			//please see http://bit.ly/Pewcyo for more info. Also, I wanted to practice setTimeout


			setTimeout(function()
			{
				poSale();

			},
			1500);
		});
	});
}

//Build the "storefront" for customers to select an item for purchase
function queryAllItems()
{
	console.log(
		"***************************************************************************************************************");
	console.log(
		"*****************************************     WELCOME TO BAMAZON     ******************************************");
	console.log(
		"INVENTORY");

	//query bamazon to pull the data from the products table
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

//connect to the bamazon database
connection.connect(function(err)
	{
		if (err)
		{
			console.log("error connecting: " + err.stack);
		}

		console.log("connected as id: " + connection.threadId);
		queryAllItems();
	});


