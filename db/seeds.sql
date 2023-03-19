INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Marketing"),
       ("Human Resources"),
       ("IT");

INSERT INTO role (department_id, title, salary)
VALUES (1, "Sales Manager", 1200000),
      (2, "Marketing Manager", 1400000),
      (3, "HR Manager", 900000),
      (4, "Computer Manager", 1200000),
      (1, "Sales Associate", 80000),
      (3, "HR Generalist", 70000),
      (4, "IT Grunt", 70000),
      (2, "Marketing Specialist", 85000);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, "Jacob", "Grell", null),
        (2, "Joey", "Grund", null),
        (3, "Josh", "Harm", null),
        (4, "Evan", "Battlefield", null),
        (5, "Frodo", "Baggins", 1),
        (5, "Sam", "Gamgee", 1),
        (6, "Bruce", "Wayne", 3),
        (8, "Ash", "Ketchum", 2),
        (7, "Salazar", "Slytherin", 4),
        (7, "Edgar", "Poe", 4);
        