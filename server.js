// adding the necessary packages
const express = require('express');
const inquirer = require('inquirer');
require('dotenv').config();
const mysql = require('mysql2');
const { AsyncQueueError } = require('sequelize');

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

const departmentList = async () => {
  const [departments] = await connection.promise().query('SELECT * FROM department')
  return departments.map(({ name, id }) => ({ name: name, value: id }))
}

const rolesList= async () => {
  const [roles] = await connection.promise().query('SELECT * FROM roles')
  return roles.map(({ title, salary, id }) => ({ name: title, value:salary, value: id }))
}

const employeesList = async () => {
  const [employees] = await connection.promise().query('SELECT * FROM employees')
  return employees.map(({ first_name, id}) => ({ name: first_name, value:id }))
}

// user input questions
const mainQ = [
  {
    type: 'list',
    name: 'toDo',
    message: 'What would you like to do?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'delete department'],
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
    choices: departmentList,
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
    message: 'Select new employee role:',
    choices: rolesList,
  },
];

const updateEmployeeQs = [
  {
    type: 'list',
    name: 'employeeSelect',
    message: 'Select employee you would like to update:',
    choices: employeesList,
  },
  {
    type: 'list',
    name: 'employeeNewRole',
    message: 'Select employee new role',
    choices: rolesList,
  },
  {
    type: 'input',
    name: 'employeeNewSalary',
    message: 'Enter salary of new role:',
  },
  {
    type: 'list',
    name: 'employeeNewDepartment',
    message: 'Select department of new role:',
    choices: departmentList,
  },

]

// function to check answer
async function checkanswer(answer) {
  if (answer.toDo === 'view all departments') {
    const [departments] = await connection.promise().query('SELECT * FROM department')
    console.table(departments)
    init();
  }

  if (answer.toDo === 'delete department') {
    inquirer.prompt({ type: 'list', name: 'departmentID', message: 'select department to delete', choices: departmentList })
      .then((answer) => {
        connection.promise().query('DELETE FROM department WHERE id= ?', answer.departmentID).then(async ([response]) => {
          if (response.affectedRows > 0) {
            const [departments] = await connection.promise().query('SELECT * FROM department')
            console.table(departments)
            init();
          } else {
            console.error("failed to delete department")
            init()
          }
        })
      })
  }

  if (answer.toDo === 'view all roles') {
    const [roles] = await connection.promise().query('SELECT * FROM roles')
    console.table(roles)
    init();
  }

  if (answer.toDo === 'view all employees') {
    const [employees] = await connection.promise().query('SELECT * FROM employees')
    console.table(employees)
    init();
  };

  if (answer.toDo === 'add a department') {
    inquirer
      .prompt(addDepartmentQs)
      .then((answers) => {
        const department = { name: answers.departmentName }
        connection.promise().query("insert into department set ?", department).then(async ([response]) => {
          if (response.affectedRows > 0) {
            const [departments] = await connection.promise().query('SELECT * FROM department')
            console.table(departments)
            init();
          } else {
            console.error("failed to add department")
            init()
          }
        })

      });
  }

  if (answer.toDo === 'add a role') {
    inquirer
      .prompt(addRoleQs)
      .then((answers) => {
        const role = { title: answers.roleName, salary: answers.roleSalary, department_id: answers.roleDepartment }
        connection.promise().query("insert into roles set ?", role).then(async ([response]) => {
          if (response.affectedRows > 0) {
            const [roles] = await connection.promise().query('SELECT * FROM roles')
            console.table(roles)
            init();
          } else {
            console.error("failed to add role")
            init()
          }
        })
      });
  }

  if (answer.toDo === 'add an employee') {
    inquirer.prompt(addEmployeeQs)
      .then((answers) => {
        const employee = { first_name:answers.employeeFirstName, last_name:answers.employeeLastName, role_id:answers.employeeRole }
        connection.promise().query("insert into employees set ?", employee).then(async ([response]) => {
          if (response.affectedRows > 0) {
            const [employees] = await connection.promise().query('SELECT * FROM employees')
            console.table(employees)
            init();
          } else {
            console.error("failed to add employee")
            init()
          }
        })
      });
  }

  if (answer.toDo === 'update an employee role') {
    inquirer.prompt(updateEmployeeQs)
    .then((answers) => {
      const role = {title: answers.employeeNewRole, salary: answers.employeeNewSalary, department_id: answers.employeeNewDepartment }
      connection.promise().query('insert into ROLES set ?', role).then(async ([response]) => {
        if (response.affectedRows > 0) {
          const [roles] = await connection.promise().query('SELECT * FROM roles')
          console.table(roles)
          init();
        } else {
          console.error("failed to update role")
          init()
        };
      })
    })
  };
}

  // function to initialize app
  function init() {
    inquirer
      .prompt(mainQ)
      .then((answers) => {
        checkanswer(answers);
      });
  };

  init()