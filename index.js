const mysql = require('mysql2');
const inquirer = require("inquirer");
const Table = require('cli-table');

require('dotenv').config()

var connection= mysql.createConnection(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: 'localhost',
    port: 3306,

    user: process.env.DB_NAME,
    password: process.env.DB_USER,
    database: process.env.DB_PASSWORD,
})


connection.connect(function (err) {
    if (err) throw err;
})

//main function
function herdOptions() {
    inquirer.prompt([
    {
        name: 'options',
        message: "What would you like to do?",
        type: 'list',
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee", "Exit"]
    }
]).then(function(response){
    switch (response.options){
        case "View All Departments":
            // view dep
            herdDepartments();
            break;

        case "View All Roles":
            //view roles
            herdRoles();
            break;
        
        case "View All Employees":
            //view employees
            herdEmp();
            break;
        
        case "Add Department":
            //add dep
            addDep();
            break;
        
        case "Add Role":
            //add role
            addRole();
            break;

        case "Add Employee":
            addEmp();
            break;

        case "Update Employee":
            //update employee
            break;

        case "Exit":
            exit();
            break;
    }
})
}
//view all departments function
function herdDepartments(){
    connection.query("SELECT * FROM department", function (err, res){
        var table = new Table ({
            head: ["ID", "Departments"],
            colWidths: [10, 20]
        })

        for (var i = 0; i < res.length; i++){
            table.push([res[i].id], res[i].name)
        }
    })
    herdOptions();
}
// view all roles function 
function herdRoles(response){
    connection.query("SELECT * FROM role", function (err, res){
        var table = new Table ({
            head: ["ID", "Title", "Salary", "department_id"],
            colWidths: [10, 20, 10, 10]
        })

        for (var i = 0; i < res.length; i++){
            table.push([res[i].id, res[i].title, res[i].role_salary])
            if (response){
                table.push(response.roleID)
            }
        }
    })
    herdOptions();
}
// view all employees function
function herdEmp(){
    connection.query("SELECT * FROM employee", function (err, res){
        var table = new Table ({
            head: ["ID", "First Name", "Last Name", "Role ID", "Manager ID"],
            colWidths: [10, 15, 15, 10, 10]
        })

        for (var i = 0; i < res.length; i++){
            table.push([res[i].id, res[i].first_name, res[i].last_name, res[i].role_id])
            if (res[i].manager_id === null){
                table.push['None']
            }else {
                table.push(res[i].manager_id)
            }
        }
    })
    herdOptions();
}
// department add funciton
function addDep(){
    inquirer.prompt([
        {
            name: 'depName',
            message: "What is your departments name?",
            type: 'input'
        }
]).then(function(response){
    connection.query("INSERT INTO department SET ?", {
        name: response.depName
    })
    console.log("Success added Dep!")
    herdDepartments();
})
}
// role add function
function addRole(){
    inquirer.prompt([
        {
            name: 'roleTitle',
            type: 'input',
            message: 'What is the title of your role?'
        },
        {
            name: "roleSal",
            type: "input",
            message: "What is your role's salary?"
        },
    ]).then(function(response){
        connection.query("INSERT INTO role SET ?", {
            title: response.roleTitle,
            role_salary: response.roleSal
        })
        console.log("Success added Role!")
        herdRoles(response);
    })
}
// add employee function
function addEmp(){
    inquirer.prompt([
        {
            name: 'firstName',
            message: "What is your employees first name?",
            type: 'input',
        },
        {
            name: 'lastName',
            message: "What is your employees last name?",
            type: 'input',
        },
        {
            name: "roleID",
            message: "What is the employee's role?",
            type: 'input',
        }
    ]).then(function(response){
        connection.query("INSERT INTO employees SET ?", {
            first_name: response.firstName,
            last_name: response.last_name,
        })
        herdEmp(response);
    })
}
// update employee role function

//restart function 
/* function restart() {
    herdOptions();
} */

/* var table = new Table */

herdOptions();