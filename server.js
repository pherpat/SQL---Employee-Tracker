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
function showBanner() {
    console.log(`
-----------------------
-- EMPLOYEE MANAGER! --  
-----------------------    
    `)
}

// Promt questions 
function init() {
    inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
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
            if (answer.choice == 'View All Departments') {
                viewDepartments();

            } else if (answer.choice == 'View All Roles') {
                viewRoles();

            } else if (answer.choice == 'View All Employees') {
                viewEmployee();

            } else if (answer.choice == 'Add a Department') {
                addDepartment();

            } else if (answer.choice == 'Add a Role') {
                addRole();

            } else if (answer.choice == 'Add an Employee') {
                addEmployee();

            } else if (answer.choice == 'Update an Employee Role') {
                updateEmployeeRole();

            } else {
                // quit();
                init();
            }
        })
};

//  ----View Functions ----

// view department 
function viewDepartments() {
    db.query('SELECT id AS "Department ID", department.name AS "Department Name" FROM department', (err, res) => {
        if (err) {
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
        if (err) {
            console.error(err);
        } else {
            console.table(results);
        }
        init();
    });
}

//  view employees
function viewEmployee() {
    db.query('SELECT employee.id AS "Employee ID", first_name AS "First Name", last_name AS "Last Name", title AS Title, employee.manager_id AS "Manager ID", Salary, department.name as "Department Name" FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id', (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        // show table in the console
        console.table(res);
        init();
    });
}

// ---- Add Functions -------
//  --- Add Department
function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you want to add?'

    }
    ])
        .then(answer => {
            db.query('INSERT INTO department SET ?', { name: answer.department }, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Added to departments');
                init();

            })
        })
};

//  Add Role
function addRole() {
    inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: 'What is the name of the role you want to add?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please input role salary:'
    },
    {
        type: 'input',
        name: 'department_id',
        message: 'Please input department id, select number from 1 to 6:'
    }
    ])
        .then(answer => {
            db.query('INSERT INTO role SET ?', { title: answer.title, salary: answer.salary, department_id: answer.department_id }, (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Added to roles');
                init();
            })
        })
};

// Add Employee
function addEmployee() {
    inquirer.prompt([{
        type: 'input',
        name: 'first_name',
        message: 'What is the first name of the employee you want to add?'
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What is the employees last name?',
    },
    {
        type: 'choice',
        name: 'role_id',
        message: "What is the employee's role ID?",
        
    },
    {
        type: 'choice',
        name: 'manager_id',
        message: "What is the employees manager ID?",
       
    },
    ])
        .then(answer => {
            db.query("INSERT INTO employee SET ?;", { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.role_id, manager_id: answer.manager_id }, (err, result) => {

                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Added to employees');
                init();
            })
        });
}

//  Update Employee function 
function updateEmployeeRole() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
// ------  creating variable list of employees to be updated ------
        let listOfEmployees = res.map(employee => (
                {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            ));

        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: "Which employee's role would you like to update?",
                choices: listOfEmployees
            }
        ]).then((id) => {
            db.query('SELECT * from role', (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                let listOfRoles = res.map(role => (
                    {
                        name: role.title,
                        value: role.id
                    }
                ))
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: "What is the employees role?",
                        choices: listOfRoles
                    }
                ]).then((answer) => {
                    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role_id, id.id], (err, res) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        console.log("Employee's role Updated");
                        init();
                    });
                });
            });
        });
    });
}
showBanner();
init();