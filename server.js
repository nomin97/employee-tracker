// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

// adding the necessary packages
const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connecting to database

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    //MySQL password here
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// user input questions
const mainQ = [
  {
    type: 'list',
    name: 'toDo',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
  },
];

const addDepartmentQs = [
  {
    type: 'input',
    name: 'departmentName',
    message: 'Enter name of department:',
  },
];

const addRoleQs = [
  {
    type: 'input',
    name: 'roleName',
    message: 'Enter name of role:',
  },
  {
    type: 'input',
    name: 'roleSalary',
    message: 'Enter salary of role:',
  },
  {
    type: 'list',
    name: 'roleDepartment',
    message: 'Select department of role:',
    choices: [],
  },
];

const addEmployeeQs = [
  {
    type: 'input',
    name: 'employeeFirstName',
    message: 'Enter employee first name:',
  },
  {
    type: 'input',
    name: 'employeeLastName',
    message: 'Enter employee last name:',
  },
  {
    type: 'list',
    name: 'employeeRole',
    message: 'Select employee role:',
    choices: [],
  },
  {
    type: 'list',
    name: 'employeeManager',
    message: 'Select employee manager:',
    choices: [],
  },
];

const updateEmployeeQs = [
  {
    type: 'list',
    name: 'employeeSelect',
    message: 'Select employee you would like to update:',
    choices: [],
  },
  {
    type: 'list',
    name: 'employeeNewRole',
    message: 'Select employee role',
    choices: [],
  },
]

// function to check answer
function checkanswer(answer) {
  if (answer.toDo === 'view all departments') {
    // Query database
    db.query('SELECT * FROM departments', function (err, results) {
      console.log(results);
    });

  }
  if (answer.toDo === 'view all roles') {
    // Query database
    db.query('SELECT * FROM roles', function (err, results) {
      console.log(results);
    });
  }
  if (answer.toDo === 'view all employees') {
    // Query database
    db.query('SELECT * FROM employees', function (err, results) {
      console.log(results);
    });
  }
  if (answer.toDo === 'add a department') {

    inquirer
      .prompt(addDepartmentQs)
      .then((answers) => {


      });
  }
  if (answer.toDo === 'add a role') {

    inquirer
      .prompt(addRoleQs)
      .then((answers) => {

      });
  }
  if (answer.toDo === 'add an employee') {

    inquirer
      .prompt(addEmployeeQs)
      .then((answers) => {


      });
  }
  if (answer.toDo === 'update an employee role') {

    inquirer
      .prompt(updateEmployeeQs)
      .then((answers) => {


      });
  }
};

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(mainQ)
    .then((answer) => {
      checkanswer(answer);
    });
};


// Function call to initialize app
init();
