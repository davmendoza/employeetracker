var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;

    mainMenu();
});

function mainMenu() {
    inquirer
        .prompt({
            name: "selection",
            type: "list",
            message: "What would you like to do?",
            choices: [
                'Add an employee',
                'Add a role',
                'Add a department',
                'View all employees',
                'View all roles',
                'View all departments',
                'Update an employee role',
                'Quit'
            ]
        })
        .then(function (answer) {
            switch (answer.selection) {
                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case "View all employees":
                    viewAllEmployees();
                    break;

                case "View all roles":
                    viewAllRoles();
                    break;

                case "View all departments":
                    viewAllDepartments();
                    break;

                case 'Update an employee role':
                    updateEmployee();
                    break;

                default:
                    connection.end();
            }

        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the first name of the employee?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the employee?"
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the role id of the employee?",

            },
            {
                name: "managerId",
                type: "input",
                message: "What is the manager id of the employee?",
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",

                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: parseInt(answer.roleId),
                    manager_id: parseInt(answer.managerId)
                },
                function (err) {
                    if (err) throw err;
                    viewAllEmployees();


                }
            );
        });

}

function addRole() { }

function addDepartment() { }

function viewAllEmployees() {
    connection.query(
        `SELECT * FROM employee`,
        function (err, data) {
            if (err) throw err;
            console.table(data);
            mainMenu();
        })
};

function viewAllDepartments() { }

function viewAllRoles() { }

function updateEmployee() {

    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the first name of the employee you would like to update?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the employee you would like to update?"
            },
            {
                name: "roleId",
                type: "input",
                message: "What is the employee's new role?",

            },
            {
                name: "managerId",
                type: "input",
                message: "Does the employee have a new manager?",
            }
        ])
        .then(function (answer) {
            connection.query(
                "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: parseInt(answer.roleId),
                    manager_id: parseInt(answer.managerId)
                },
                function (err) {
                    if (err) throw err;
                    viewAllEmployees();


                }
            );
        });


}

function viewAllEmployees() {
    connection.query(
        `SELECT * FROM employee`,
        function (err, data) {
            if (err) throw err;
            console.table(data);
            mainMenu();
        })
};

