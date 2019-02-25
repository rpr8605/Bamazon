var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection

({

  host: "localhost",
  port: 3306,
  user: "root",
  password: "1904W5th",
  database: "bamazon"

});

function promptUser(data) {
  inquirer.prompt(
    [{

        type: "input",
        name: "item_id",
        message: "What would you like ot buy?"
      },{
        type: "input",
        name: "stock_qty",
        message: "How many items would you like?"
    }])
    
    .then(function (response) {
    var selectedItem = data.find(function (slectedItem) {
      return slectedItem.item_id === parseInt(response.item_id);})


    if(selectedItem.stock_qty >= parseInt(response.stock_qty)){
      console.log("Sorry Compadre, No can do!");
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
          stock_qty: (selectedItem.stock_qty - response.stock_qty)
          },
          {
            id: response.item_id
          }
        ],
        
        function (err, updateResults) {
          if (err) throw err;
          
          console.log("Try to enjoy your " + response.stock_qty 
          + " " + response.item_id + "s . Your total is: $" + 
          (selectedItem.price * response.stock_qty) + "Please Settle Up!");
          promptUser(data);

        }
      )
    }
    else {
      console.log("We just dont have enough of those.");
      promptUser(data);
    }
  })

}

function listProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, data) {
    if (err) throw err;
    


    for (let slectedItem of data) {
      var price = new Intl.NumberFormat('us-EN', {
        style: 'currency',
        currency: 'USD'
      }).format(slectedItem.price)

      console.log("ID: " + slectedItem.item_id)
      console.log("Product Name: " + slectedItem.product_name)
      console.log("Department: " + slectedItem.department_name)
      console.log("Price: " + price);
      console.log("In Stock: " + slectedItem.stock_qty)
      console.log("-------------------------------------------")
    }
    promptUser(data);
  });
}

function start() {
  listProducts();

}
start();