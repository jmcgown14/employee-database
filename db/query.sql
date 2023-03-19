SELECT a.first_name AS 'First Name', a.last_name AS 'Last Name', b.first_name AS 'Manager First Name', b.last_name AS 'Manager Last Name', a.manager_id, role.title AS 'Title', a.role_id, role.salary AS 'Salary', department.department_name AS 'Department'
FROM employee a
JOIN employee b ON b.id = a.manager_id
JOIN role ON a.role_id = role.id
JOIN department ON role.department_id = department.id