var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection

({

  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"

});

function promptUser(data) {
  inquirer.prompt(
    [{

        type: "input",
        name: "product_id",
        message: "What is the ID of the product you would like to buy?"
      },{
        type: "input",
        name: "stock_Qty",
        message: "How many items would you like?"
    }])
    
    .then(function (response) {
    var selectedItem = data.find(function (slectedItem) {
      return slectedItem.id === parseInt(response.product_id);})


    if(selectedItem.stock_Qty >= parseInt(response.stock_Qty)){
      console.log("Sorry Compadre, No can do!");
      connection.query(
        "UPDATE products SET ? WHERE?",
        [
          {
          stock_Qty: (selectedItem.stock_Qty - response.stock_Qty)
          },
          {
            id: response.id
          }
        ],
        
        function (err, updateResults) {
          if (err) throw err;
          
          console.log("Try to enjoy your " + response.stock_Qty 
          + " " + response.product_id + ". Your total is: $" + 
          (selectedItem.price * response.stock_Qty) + "Please Settle Up!");
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

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, data) {
    if (err) throw err;
    

    
    for (let slectedItem of data) {
      var price = new Intl.NumberFormat('us-EN', {
        style: 'currency',
        currency: 'USD'
      }).format(slectedItem.price)

      console.log("ID: " + slectedItem.id)
      console.log("Product Name: " + slectedItem.product_name)
      console.log("Department: " + slectedItem.department_name)
      console.log("Price: " + price);
      console.log("In Stock: " + slectedItem.stock_Qty)
      console.log("-------------------------------------------")
    }
    promptUser(data);
  });
}

function start() {
  readProducts();

}
start();