// Dependencies
const inquirer = require('inquirer');
const consoleTable = require("console.table");
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'mayapayasql',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

// Query database
// db.query('SELECT * FROM employee', function (err, results) {
//   console.log(results);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Listen for incoming requests on a specific port.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Banner message to the start of the application 
function showBanner(){
    console.log(`
-----------------------
-- EMPLOYEE MANAGER! --  
-----------------------    
    `)
}

//////////////////////////////////////////
function init(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Pick what you would like to do.',
        choices: [
            'Add departments, roles, employees',
            'View departments, roles, employees',
            'Update Employee Roles'
        ]
    }]).then(function(response){
        switch(response.action){
            case 'Add departments, roles, employees':
                return add();
            case 'View departments, roles, employees':
                return view();
            case 'Update Employee Roles':
                return update();
            default:
                console.log("Error: Nothing selected");
        }
    })
}
/////////////////////////////////////////////////
function add(){
    console.log("You chose to ADD")
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What would you like to add?',
        choices: [
            'Departments',
            'Roles',
            'Employees'
        ]
    }]).then(function(response){
        switch(response.action){
            case 'Departments':
                return addDep();
            case 'Roles':
                return addRole();
            case 'Employees':
                return addEmpl();
            default:
                console.log("Error: Nothing selected");
        }
    })
};
/////////////////////////////////////////////////
function insertInto(table, response){
    var queryString = "INSERT INTO ?? SET ?";

    connection.query(queryString, [table, response], function(err, result){
        if (err) throw err;
        // console.log(" ... ADDED ...")
    });
    init();
}
/////////////////////////////////////////////////
function addDep(){
    console.log("You chose to add a department");
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: "Please type the department name: "
    }
    ]).then(function(response){
        insertInto("department", response);
    });
};
/////////////////////////////////////////////////
function addRole(){
    console.log("You chose to add a Role");
    inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: "Please input role title: "
    },
    {
        type: 'input',
        name: 'salary',
        message: "Please input role salary: "
    },
    {
        type: 'input',
        name: 'department_id',
        message: "Please input department id: "
    }
    ]).then(function(response){
        insertInto("role", response);
    });
};
/////////////////////////////////////////////////
function addEmpl(){
    console.log("You chose to add a Employee");
    inquirer.prompt([{
        type: 'input',
        name: 'first_name',
        message: "Employee first name: "
    },
    {
        type: 'input',
        name: 'last_name',
        message: "Employee last name: "
    },
    {
        type: 'input',
        name: 'role_id',
        message: "Employee role id: "
    },
    {
        type: 'input',
        name: 'manager_id',
        message: "Employee manager id: "
    }
    ]).then(function(response){
        insertInto("employee", response);
    });
};

// -------- View table selected -----
function selectView(table){
    var queryString = "SELECT * FROM ??";
    db.query(queryString, [table], function(err, result){
        if (err) throw err;
        console.log("\n");
        console.log(" ... Showing: " + table + " ... ");
        console.table(result);
        console.log("\n"+"\n");
    });
    init();
}
/////////////////////////////////////////////////
function view(){
    // console.log("You chose to VIEW")
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Which table would you like to view?',
        choices: [
            'Departments',
            'Roles',
            'Employees'
        ]
    }]).then(function(response){
        switch(response.action){
            case 'Departments':
                return viewDep();
            case 'Roles':
                return viewRole();
            case 'Employees':
                return viewEmpl();
            default:
                console.log("Error: Nothing selected");
        }
    });
};
/////////////////////////////////////////////////
function viewDep(){
    selectView("department");
};
function viewRole(){
    selectView("role");
};
function viewEmpl(){
    selectView("employee");
};
/////////////////////////////////////////////////
function update(){
    // console.log("You chose to UPDATE")
    inquirer.prompt([{
        type: 'input',
        name: 'role_id',
        message: "New Role id you wish to give employee: "
    },
    {
        type: 'input',
        name: 'first_name',
        message: "Name of employee you wish to update to new role: " 
    }
    ]).then(function(response){
        var queryString = "UPDATE employee SET role_id = ? WHERE first_name = ?";
        // console.log(response);
        connection.query(queryString, [response.role_id, response.first_name], function(err, result){
            if (err) throw err;
            // console.log(response);
        });
        init();
    })
};
showBanner();
init();