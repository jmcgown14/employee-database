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
      choices: ['View All Employees', 'Add an Employee'],
    })

  .then(answer => {
    switch (answer.contact) {
      case 'View All Employees':
        allEmployee();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
    };
  });
}

//View/read all employees
const allEmployee = () => { 
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, rows) => {
    if (err) {
      return;
    }
    console.table(rows); // add this line to display data in a table 
    start();
    });
  };
  

  //   // Create an employee
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
          name: 'jobId',
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
        db.query (
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
          [answer.nameFirst, answer.nameLast, answer.roleId, answer.managerId],
          function (err, res) {
            if (err) throw err;
            console.log('Employee added!'),
          start();
      });
        });
    };
      // const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      //       VALUES (?)`,
      //       [answer.nameFirst, answer.nameLast, answer.jobId, answer.managerId],
      // const params = [
      //   body.first_name,
      //   body.last_name,
      //   body.role_id,
      //   body.manager_id,
      // ];
    
      // // db.query(sql, params, (err, result) => {
      // //   if (err) {
      // //   }
    
      //   });
      // }});

  
//View/read all departments
// app.get("/api/department", (req, res) => {
//   const sql = `SELECT * FROM department`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     console.table(rows); // add this line to display data in a table format
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });

// //View/read all roles
// app.get("/api/role", (req, res) => {
//   const sql = `SELECT * FROM role`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     console.table(rows); // add this line to display data in a table format
//     res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// });




// // Create a department
// app.post("/api/new-department", ({ body }, res) => {
//   const sql = `INSERT INTO department (department_name)
//         VALUES (?)`;
//   const params = [
//     body.department_name
//   ];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: body,
//     });
//   });
// });

// // Create a role
// app.post("/api/new-role", ({ body }, res) => {
//   const sql = `INSERT INTO role (title, salary, department_id)
//         VALUES (?)`;
//   const params = [
//     body.title,
//     body.salary,
//     body.department_id
//   ];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "success",
//       data: body,
//     });
//   });
// });

// // UPDATE EMPLOYEE ROLE
// app.put('/api/employee/:id', (req, res) => {
//     const sql = `UPDATE employee SET role_id = ? WHERE id = ?`

//     const params = [req.body.role_id, req.params.id];
  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'Employee not found'
//         });
//       } else {
//         res.json({
//           message: 'success',
//           data: req.body,
//           changes: result.affectedRows
//         });
//       }
//     });
//   });