const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "company_db",
  },
);

db.connect(err => {
  if (err) throw err;
  console.log(`Connected to the company_db database.`);
  start();
});

const start = () => {
  inquirer
    .prompt(
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'contact',
        choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add an Employee', 'Add a Role', 'Add a Department', 'Update an Employee'],
      })

    .then(answer => {
      switch (answer.contact) {
        case 'View All Employees':
          allEmployee();
          break;
        case 'View All Roles':
          allRoles();
          break;
        case 'View All Departments':
          allDepartments();
          break;
        case 'Add an Employee':
          addEmployee();
          break;
        case 'Add a Role':
          addRole();
          break;
        case 'Add a Department':
          addDepartment();
          break;
        case 'Update an Employee':
          updateEmployee();
          break;
      };
    });
}

const allEmployee = () => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      return;
    }
    console.table(rows); 
    start();
  });
};

const allRoles = () => {
  const sql = `SELECT * FROM role`;

  db.query(sql, (err, rows) => {
    if (err) {
      return;
    }
    console.table(rows); 
    start();
  });
};

const allDepartments = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      return;
    }
    console.table(rows); 
    start();
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'nameFirst',
      type: 'input',
      message: "What is the employee's first name?",
    },
    {
      name: 'nameLast',
      type: 'input',
      message: "What is the employee's last name?",
    },
    {
      name: 'roleId',
      type: 'input',
      message: "What is the employee's role id?",
    },
    {
      name: 'managerId',
      type: 'input',
      message: 'What is the manager Id?',
    },
  ])
    .then(answer => {
      db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.nameFirst, answer.nameLast, answer.roleId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.log('Employee added!'),
            start();
        });
    });
};

const addRole = () => {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: "What is the title of the role?",
    },
    {
      name: 'salary',
      type: 'input',
      message: "What is the salary for the role?",
    },
    {
      name: 'departmentId',
      type: 'input',
      message: 'What is the department Id?',
    },
  ])
    .then(answer => {
      db.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.title, answer.salary, answer.departmentId],
        function (err, res) {
          if (err) throw err;
          console.log('Role created!'),
            start();
        });
    });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      name: 'departmentName',
      type: 'input',
      message: "What is the name of the department?",
    },
  ])
    .then(answer => {
      db.query(
        'INSERT INTO department (department_name) VALUES (?)',
        [answer.departmentName],
        function (err, res) {
          if (err) throw err;
          console.log('Department created!'),
            start();
        });
    });
};

const updateEmployee = () => {
  inquirer.prompt([
    {
      name: 'Id',
      type: 'input',
      message: 'Enter employee id',
    },
    {
      name: 'roleId',
      type: 'input',
      message: 'Enter new role id',
    },
  ])
    .then(answer => {
      db.query = `UPDATE employee SET role_id = ? WHERE id = ?`, [answer.roleId, answer.Id],
        function (err, res) {
          if (err) throw err;
          console.log('Department created!'),
            start();
        }
    }
    );
};