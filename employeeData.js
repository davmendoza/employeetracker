var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    
    port: 8889,
   
    user: "root",
    
    password: "root",
    database: "employee_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    
    start();
  });

  function start() {
    inquirer
      .prompt({
        name: "initial",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "View All By Manager", 
        "Add Emplyee", "Remove Empolyee", "Update Employee Role", "Update Employee Manager", "Add Role", "Remove Role"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid === "POST") {
          postAuction();
        }
        else if(answer.postOrBid === "BID") {
          bidAuction();
        } else{
          connection.end();
        }
      });
  }

//   function postAuction() {
//     // prompt for info about the item being put up for auction
//     inquirer
//       .prompt([
//         {
//           name: "item",
//           type: "input",
//           message: "What is the item you would like to submit?"
//         },
//         {
//           name: "category",
//           type: "input",
//           message: "What category would you like to place your auction in?"
//         },
//         {
//           name: "startingBid",
//           type: "input",
//           message: "What would you like your starting bid to be?",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//       .then(function(answer) {
//         // when finished prompting, insert a new item into the db with that info
//         connection.query(
//           "INSERT INTO auctions SET ?",
//           // INSERT INTO auctions SET (item_name, category, starting_bid, highest_bid) VALUES ()
//           {
//             item_name: answer.item,
//             category: answer.category,
//             starting_bid: answer.startingBid || 0,
//             highest_bid: answer.startingBid || 0
//           },
//           function(err) {
//             if (err) throw err;
//             console.log("Your auction was created successfully!");
//             // re-prompt the user for if they want to bid or post
//             start();
//           }
//         );
//       });
