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

INSERT INTO employee (first_name, last_name, role_id, manager) VALUES
    ('Jim', 'Halpert', 1, NULL),
    ('Pam', 'Halpert', 2, 'Jim Halpert'),
    ('Michael', 'Scott', 3, NULL),
    ('Dwight', 'Schrute', 4, 'Michael Scott'),
    ('Angela', 'Martin', 5, NULL),
    ('Kevin', 'Malone', 6, 'Angela Martin'),
    ('Karen', 'Filippelli', 7, NULL),
    ('Ryan', 'Howard', 8, 'Karen Filippelli');