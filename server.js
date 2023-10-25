// adding the necessary packages
const express = require('express');
const inquirer = require('inquirer');
require('dotenv').config();
const mysql = require('mysql2')

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'employee_db'
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to the employee_db database.');
});

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
    connection.query('SELECT * FROM departments', function (err, results) {
      console.log(results);
    });
  }

  if (answer.toDo === 'view all roles') {
    connection.query('SELECT * FROM roles', function (err, results) {
      console.log(results);
    });
  }

  if (answer.toDo === 'view all employees') {
    connection.query('SELECT * FROM employees', function (err, results) {
      console.log(results);
    });
  }

  if (answer.toDo === 'add a department') {
    inquirer
      .prompt(addDepartmentQs)
      .then((answer) => {
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
    .then((answers) => {
      checkanswer(answers);
    });
};

init();

// Add the missing logic inside the then callbacks of the prompts to handle the user input and perform the necessary database operations.