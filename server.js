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

//----- set the initial value of a variable ----



function init(){
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What you would like to do.',
        choices: [
            'View All Departments', 
            'View All Roles',
            'View All Employees',
            'Add a Department', 
            'Add a Role', 
            'Add an Employee',
            'Update an Employee Role'

        ]
    }])
    
.then(answer => {
    if (answer.choice == 'View All Departments'){
       viewDepartments();

    }else if (answer.choice == 'View All Roles'){
       viewRoles();    

    }else if (answer.choice == 'View All Employees'){
        viewEmployee();

    }else if (answer.choice == 'Add a Department'){
        addDepartment();

    }else if (answer.choice == 'Add Role'){
        console.log('addRole()');

    }else if(answer.choice == 'Add an Employee'){
        console.log('addEmployee()');

    }else if (answer.choice == 'Update an Employee Role'){
        console.log('updateEmployeeRole()');

    }else{
        quit();
    }
})
};

//  ----View Functions ----

// view department 
function viewDepartments() {
    db.query('SELECT id AS "Department ID", department.name AS "Department Name" FROM department', (err, res) => {
        if(err) {
            console.error(err);
            return;
        }
        // show table in the console
        console.table(res);
        init();
    });
}

// view roles - making the tiles a little cleaner
function viewRoles() {
db.query(`SELECT role.id AS "Role ID", role.title AS Title, Salary, department.name 
AS Department FROM role INNER JOIN department ON role.department_id = department.id `, (err, results) => {
    if(err) {
      console.error(err);
    } else {
      console.table(results);
    }
    init();
  });
}

//  view employees
function viewEmployee() {
    db.query('SELECT first_name AS "First Name", last_name AS "Last Name", title AS Title, Salary, department.name as "Department Name" FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id', (err, res) => {
        if(err) {
            console.error(err);
            return;
        }
        // show table in the console
        console.table(res);
        init();
    });
}

// ---- Add Functions 

function addDepartment(){
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you want to add?',
        
    }
])
.then(answer => {
    db.query('INSERT INTO department SET ?', {name: answer.department}, (err, res) => {
    if (err){
        console.error(err);
        return;
    }
    console.log('Added to departments');
        init();
    
    })
})};  




// /// ------Add to department -----
// function addDep(){
//     console.log("Your selection was to add a department");
//     inquirer.prompt([{
//         type: 'input',
//         name: 'name',
//         message: "Please type the department name: "
//     }
//     ]).then(function(response){
//         insertInto("department", response);
//     });
// };
// ///----- Add to role -------
// function addRole(){
//     console.log("You selected to add a Role");
//     inquirer.prompt([{
//         type: 'input',
//         name: 'title',
//         message: "Please input role title: "
//     },
//     {
//         type: 'input',
//         name: 'salary',
//         message: "Please input role salary: "
//     },
//     {
//         type: 'input',
//         name: 'department_id',
//         message: "Please input department id: "
//     }
//     ]).then(function(response){
//         insertInto("role", response);
//     });
// };
// //------ Add to employee ----
// function addEmpl(){
//     console.log("You selected to add a Employee");
//     inquirer.prompt([{
//         type: 'input',
//         name: 'first_name',
//         message: "Employee first name: "
//     },
//     {
//         type: 'input',
//         name: 'last_name',
//         message: "Employee last name: "
//     },
//     {
//         type: 'input',
//         name: 'role_id',
//         message: "Employee role id: "
//     },
//     {
//         type: 'input',
//         name: 'manager_id',
//         message: "Employee manager id: "
//     }
//     ]).then(function(response){
//         insertInto("employee", response);
        
//     });
// };

// -------- View table selected -----
// function selectView(table){
//     var queryString = "SELECT * FROM ??";
//     db.query(queryString, [table], function(err, result){
//         if (err) throw err;
//         console.log("\n");
//         console.log(" ... Showing: " + table + " ... ");
//         console.table(result);
//         console.log("\n"+"\n");
//     });
//     init();
// }
// // ---- View function ------
// function view(){
//     // console.log("You chose to VIEW")
//     inquirer.prompt([{
//         type: 'list',
//         name: 'action',
//         message: 'Which table would you like to view?',
//         choices: [
//             'Departments',
//             'Roles',
//             'Employees'
//         ]
//     }]).then(function(response){
//         switch(response.action){
//             case 'Departments':
//                 return viewDep();
//             case 'Roles':
//                 return viewRole();
//             case 'Employees':
//                 return viewEmpl();
//             default:
//                 // change this 
//                 console.log("Error: Nothing selected");
//         }
//     });
// };
// /////////////////////////////////////////////////
function viewDep(){
    selectView("department");
};
function viewRole(){
    selectView("role");
};
function viewEmpl(){
    selectView("employee");
};
// //------ update function 
// function update(){
//     // console.log("You chose to UPDATE")
//     inquirer.prompt([{
//         type: 'input',
//         name: 'role_id',
//         message: "New Role id you wish to give employee: "
//     },
//     {
//         type: 'input',
//         name: 'first_name',
//         message: "Name of employee you wish to update to new role: " 
//     }
//     ]).then(function(response){
//         var queryString = "UPDATE employee SET role_id = ? WHERE first_name = ?";
//         // console.log(response);
//         db.query(queryString, [response.role_id, response.first_name], function(err, result){
//             if (err) throw err;
//             // console.log(response);
//         });
//         init();
//     })
// };
showBanner();
init();