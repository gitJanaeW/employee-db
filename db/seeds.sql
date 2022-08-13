INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO role (title, salary, department_id) VALUES
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4),
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Account Manager', 160000, 2),
    ('Accountant', 125000, 2),
    ('Legal Team Lead', 250000, 3),
    ('Lawyer', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Jim', 'Halpert', 1, NULL),
    ('Pam', 'Halpert', 2, 1),
    ('Michael', 'Scott', 3, NULL),
    ('Dwight', 'Schrute', 4, 3),
    ('Angela', 'Martin', 5, NULL),
    ('Kevin', 'Malone', 6, 5),
    ('Karen', 'Filippelli', 7, NULL),
    ('Ryan', 'Howard', 8, 7);